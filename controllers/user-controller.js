const { User, Thought } = require('../models');
const { db } = require('../models/User');

const userController = {
// get all users
    getAllUser(req,res) {
        User.find({})
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .sort({ _id: -1}) // makes the list descending. makes the newest id to be shown first
            .then(dbUserData => res.json(dbUserData)) // retrieves data from database 
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });

    },


    // gets one user by id
    getOneUser({ params }, res ) {
        User.findOne({ _id: params.id})
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: "Error 404: User data not found!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // creates a new User object
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(500).json(err));
    },

    // update user by id
    updateUser({ body }, res) {
        User.findOneAndUpdate(
            {_id: params.id},
            body,
            {new: true, runValidators:true })
            .populate('friends')
            .populate(thoughts)
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'Error 404: User Data not found.'});
                    return;
                }
                res.json(dbUserData);

            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });

    },

    deleteUser({ params }, res) {
        // set to delete user by id
        User.findOneAndDelete({ _id: params.id})
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: "Error 404: User Data not found"});
                    return;
                }
                Thought.deleteMany({
                    _id: { $in: dbUserData.thoughts} //deletes thoughts that user has made while deleting user
                })
                    .then(() => {
                        return res.json({ message: "User Data and Thoughts deleted Successfully!"});
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });

    },

    //add and delete friend data

    addFriend({ params }, res) {
        User.findOne({ _id: params.friendId })
        .then((dbFriendData) => {
            if(!dbFriendData) {
                return res.status(404).json({ message: "Error 404: Friend not found with this id!" });
            }
            User.findByIdAndUpdate(
                { _id: params.userId },
                { $push: { friends:params.friendId } },
                {new: true}
            )
                .then(dbUserData => {
                    if(!dbUserData){
                        return res.status(404).json({ message: ' Error 404: User data not found.' });
                    }
                    res.json(dbUserData);
                });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: {friends: params.friendId }},
            { new: true }
        )
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'Error 404: User data not found'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
        
            res.status(500).json(err);
    });
    }

    // { $pull: {}} mongo 


};

module.exports = userController