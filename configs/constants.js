module.exports = {
    PASSWORD_REGEXP: new RegExp(/^(?=.*[^a-z])(?=.*[^0-9])(?=.*[^A-Z])(?=.*[^!@#\\$%\\^&\\*])(?=.{8,128})/),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
};
