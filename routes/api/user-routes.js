const router = require('express').Router();

    const {
        getAllUser,
        getOneUser,
        createUser,
        updateUser,
        deleteUser,
        addFriend,
        deleteFriend
    } = require('../../controllers/user-controller');

    // setup for the Get All and Post for api/users
    router.route('/')
        .get(getAllUser)
        .post(createUser);

    // setup for Get One, Put, and Delete for api/users/:id

    router.route('/:id')
        .get(getOneUser)
        .put(updateUser)
        .delete(deleteUser);


    // setup for post and delete for friends list

    router.route('/:userId/friends/:friendId')

    .post(addFriend)
    .delete(deleteFriend);

    module.exports = router;
    