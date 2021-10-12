const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { config } = require('./configs');
const { userRouter, authRouter} = require('./routes');

const app = express();

mongoose.connect(config.MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
});

app.listen(config.PORT, () => console.log(`App listen ${config.PORT}`));
