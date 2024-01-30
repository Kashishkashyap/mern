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
                                <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.shiksha.com%2Fmediadata%2FugcDocuments%2Fimages%2FwordpressImages%2F2022_08_MicrosoftTeams-image-13-2-1.jpg&tbnid=0yFAH-ZW2-qvgM&vet=12ahUKEwjHiMD5xYSEAxVRQWwGHSTVDUMQMygGegUIARCBAQ..i&imgrefurl=https%3A%2F%2Fwww.shiksha.com%2Fonline-courses%2Farticles%2Fcs-courses-guide-for-company-secretary%2F&docid=wC6cUWKYiBK39M&w=1200&h=630&q=course%20image&ved=2ahUKEwjHiMD5xYSEAxVRQWwGHSTVDUMQMygGegUIARCBAQ" className="card-img-top" alt={course.title} />
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
