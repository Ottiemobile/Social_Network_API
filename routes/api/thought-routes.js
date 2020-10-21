const router = require('express').Router();

const {
    findAllThoughts,
    findOneThought,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    DeleteReaction

} = require('../../controllers/thought-controller');