const { User, Thought } = require('../models');

const userController = {
// get all users
    getAllUser(req,res) {
        user.find({})
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .sort({ _id: -1})

    }


};