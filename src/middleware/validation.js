module.exports = {
    validateSong: (req, res, next) => {
        const { id, name, path, plays } = req.body;

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ error: 'Invalid or missing id' });
        }
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: 'Invalid or missing name' });
        }
        if (!path || typeof path !== 'string') {
            return res.status(400).json({ error: 'Invalid or missing path' });
        }
        if (plays !== undefined && typeof plays !== 'number') {
            return res.status(400).json({ error: 'Invalid plays count' });
        }

        next();
    },

    validateSongUpdate: (req, res, next) => {
        const { name, path, plays } = req.body;

        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: 'Invalid or missing name' });
        }
        if (!path || typeof path !== 'string') {
            return res.status(400).json({ error: 'Invalid or missing path' });
        }
        if (plays !== undefined && typeof plays !== 'number') {
            return res.status(400).json({ error: 'Invalid plays count' });
        }

        next();
    }
};