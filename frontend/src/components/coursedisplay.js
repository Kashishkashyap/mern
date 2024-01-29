import React, { useState, useEffect } from 'react';
import { headers } from './auth';

const CourseList = ({ onAddToBucket }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:5000/courses/all', {
                    headers: headers,
                });
                if (response.ok) {
                    const data = await response.json();
                    setCourses(data.courses);
                } else {
                    console.error('Error fetching courses');
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div>
            <h2>Available Courses</h2>
            <ul class="container">
                {courses && courses.map((course) => (
                    <li key={course._id}>
                        <p>{course.title}</p>
                        <button class="btn btn-info" onClick={() => onAddToBucket(course._id)}>Add to Bucket</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseList;
