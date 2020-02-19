const express = require('express');
const router = express.Router();

// Controller
const controller = require('../controllers/api/moviesController');

// GET - Listado - index
router.get('/', controller.index);

// POST - Guardar - store
router.post('/', controller.store);

// GET - Detalle - show
router.get('/:id', controller.show);

module.exports = router;