const {Schema, model} = require('mongoose');

const {userRoles, tokenTypes} = require('../configs');

const oAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true,
        trim: true
    },
    refresh_token: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: userRoles.USER
    }

}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

oAuthSchema.pre('findOne', function() {
    this.populate('user_id');
});

module.exports = model(tokenTypes.O_AUTH, oAuthSchema);
