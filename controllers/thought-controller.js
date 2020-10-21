const { User, Thought } = require('../models');

const thoughtController = {
    // get All function
    findAllThoughts(req, res) {
        Thought.find()
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => { 
            console.log(err);
            res.sendStatus(400);
        })
    },

    // get One function
    findOneThought({ params }, res) {
        User.findOne({ _id: params.thoughtId })
            .populate({
                path:'reactions',
                select: '-__v'
            })

            .select('-__v')

            .then(dbThoughtData => {

                if(!dbThoughtData) {
                    res.status(404).json({ message: 'Error 404: Thought data not found'});
                    return;
                }

                res.json(dbThoughtData);

            })
            
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });


    },

    createThought()




};

module.exports = thoughtController;