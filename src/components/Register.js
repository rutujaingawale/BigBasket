import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = ({ closeModalRegister }) => {
    const navigate = useNavigate();
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const openRegisterModal = () => {
        setShowRegisterModal(true);
    };

    const closeRegisterModal = () => {
        setShowRegisterModal(false);
    };

    const [registerObj, setRegisterObj] = useState({
        "name": "",
        "mobileNo": "",
        "password": ""
    });

    const handleChange = (e) => {
        setRegisterObj({ ...registerObj, [e.target.name]: e.target.value });
    }

    const register = async () => {
        try {
            const result = await axios.post('https://freeapi.miniprojectideas.com/api/BigBasket/RegisterCustomer', registerObj);
            if (result !== undefined) {
                alert('Successfully Registered');
                closeModalRegister(); // Close the modal upon successful registration
                navigate('/'); // Navigate to login page upon successful registration
            } else {
                alert('Failed');
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <Modal show={true} onHide={closeModalRegister}>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div>
                        <div>
                            <div className="row">
                                <div className='col-12'>
                                    <label>Name</label>
                                    <input type="text" className='form-control' name='name' onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-12'>
                                    <label>Mobile No</label>
                                    <input type="text" className='form-control' name='mobileNo' onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="col-12">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name='password'
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <Button className="btn btn-primary form-control" openRegisterModal={openRegisterModal}  onClick={register}>Register</Button>
                                </div>
                                <div className="col-6">
                                    <Button className="btn btn-secondary form-control" closeModalRegister={closeRegisterModal} onClick={closeModalRegister}>Cancel</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default Register;
