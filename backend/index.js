const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const app = express();
const userAuth = require('./routes/userAuth');
const courseRoutes = require('./routes/course');
const { sendInactiveUserNotifications, sendCourseNotifications } = require('./notifications/notifications')
app.use(cors(
    // {
    //     origin:"",
    //     method: ["GET", "POST"],
    //     credentials:true
    // }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cron = require('node-cron');

const dotenv = require('dotenv').config();
// dotenv.config({ path: '.env' });

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("DataBase Connected");
});


app.use('/user', userAuth);
app.use('/courses', courseRoutes);

cron.schedule('0 0 * * *', async () => {
    sendInactiveUserNotifications();
    sendCourseNotifications();
});

app.get('/', (req, res) => {
    res.send("Hi")
})
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})