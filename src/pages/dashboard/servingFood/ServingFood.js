import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import { Button } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import CircularLoader from '../../../customComponent/circularLoader/CircularLoader';
import Modal from 'react-modal';
import './servingFood.css';
import swal from 'sweetalert';




const ServingFood = () => {

    const [student, setStudent] = useState({});
    const [studentRoll, setStudentRoll] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [servingData, setServingData] = useState({});
    const [allFoods, setAllFoods] = useState([]);

    const customStyles = {
        content: {
            width: '30%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/all-foods`)
            .then((response) => {
                setAllFoods(response.data);
            })
    }, [])

    const handleSearch = e => {
        e.preventDefault();
        setIsLoading(true);
        axios.get(`http://localhost:5000/single-student?studentRoll=${studentRoll}`)
            .then((response) => {
                setStudent(response.data);
                setIsLoading(false);
                e.target.reset();
            })
            .catch(() => {
                swal({
                    icon: 'error',
                    text: 'SomeThing went warning Please Try Again.',
                    buttons: 'ok',
                })
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            })

    }

    const handleServingInput = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newServingData = { ...servingData };
        newServingData[field] = value;
        setServingData(newServingData);

    }

    const handleServingForm = e => {
        e.preventDefault();
        const updateServingData = { ...servingData };
        updateServingData.roll = studentRoll;
        updateServingData.status = 'server';
        const { roll, date, shift } = updateServingData;
        axios.get(`http://localhost:5000/serving-food?roll=${roll}&&date=${date}&&shift=${shift}`)
            .then((response) => {
                if (response.data === null) {
                    axios.post(`http://localhost:5000/add-serving-food`, updateServingData)
                        .then((response) => {
                            if (response.data.insertedId) {
                                swal({
                                    icon: 'success',
                                    text: 'Succefully Food Served',
                                    button: 'ok',
                                })
                                setIsOpen(false);
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
                else {
                    swal({
                        icon: 'warning',
                        text: '“Already served',
                        button: 'ok',
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
        <section id="serving-food-section">
            <div className="serving-food-section-title">
                <h1>Search Student For Serving Food</h1>
            </div>
            <div className="search-student">
                <form onSubmit={handleSearch}>
                    <input type="number" placeholder="Please Enter Your Student Roll Number" name="rollNo" onInput={(e) => setStudentRoll(e.target.value)} required />
                    <input type="submit" value="Search" />
                </form>
            </div>
            <div className="student-list-for-serving-food">
                {
                    student !== null && Object.keys(student).length >= 1 &&
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Student Name</TableCell>
                                    <TableCell align="center">Holl No</TableCell>
                                    <TableCell align="center">Roll No</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    key={student._id}
                                >
                                    <TableCell component="th" scope="row" style={{ width: '30%' }}>
                                        {student.fullName}
                                    </TableCell>
                                    <TableCell component="th" scope="row" style={{ width: '20%', textAlign: 'center' }}>
                                        {student.hallName}
                                    </TableCell>
                                    <TableCell component="th" scope="row" style={{ width: '30%', textAlign: 'center' }}>
                                        {student.roll}
                                    </TableCell>
                                    <TableCell>
                                        <Button style={{
                                            textAlign: 'center',
                                            backgroundColor: 'red',
                                            color: '#f5f5f5',
                                        }}
                                            variant="outlined"
                                            onClick={openModal}
                                        >
                                            Serving Food
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
                {
                    student === null && isLoading !== true &&
                    <h1
                        style={{
                            textAlign: 'center',
                        }}
                    >404 Student Not Found</h1>

                }

            </div>
            {
                isLoading &&
                <CircularLoader position="relative" />
            }
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal} style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    fontSize: '30px',
                    background: 'transparent',
                    cursor: 'pointer'
                }}>X</button>
                <div className="serving-form-section">
                    <div className="serving-form-section-title">
                        <h2>Food Serving Form</h2>
                    </div>
                    <form onSubmit={handleServingForm}>
                        <div className="serving-form-design">
                            <label htmlFor="shift">Shift</label>
                            <input list="shift-list" placeholder="Select Shift List" name="shift" id="shift" onInput={handleServingInput} required />
                            <datalist id="shift-list">
                                <option value="Day" />
                                <option value="Night" />
                            </datalist>
                        </div>
                        <div className="serving-form-design">
                            <label htmlFor="date">Date</label>
                            <input type="date" name="date" id="date" onInput={handleServingInput} required />
                        </div>
                        <div className="serving-form-design">
                            <label htmlFor="food-list">Food List</label>
                            <input list="food-type" placeholder="Select Food" id="food-list" name="foodType" onInput={handleServingInput} required />
                            <datalist id="food-type">
                                {
                                    allFoods.map((food) => (
                                        <option value={food.foodName} />
                                    ))
                                }
                            </datalist>
                        </div>
                        <div className="serving-form-design">
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </Modal>
        </section>
    );
};


export default ServingFood;