import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import './updateStudentInfo.css';

const UpdateStudentInfo = () => {

    const [studentData, setStudentData] = useState({});
    const { studentId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/single-student?studentId=${studentId}`)
            .then((response) => {
                setStudentData(response.data);
            })
            .catch(() => {
                swal({
                    icon: 'error',
                    text: 'SomeThing went warning Please Try Again.',
                    buttons: 'ok',
                })
            })
    }, [studentId])

    const handleInput = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newStudentData = { ...studentData };
        newStudentData[field] = value;
        setStudentData(newStudentData);
    }

    const handleForm = e => {
        e.preventDefault();
        delete studentData._id;
        axios.patch(`http://localhost:5000/update-student-info?studentId=${studentId}`, studentData)
            .then((response) => {
                if (response.data.modifiedCount) {
                    swal({
                        icon: 'success',
                        text: 'Successfully Product Added',
                        button: 'ok',
                    })
                        .then(() => {
                            navigate('/manage-all-students', {
                                replace: true,
                            })
                        })

                }
            })
            .catch(() => {
                swal({
                    icon: 'error',
                    text: 'Something went wrong Please Reload Add Try Again',
                    button: 'ok',
                })
            })
    }

    return (
        <section id="update-student-page">
            <div className="update-student-page-container">
                <div className="update-student-page-title">
                    <h1>Update Student Info</h1>
                </div>
                <form id="update-student-form" onSubmit={handleForm}>
                    <div className="update-student-form-design">
                        <div className="single-update-student-input-area">
                            <label htmlFor="full-name">Student Full Name</label>
                            <input type="text" placeholder="Student Full Name" id="full-name" name="fullName" onInput={handleInput} defaultValue={studentData.fullName} required />
                        </div>
                        <div className="single-update-student-input-area">
                            <label htmlFor="hall-name">Hall Name</label>
                            <input type="text" placeholder="Student Hall Name" name="hallName" id="hall-name" onInput={handleInput} defaultValue={studentData.hallName} required />
                        </div>
                    </div>
                    <div className="update-student-form-design">
                        <div className="single-update-student-input-area">
                            <label htmlFor="roll">Student Roll</label>
                            <input type="number" placeholder="Student Roll No" name="roll" id="roll" defaultValue={studentData.roll} onInput={handleInput} required />
                        </div>
                        <div className="single-update-student-input-area">
                            <label htmlFor="age">Student Age</label>
                            <input type="number" placeholder="Student Age" name="age" id="age" onInput={handleInput} defaultValue={studentData.age} required />
                        </div>
                    </div>
                    <div className="update-student-form-design">
                        <div className="single-update-student-input-area">
                            <label htmlFor="class">Student Class</label>
                            <input type="text" placeholder="Student Class Name" name="class" id="class" onInput={handleInput} defaultValue={studentData.class} required />
                        </div>
                        <div className="single-update-student-input-area">
                            <label htmlFor="status">Student Status</label>
                            <input list="student-status" placeholder="Student Status" name="studentStatus" id="status" onInput={handleInput} defaultValue={studentData.studentStatus} required />
                            <datalist id="student-status">
                                <option value="Active" />
                                <option value="InActive" />
                            </datalist>
                        </div>
                    </div>
                    <div className="update-student-form-design">
                        <input type="submit" value="Update" />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default UpdateStudentInfo;