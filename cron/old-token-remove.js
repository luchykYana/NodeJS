const dayJS = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJS.extend(utc);

const {O_Auth} = require('../dataBase');

module.exports = async () => {
    const previousMonth = dayJS.utc().subtract(1, 'month');

    const deleteInfo = await O_Auth.deleteMany({
        createdAt: {$lt: previousMonth}
    });

    console.log(deleteInfo);
};
