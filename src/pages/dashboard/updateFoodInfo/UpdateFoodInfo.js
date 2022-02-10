import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import './updateFoodInfo.css';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateFoodInfo = () => {

    const [foodData, setFoodData] = useState({});
    const { foodId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://warm-beach-60734.herokuapp.com/all-foods?foodId=${foodId}`)
            .then((response) => {
                setFoodData(response.data);
            })
            .catch(() => {
                swal({
                    icon: 'error',
                    text: 'SomeThing went warning Please Try Again.',
                    buttons: 'ok',
                })
            })
    }, [foodId])

    const handleInput = e => {
        const key = e.target.name;
        const value = e.target.value;
        const newData = { ...foodData };
        newData[key] = value;
        setFoodData(newData);
    }

    const handleSubmit = e => {
        e.preventDefault();
        delete foodData._id;
        axios.patch(`https://warm-beach-60734.herokuapp.com/update-food-info?foodId=${foodId}`, foodData)
            .then((response) => {
                if (response.data.modifiedCount) {
                    swal({
                        icon: 'success',
                        text: 'Successfully Product Added',
                        button: 'ok',
                    })
                        .then(() => {
                            navigate('/manage-all-foods', {
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
        <div className="update-food-section">
            <div className="update-food-section-title">
                <h2>Update Food Info</h2>
                <div className="update-food-container">
                    <form onSubmit={handleSubmit}>
                        <div className="update-food-area">
                            <div className="update-food-form-design">
                                <label htmlFor="food-name">Food Name</label>
                                <input type="text" placeholder="Enter Your Food Name" name="foodName" id="food-name" onInput={handleInput} defaultValue={foodData.foodName} required />
                            </div>
                            <div className="update-food-form-design">
                                <label htmlFor="cost-price">Food Price</label>
                                <input type="number" placeholder="Enter Your Food Price" name="costPrice" id="cons-price" onInput={handleInput} defaultValue={foodData.costPrice} required />
                            </div>
                            <div className="update-food-form-design">
                                <label htmlFor="food-type">Food Type</label>
                                <input list="category" placeholder='Select Product Category' name="foodType" id="food-type" onInput={handleInput} defaultValue={foodData.foodType} required />
                                <datalist id="category">
                                    <option value="Burger" />
                                    <option value="Biryani" />
                                    <option value="Rice" />
                                    <option value="Vegetables" />
                                    <option value="Fruit" />
                                    <option value="Nuts" />
                                    <option value="Meat" />
                                    <option value="Raisins" />
                                    <option value="Fish" />
                                    <option value="Milk" />
                                    <option value="Cold Drink" />
                                </datalist>
                            </div>
                        </div>
                        <input type="submit" value="Submit" id="update-food-button" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateFoodInfo;