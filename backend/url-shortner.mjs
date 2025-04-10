// Import AWS SDK and crypto
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { randomBytes } from "crypto";

// Initialize DynamoDB client
const dynamo = new DynamoDBClient({ region: "us-east-1" });

export const handler = async (event) => {
    try {

        console.log("Event:" + {event}, "Event Params:" + event.queryStringParameters);
        // Validate input
        if (!event.queryStringParameters || !event.queryStringParameters.url) {
            return {
                statusCode: 400,
                headers:{ 'Access-Control-Allow-Origin' : '*' },
                body: JSON.stringify({ error: "Missing 'url' query parameter" })
            };
        }

        const longUrl = event.queryStringParameters.url;
        const shortCode = randomBytes(4).toString('hex');

        // Save to DynamoDB
        await dynamo.send(new PutItemCommand({
            TableName: 'url_shortener',
            Item: {
                short_code: { S: shortCode },
                long_url: { S: longUrl }
            }
        }));

        // Return success response
        return {
            statusCode: 200,
            headers:{ 'Access-Control-Allow-Origin' : '*' },
            body: JSON.stringify({
            shortUrl: `https://api.theshortly.xyz/${shortCode}`
            })
        };
    } catch (error) {
        console.error("Error:", error); // Log the error for debugging
        return {
            statusCode: 500,
            headers:{ 'Access-Control-Allow-Origin' : '*' },
            body: JSON.stringify({ error: "Internal Server Error" })
        };
    }
};