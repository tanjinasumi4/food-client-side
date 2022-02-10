import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';
import './addStudent.css';

const AddStudent = () => {

    const [studentData, setStudentData] = useState({});

    const handleInput = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newStudentData = { ...studentData };
        newStudentData[field] = value;
        setStudentData(newStudentData);
    }

    const handleForm = e => {
        e.preventDefault();
        axios.post(`http://localhost:5000/add-student`, studentData)
            .then((response) => {
                if (response.data.insertedId) {
                    swal({
                        icon: 'success',
                        text: 'Successfully Product Added',
                        button: 'ok',
                    });
                    e.target.reset();
                }
            })
            .catch((error) => {
                swal({
                    icon: 'error',
                    text: 'Something went wrong Please Reload Add Try Again',
                    button: 'ok',
                })
            })
    }

    return (
        <section id="add-student-page">
            <div className="add-student-page-container">
                <div className="add-student-page-title">
                    <h1>Add New Student</h1>
                </div>
                <form id="add-student-form" onSubmit={handleForm}>
                    <div className="add-student-form-design">
                        <div className="single-add-student-input-area">
                            <label htmlFor="full-name">Student Full Name</label>
                            <input type="text" placeholder="Student Full Name" id="full-name" name="fullName" onInput={handleInput} required />
                        </div>
                        <div className="single-add-student-input-area">
                            <label htmlFor="hall-name">Hall Name</label>
                            <input type="text" placeholder="Student Hall Name" name="hallName" id="hall-name" onInput={handleInput} required />
                        </div>
                    </div>
                    <div className="add-student-form-design">
                        <div className="single-add-student-input-area">
                            <label htmlFor="roll">Student Roll</label>
                            <input type="number" placeholder="Student Roll No" name="roll" id="roll" onInput={handleInput} required />
                        </div>
                        <div className="single-add-student-input-area">
                            <label htmlFor="age">Student Age</label>
                            <input type="number" placeholder="Student Age" name="age" id="age" onInput={handleInput} required />
                        </div>
                    </div>
                    <div className="add-student-form-design">
                        <div className="single-add-student-input-area">
                            <label htmlFor="class">Student Class</label>
                            <input type="text" placeholder="Student Class Name" name="class" id="class" onInput={handleInput} required />
                        </div>
                        <div className="single-add-student-input-area">
                            <label htmlFor="status">Student Status</label>
                            <input list="student-status" placeholder="Student Status" name="studentStatus" id="status" onInput={handleInput} required />
                            <datalist id="student-status">
                                <option value="Active" />
                                <option value="InActive" />
                            </datalist>
                        </div>
                    </div>
                    <div className="add-student-form-design">
                        <input type="submit" value="Add Student" />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddStudent;