const {Schema, model} = require('mongoose');

const {userRoles} = require('../configs');
const passwordService = require('../service/password.service');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    },
    age: {
        type: Number,
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

userSchema.virtual('roleSentence').get(function() {
    return `${this.name} is ${this.role}`;
});

userSchema.methods = {
    comparePassword(password) {
        return passwordService.compare(password, this.password);
    },

    normaliseUser() {
        const fieldsToRemove = [
            'password',
            '__v',
            'id'
        ];

        const normalisedUser = this.toObject();

        fieldsToRemove.forEach((field) => delete normalisedUser[field]);

        return normalisedUser;
    }
};

userSchema.statics = {
    async createUserWithHashPassword(userObject) {
        const hashedPassword = await passwordService.hash(userObject.password);

        return this.create({...userObject, password: hashedPassword});
    }
};

module.exports = model(userRoles.USER, userSchema);
