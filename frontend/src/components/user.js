import React, { useState, useEffect } from 'react';
import CourseList from './coursedisplay';
import { setAuthToken, headers } from './auth';
import Logout from './Logout'

const UserDashboard = () => {
    const [userCourses, setUserCourses] = useState([]);

    useEffect(() => {
        const fetchUserCourses = async () => {
            try {
                setAuthToken(localStorage.getItem('token'));

                const response = await fetch(`https://mern-zeta-blush.vercel.app/courses/user/${localStorage.getItem('userId')}/courses`, {
                    headers: headers,
                    method: "GET"
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserCourses(data.user.courses);
                } else {
                    console.error('Error fetching user courses');
                }
            } catch (error) {
                console.error('Error fetching user courses:', error);
            }
        };

        fetchUserCourses();
    }, []);

    const handleAddToBucket = async (courseId) => {
        try {
            setAuthToken(localStorage.getItem('token'));

            const response = await fetch(`https://mern-zeta-blush.vercel.app/user/add-course`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ userId: localStorage.getItem('userId'), courseId }),
            });

            if (response.ok) {
                window.alert('Course added to your bucket!');
            } else {
                console.error('Error adding course to bucket');
            }
        } catch (error) {
            console.error('Error adding course to bucket:', error);
        }
    };



    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Courses in Your Bucket</h2>
                <Logout />
            </div>

            <ul className="list-group mb-4">
                {userCourses.map((course) => (
                    <li key={course._id} className="list-group-item">
                        {course.title}
                    </li>
                ))}
            </ul>

            <CourseList onAddToBucket={handleAddToBucket} />
        </div>
    );
};

export default UserDashboard;
