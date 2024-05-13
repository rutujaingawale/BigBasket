import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

import { MyContext } from '../MycontextProviders';
import Register from './Register';

const Login = ({ showLoginModal, closeModalLogin }) => {
   
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const showRegisterModalHandler = () => {
        setShowRegisterModal(true);
    }

    const closeRegisterModalHandler = () => {
        setShowRegisterModal(false); // Close the register modal
    }

    const { updateLoggedUserData } = useContext(MyContext); // Pass UserContext here
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const validate = () =>{
        if (!username || !password) { // Fix the validation condition
            alert("Please enter username and password");
            return false;
        }
        return true;
    };

    const handleLogin = async() => {
        if (validate()) {
            try {
                debugger
                const result = await axios.get('https://freeapi.miniprojectideas.com/api/BigBasket/GetAllCustomer');
                const users = result.data.data; // Update variable name
                const allUsers = users.flat();
                let isUserPresent = allUsers.find(user => user.name === username && user.password === password);
                if (isUserPresent) {
                    updateLoggedUserData(isUserPresent);
                    alert('Login successfully');
                    localStorage.setItem('LoginDetails', JSON.stringify(isUserPresent));
                    navigate('/product');
                } else {
                    alert('Invalid username or password');
                }
            } catch(error) {
                alert('Error');
            }
        }
    };

    return (
        <Modal show={showLoginModal} onHide={closeModalLogin}>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div>
                        <div>
                            <div className="row">
                                <div className='col-12'>
                                    <label>User Name</label>
                                    <input type="text" className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="col-12">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <Button className="btn btn-primary form-control" onClick={handleLogin}>Login</Button>
                                </div>
                                <div className="col-6">
                                    <Button className="btn btn-secondary form-control" onClick={showRegisterModalHandler}>Register</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            {showRegisterModal && <Register closeModalRegister={closeRegisterModalHandler} />}
        </Modal>
    );
};

export default Login;
