const { User, Thought } = require('../models');

const thoughtController = {
    // Function finds all Thoughts
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

    // Function finds one Thought
    findOneThought({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
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
    // Function creates Thought object
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id }},
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'Error 404: User Data not found'});
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // Function updates Thought object by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId}, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'Error 404: thought Data not found' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },


    //function that deletes the Thought by ID
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'Error 404: Thought data not found'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            res.status(400).json(err)
        });
    },

    addReaction({params, body}, res) {
        Thought.findByIdAndUpdate(
            { _id: params.thoughtId},
            { $push: {reactions: body}},
            {new: true, runValidators: true}
        )

        .populate({ path: 'reactions', select: '-__v'})

        .select('-__v')

        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'Error 404: Thought data not found'});
                return; 
            }
            res.json(dbThoughtData);
        })
        .catch(err => { 
           res.status(400).json(err) 
        });






    },

    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.reactionId },
            { $pull: {reactions: { _id: params.reactionId}}},
            { new: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: 'Error 404: Thought data not found'});
                return;
            }
            res.json(dbThoughtData)
        })
    }


};

module.exports = thoughtController;