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
        // <div>
        //     <h2>Available Courses</h2>
        //     <ul class="container">
        //         {courses && courses.map((course) => (


        //             <li key={course._id}>
        //                 <p>{course.title}</p>
        //                 <button class="btn btn-info" onClick={() => onAddToBucket(course._id)}>Add to Bucket</button>
        //             </li>
        //         ))}
        //     </ul>
        // </div>
        <div>
            <h2>Available Courses</h2>
            <div className="container">
                <div className="row">
                    {courses && courses.map((course) => (
                        <div key={course._id} className="col-md-4 mb-4">
                            <div className="card">
                                {/* <img src={course.image} className="card-img-top" alt={course.title} /> */}
                                <div className="card-body">
                                    <h5 className="card-title">{course.title}</h5>
                                    <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis dicta velit in eligendi praesentium distinctio veritatis corporis! Cum, rem sequi.</p>
                                    <button className="btn btn-info" onClick={() => onAddToBucket(course._id)}>Add to Bucket</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseList;
