const {emailActions} = require('../configs');

module.exports = {
    [emailActions.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome!'
    },
    [emailActions.GOODBYE]: {
        templateName: 'goodbye',
        subject: 'Goodbye!'
    },
    [emailActions.HELLO]: {
        templateName: 'hello',
        subject: 'Hello!'
    },
    [emailActions.FORGOT_PASSWORD]: {
        templateName: 'forgot-password',
        subject: 'Everybody forgot something! Dont worry)'
    }
};
