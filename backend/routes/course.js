const express = require('express');
const router = express.Router();
const Course = require('../model/course');
const User = require('../model/user')

router.use(express.json());

router.post('/addDummyCourses', async (req, res) => {
    try {
        const coursesDummyData = [
            { title: 'Introduction to Programming', description: 'Learn the basics of programming.', price: 500 },
            { title: 'Web Development Fundamentals', description: 'Get started with web development.', price: 600 },
            { title: 'Data Science Essentials', description: 'Explore the world of data science.', price: 1000 },
            { title: 'Introduction to Programming', description: 'Learn the basics of programming.', price: 500 },
            { title: 'Web Development Fundamentals', description: 'Get started with web development.', price: 600 },
            { title: 'Data Science Essentials', description: 'Explore the world of data science.', price: 1000 },
            { title: 'Introduction to Programming', description: 'Learn the basics of programming.', price: 500 },
            { title: 'Web Development Fundamentals', description: 'Get started with web development.', price: 600 },
            { title: 'Data Science Essentials', description: 'Explore the world of data science.', price: 1000 },
            { title: 'Introduction to Programming', description: 'Learn the basics of programming.', price: 500 },
            { title: 'Web Development Fundamentals', description: 'Get started with web development.', price: 600 },
            { title: 'Data Science Essentials', description: 'Explore the world of data science.', price: 1000 },
        ];


        await Course.insertMany(coursesDummyData);

        res.status(200).json({ message: 'Courses seeded successfully!' });
    } catch (error) {
        console.error('Error seeding courses:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/all', async (req, res) => {
    try {
        const courses = await Course.find();
        // console.log(courses)
        const response = await res.json({ success: true, courses });

    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }

})


router.get('/user/:userId/courses', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate('courses');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, user: { courses: user.courses } });
    } catch (error) {
        console.error('Error fetching user courses:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


module.exports = router;
