const router = require('express').Router();

const {
    findAllThoughts,
    findOneThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thought-controller');

router.route('/')
    .get(findAllThoughts)
    .post(createThought);
 



router.route('/:thoughtId')
    .get(findOneThought)
    .put(updateThought)
    .delete(deleteThought);
    



// add a reaction
router.route('/:thoughtId/reactions')
    .post(addReaction);


//delete a reaction
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

    module.exports = router;