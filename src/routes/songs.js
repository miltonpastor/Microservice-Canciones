const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songsController');
const { validateSong, validateSongUpdate } = require('../middleware/validation');

// GET /songs - Obtener todas las canciones
router.get('/', songsController.getAllSongs);

// POST /songs - Crear una nueva canción
router.post('/', validateSong, songsController.createSong);

// PUT /songs/:id - Actualizar una canción por id
router.put('/:id', validateSongUpdate, songsController.updateSong);

// DELETE /songs/:id - Eliminar una canción por id
router.delete('/:id', songsController.deleteSong);

module.exports = router;