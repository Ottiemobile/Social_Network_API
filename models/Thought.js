const { Schema , model } = require('mongoose');
const { create } = require('./User');
const moment = require('moment');



const thoughtSchema = new Schema(
    {

        username: {
            type: String,
            required: "you need to type in your username"

        },

        thoughtBody: {
            type: String,
            required: "Please leave a thought",
            maxlength: [280, ' you passed the maximum limit of characters '] 
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD YY [at] hh:mm')

         },

         reactions: [ReactionSchema]

    },
    {
        toJSON: {
            virtuals: true,
            getters: true,

        },
        id: false
    }

);



const Thought = model('Thought', thoughtSchema);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})


module.exports = Thought;