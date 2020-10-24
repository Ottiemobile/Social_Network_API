const { Schema, Types } = require('mongoose');
const moment = require('moment');


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            required:true,
            default: () => new Types.ObjectId()

        },
        username: {
            type: String,
            required: true
        },
        reactionBody: {
            type: String,
            required: "your reaction cannot be blank",
            maxlength: [280, 'Your reaction is going over the max character limit']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            getters: true
        },
        id:false,
    }
);

module.exports = reactionSchema;