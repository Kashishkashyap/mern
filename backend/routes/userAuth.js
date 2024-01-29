const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "SecurePassword";

router.use(express.json());


router.post('/register', async (req, res) => {
    try {
        let success = false;
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({
                success,
                error: "User with provided email address already exists"
            })
        }
        const salt = await bcrypt.genSalt(10);

        const encryptedPassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: encryptedPassword,
            email: req.body.email,
            lastActivityDate: new Date(),
        })
        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ success, authToken, userId: user.id });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error")
    }

})

router.post('/login', async (req, res) => {
    let success = false;
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ success, error: "Invalid Credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Invalid Credentials" });
        }
        user.lastActivityDate = await new Date();
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({ success, authToken, userId: user.id });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
}
)

router.post('/add-course', async (req, res) => {
    const { userId, courseId } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { courses: courseId } },
            { new: true }
        ).populate('courses');


        res.json({ user: updatedUser });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router;