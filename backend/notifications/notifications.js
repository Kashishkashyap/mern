const User = require('../model/user');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.FROM_MAIL,
        pass: process.env.AUTH_PASSWORD,
    },
});

async function sendInactiveUserNotifications() {
    try {
        const inactiveUsers = await User.find({ lastActivityDate: { $lt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) } });

        inactiveUsers.forEach(async (user) => {
            const mailOptions = {
                from: 'minnu02022002@gmail.com',
                to: user.email,
                subject: 'Inactive User Notification',
                text: 'You have been inactive for more than 5 days. Log in to stay updated!',
            };

            await transporter.sendMail(mailOptions);

            console.log(`Email sent to ${user.email}`);
        });
    } catch (error) {
        console.error('Error sending emails to inactive users:', error);
    }
}

async function sendCourseNotifications() {
    try {
        const usersWithCourses = await User.find().populate('courses');

        usersWithCourses.forEach(async (user) => {
            const mailOptions = {
                from: process.env.FROM_MAIL,
                to: user.email,
                subject: 'Course Abandonment Notification',
                text: 'Checkout the courses you added to your cart and make the require payment to purchase them!',
            };

            await transporter.sendMail(mailOptions);

            console.log(`Email sent to ${user.email}`);
        });
    } catch (error) {
        console.error('Error sending course notifications:', error);
    }
}



module.exports = { sendInactiveUserNotifications, sendCourseNotifications };
