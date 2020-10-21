const { Schema, model } = require('mongoose');

const userSchema = new Schema(

    {
        username: {
            type: String,
            Required: true,
            unique : true,
            trim : true
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

const User = model('User', userSchema);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

module.exports = User;