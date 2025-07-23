const AWS = require('aws-sdk');

// Configure AWS DynamoDB client
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION || 'us-east-1',
    endpoint: process.env.DYNAMODB_ENDPOINT || `https://dynamodb.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com`,
    // Use IAM roles in production, or environment variables for local development
    ...(process.env.AWS_ACCESS_KEY_ID && {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })
});

module.exports = dynamoDB;