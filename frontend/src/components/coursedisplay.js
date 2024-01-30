import React, { useState, useEffect } from 'react';
import { headers } from './auth';

const CourseList = ({ onAddToBucket }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('https://mern-zeta-blush.vercel.app/courses/all', {
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
                    <div key={course._id} class="card" style="width: 18rem;">
                        <img class="card-img-top" src="..." alt="Card image cap" />
                        <div class="card-body">
                            <h5 class="card-title">key={course._id}</h5>
                            <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo facilis architecto et perspiciatis quod amet est ea assumenda eos illo.</p>
                            <button class="btn btn-info" onClick={() => onAddToBucket(course._id)}>Add to Bucket</button>
                        </div>
                    </div>


                ))}
            </ul>
        </div>
    );
};

export default CourseList;
