const AWS = require('aws-sdk');
const dynamoDB = require('../config/dynamodb');
const SONGS_TABLE = 'TBL_SONG';

// Get all songs
exports.getAllSongs = async (req, res) => {
    try {
        const params = {
            TableName: SONGS_TABLE,
        };
        const data = await dynamoDB.scan(params).promise();
        res.status(200).json(data.Items);
    } catch (error) {
        res.status(500).json({
            error: 'Could not retrieve songs',
            details: error.message
        });
    }
};

// Create a new song
exports.createSong = async (req, res) => {
    const { id, name, path, plays } = req.body;

    const params = {
        TableName: SONGS_TABLE,
        Item: {
            id,
            name,
            path,
            plays: plays || 0,
        },
    };

    try {
        await dynamoDB.put(params).promise();
        res.status(201).json(params.Item);
    } catch (error) {
        // Handle specific DynamoDB errors
        if (error.code === 'ConditionalCheckFailedException') {
            return res.status(409).json({ error: 'Song with this ID already exists' });
        }

        if (error.code === 'ValidationException') {
            return res.status(400).json({ error: 'Invalid request data' });
        }

        res.status(500).json({
            error: 'Could not create song',
            details: error.message
        });
    }
};

exports.updateSong = async (req, res) => {
    const { id } = req.params;
    const { name, path, plays } = req.body;

    const params = {
        TableName: SONGS_TABLE,
        Key: { id },
        UpdateExpression: 'set #name = :name, #path = :path, #plays = :plays',
        ExpressionAttributeNames: {
            '#name': 'name',
            '#path': 'path',
            '#plays': 'plays',
        },
        ExpressionAttributeValues: {
            ':name': name,
            ':path': path,
            ':plays': plays,
        },
        ReturnValues: 'UPDATED_NEW',
    };

    try {
        const result = await dynamoDB.update(params).promise();
        res.status(200).json(result.Attributes);
    } catch (error) {
        // Handle specific DynamoDB errors
        if (error.code === 'ResourceNotFoundException') {
            return res.status(404).json({ error: 'Song not found' });
        }

        if (error.code === 'ValidationException') {
            return res.status(400).json({ error: 'Invalid request data' });
        }

        if (error.code === 'ConditionalCheckFailedException') {
            return res.status(409).json({ error: 'Conditional check failed' });
        }

        // Generic error for other cases
        res.status(500).json({
            error: 'Could not update song',
            details: error.message
        });
    }
};

// Delete a song by id
exports.deleteSong = async (req, res) => {
    const { id } = req.params;

    const params = {
        TableName: SONGS_TABLE,
        Key: { id },
    };

    try {
        await dynamoDB.delete(params).promise();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            error: 'Could not delete song',
            details: error.message
        });
    }
};