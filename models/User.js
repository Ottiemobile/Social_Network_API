const { Schema, model } = require('mongoose');

const userSchema = newSchema(

    {
        username: {
            type: String,
            Required: true,
            unique = true,
            trim = true
        },

        email: {
            type: String,
            match: [/.+@.+\..+/, 'failed to match an email address. please try again'],
            required: true,
            unique: true
            
        },

        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'User'
            },
        ],

        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,

        },
        id: false
    }
);

const User = model('User', UserSchema);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

module.exports = User;