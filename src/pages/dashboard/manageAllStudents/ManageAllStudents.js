import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import { Button, Checkbox } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import swal from 'sweetalert';
import CircularLoader from '../../../customComponent/circularLoader/CircularLoader';
import { useNavigate } from 'react-router-dom';
import './manageAllStudent.css';

const ManageAllStudents = () => {
    const [allStudents, setAllStudents] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [dataLoading, setDataLoading] = useState(true);
    const [selectStudent, setSelectStudent] = useState([]);
    const [status, setStatus] = useState('');
    const navigate = useNavigate()
    const size = 10;

    useEffect(() => {
        setDataLoading(true);
        axios.get(`http://localhost:5000/all-students?currentPage=${currentPage}&&size=${size}`)
            .then((response) => {
                setAllStudents(response.data.allFoods);
                const totalPageNumber = Math.ceil(response.data.count / size);
                setTotalPage(totalPageNumber);
                setDataLoading(false);
            })
            .catch(() => {
                swal({
                    icon: 'error',
                    text: 'Something went wrong Please Reload And Try Again',
                    button: 'ok',
                })
                setDataLoading(false);
            })
            .finally(() => {
                setDataLoading(false);
            })
    }, [currentPage, status]);

    if (dataLoading) return <CircularLoader height="95vh" />

    const handleStudentDeleteBtn = (e, id) => {
        swal({
            text: 'Are You Sure You Want To Delete The Product ?',
            buttons: ['Cancle', 'Sure']
        })
            .then((value) => {
                if (value) {
                    axios.delete(`http://localhost:5000/delete-single-student?studentId=${id}`)
                        .then((response) => {
                            if (response.data.deletedCount) {
                                swal({
                                    icon: 'success',
                                    text: 'Succefully Delete the Product',
                                    button: 'ok',
                                })
                                e.target.parentElement.parentElement.remove();

                            }
                        })
                        .catch(() => {
                            swal({
                                icon: 'error',
                                text: 'Something went wrong Please Reload And Try Again',
                                button: 'ok',
                            })
                        })
                }
            })
    }

    const handleUpdateButton = (id) => {
        navigate(`/update-student-info/${id}`, {
            replace: true,
        })
    }

    const handleStatusInput = (e, studentId) => {
        const isChecked = e.target.checked;
        let newSelectStudent = [...selectStudent];
        const index = newSelectStudent.findIndex((id) => id === studentId);
        if (index === -1 && isChecked === true) {
            newSelectStudent.push(studentId);
        }
        else if (index >= 0 && isChecked === false) {
            newSelectStudent.splice(index, 1);
        }
        setSelectStudent(newSelectStudent);
    };

    const handleUpdateStatus = (status) => {
        axios.patch(`http://localhost:5000/update-student-status?studentsId=${selectStudent}`, { status: status })
            .then((response) => {
                if (response.data.modifiedCount) {
                    swal({
                        icon: 'success',
                        'text': 'Successfully Update Student Status',
                        button: 'ok',
                    })
                    setStatus(status);
                    setSelectStudent([]);

                }
            })
            .catch(() => {
                swal({
                    icon: 'error',
                    text: 'Somethin went wrong Please Reload And Try Again',
                    button: 'ok',
                })
            })
    }

    return (
        <>
            {
                allStudents.length >= 1 &&
                <section id="manage-all-products">
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Student Name</TableCell>
                                    <TableCell align="center">Hall Name</TableCell>
                                    <TableCell align="center">Roll No</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    allStudents.map((data, index) => (
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            key={data._id}
                                        >
                                            <TableCell component="th" scope="row" style={{ width: '30%' }}>
                                                {data.fullName}
                                            </TableCell>
                                            <TableCell align="center">
                                                {data.hallName}
                                            </TableCell>
                                            <TableCell align="center">
                                                {data.roll}
                                            </TableCell>
                                            <TableCell align="center">
                                                {data.studentStatus}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Checkbox onInput={(e) => handleStatusInput(e, data._id)} size="small" />
                                                <Button style={{
                                                    textAlign: 'right',
                                                    marginRight: '7px',
                                                    backgroundColor: 'dodgerblue',
                                                    color: '#f5f5f5',
                                                }}
                                                    variant="outlined"
                                                    onClick={() => handleUpdateButton(data._id)}
                                                >
                                                    Update
                                                </Button>
                                                <Button style={{
                                                    textAlign: 'right',
                                                    backgroundColor: 'red',
                                                    color: '#f5f5f5',
                                                }}
                                                    variant="outlined"
                                                    onClick={(e) => handleStudentDeleteBtn(e, data._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className="show-status-update-button">
                        {
                            selectStudent.length >= 1 &&
                            <div className="status-update-button">
                                <button onClick={() => handleUpdateStatus('Active')}>Active</button>
                                <button onClick={() => handleUpdateStatus('InActive')}>In Active</button>
                            </div>
                        }
                    </div>
                    <div className="pagination">
                        {
                            [...Array(totalPage).keys()].map((number) => (
                                <button
                                    key={number}
                                    id={number === currentPage ? 'active-page' : ''}
                                    onClick={() => setCurrentPage(number)}
                                >
                                    {number + 1}
                                </button>
                            ))
                        }
                    </div>
                </section>
            }
        </>
    );
};

export default ManageAllStudents;