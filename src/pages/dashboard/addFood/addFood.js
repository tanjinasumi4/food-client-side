import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import './addFood.css';

const AddFood = () => {

    const [productData, setProductData] = useState({});
    const handleInput = e => {
        const key = e.target.name;
        const value = e.target.value;
        const newData = { ...productData };
        newData[key] = value;
        setProductData(newData);
    }
    
    const handleSubmit = e => {
        e.preventDefault();

        axios.post(`https://warm-beach-60734.herokuapp.com/add-food`, productData)
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
            .catch(() => {
                swal({
                    icon: 'error',
                    text: 'Something went wrong Please Reload Add Try Again',
                    button: 'ok',
                })
            })

    }

    return (
        <div className="add-new-food-section">
            <div className="add-new-food-section-title">
                <h2>Add New Food</h2>
                <div className="add-food-container">
                    <form onSubmit={handleSubmit}>
                        <div className="add-food-area">
                            <div className="add-food-form-design">
                                <label htmlFor="food-name">Food Name</label>
                                <input type="text" placeholder="Enter Your Food Name" name="foodName" id="food-name" onInput={handleInput} required />
                            </div>
                            <div className="add-food-form-design">
                                <label htmlFor="cost-price">Food Price</label>
                                <input type="number" placeholder="Enter Your Food Price" name="costPrice" id="cons-price" onInput={handleInput} required />
                            </div>
                            <div className="add-food-form-design">
                                <label htmlFor="food-type">Food Type</label>
                                <input list="category" placeholder='Select Product Category' name="foodType" id="food-type" onInput={handleInput} required />
                                <datalist id="category">
                                    <option value="Burger" />
                                    <option value="Biryani" />
                                    <option value="Rice" />
                                    <option value="Vegetables" />
                                    <option value="Fruit" />
                                    <option value="Nuts" />
                                    <option value="Raisins" />
                                    <option value="Fish" />
                                    <option value="Milk" />
                                    <option value="Cold Drink" />
                                </datalist>
                            </div>
                        </div>
                        <input type="submit" value="Submit" id="add-new-food-button" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFood;