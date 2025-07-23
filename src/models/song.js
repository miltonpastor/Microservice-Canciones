const Joi = require('joi');

const songSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    path: Joi.string().uri().required(),
    plays: Joi.number().integer().min(0).required()
});

const validateSong = (song) => {
    return songSchema.validate(song);
};

module.exports = {
    validateSong
};