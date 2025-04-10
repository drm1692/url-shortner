import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const dynamo = new DynamoDBClient({ region: "us-east-1" });

export const handler = async (event) => {
    try {
        const shortCode = event.pathParameters.shortcode;

        // Fetch the long URL from DynamoDB
        const result = await dynamo.send(new GetItemCommand({
            TableName: 'url_shortener',
            Key: { short_code: { S: shortCode } }
        }));

        if (!result.Item) {
            return {
                statusCode: 404,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: "URL not found" })
            };
        }

        const longUrl = result.Item.long_url.S;

        // Redirect to the long URL
        return {
            statusCode: 301, // Permanent redirect
            headers: {
                'Location': longUrl,
                'Access-Control-Allow-Origin': '*'
            }
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: "Internal Server Error" })
        };
    }
};