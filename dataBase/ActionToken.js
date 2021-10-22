const { Schema, model } = require('mongoose');

const {actionTokenTypes, tokenTypes, userRoles} = require('../configs');

const actionTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },
    token_type: {
        type: String,
        required: true,
        enum: Object.values(actionTokenTypes),
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: userRoles.USER
    },

}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

actionTokenSchema.pre('findOne', function() {
    this.populate('user_id');
});

module.exports = model(tokenTypes.ACTION_TOKEN, actionTokenSchema);
