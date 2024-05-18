import React, { useContext, useEffect, useState } from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { getDataById, postData } from '../Service/Service';
import { toast } from 'react-toastify';
import { MyContext } from '../MycontextProviders';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckOut = () => {
    const { loggedUserData } = useContext(MyContext);
    const [totalQuantity, setTotalQuantity] = useState(0);
    // const [cartProductListByCustomer, setCartProductListByCustomer] = useState([]);
    const{cartProductListByCustomer}=useContext(MyContext);
    const{getCartProductListbyCustId}=useContext(MyContext);
    const totalPrice = cartProductListByCustomer.reduce((total, cartItems) => {
        return total + (cartItems.productPrice * cartItems.quantity);
    }, 0);
    const [placeObj, setPlaceobj] = useState({

        //"saleId": 0,
        "custId": 0,
        "saleDate": new Date(),
        "totalInvoiceAmount": 0,
        "discount": 0,
        "paymentNaration": "",
        "deliveryAddress1": "",
        "deliveryAddress2": "",
        "deliveryCity": "",
        "deliveryPinCode": "",
        "deliveryLandMark": "",
        "isCanceled": false,

    })
    const getplaceObj = (event, key) => {
        setPlaceobj(prev => ({ ...prev, [key]: event.target.value }))
    }
    const customerId = loggedUserData.custId;
    const navigate = useNavigate();

    // const getCartProductListbyCustId = async (customerId) => {
    //     try {
    //         const result = await axios.get(https://freeapi.miniprojectideas.com/api/BigBasket/GetCartProductsByCustomerId?id=${customerId});
    //         if (result !== undefined) {
    //             setCartProductListByCustomer(result);
    //         } else {
    //             toast.error('Error in fetching cart Products');
    //         }
    //     } catch (error) {
    //         alert(error);
    //     }
    // }

    useEffect(() => {
        let total = 0;
        cartProductListByCustomer.forEach(item => {
            total += item.quantity;
        });
        setTotalQuantity(total);
    }, [cartProductListByCustomer]);

    useEffect(() => {
        getCartProductListbyCustId(loggedUserData.custId);
    }, []);

    const resetObj = () => (
        setPlaceobj({
            "saleId": 0,
            "custId": 0,
            "saleDate": "",
            "totalInvoiceAmount": 0,
            "discount": 0,
            "paymentNaration": "",
            "deliveryAddress1": "",
            "deliveryAddress2": "",
            "deliveryCity": "",
            "deliveryPinCode": "",
            "deliveryLandMark": "",
            "isCanceled": true
        })
    );

    const totalInvoiceAmount = cartProductListByCustomer.reduce((total, item) => total + item.productPrice * item.quantity, 0).toFixed(2);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlaceobj((prevObj) => ({
            ...prevObj,
            custId: customerId,
            saleDate: new Date(),
            totalInvoiceAmount: totalInvoiceAmount,
            discount: 0,
            paymentNaration: 'online',
            [name]: value
        }));
    }

    const placeorder = async () => {
        debugger;
        placeObj.totalInvoiceAmount = totalPrice;
        placeObj.custId = loggedUserData.custId;
        const response = await axios.post("https://freeapi.gerasim.in/api/BigBasket/PlaceOrder", placeObj)
        if (response.data.result) {
            for(let i=0;i<cartProductListByCustomer.length;i++)
                {
                    const response = await axios.get("https://freeapi.gerasim.in/api/BigBasket/DeleteProductFromCartById?id=" + cartProductListByCustomer[i].cartId);
                   
                }
            getCartProductListbyCustId(loggedUserData.custId);
           toast.success("Order Succefull")
           navigate("/");
        }

        else {
            toast.error("Failed")
        }

    }

    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white ">
            <div className="container">

                <a className="navbar-brand fs-2 fw-bold " href="#">
                    <FontAwesomeIcon icon={faShoppingCart} style={{ color: 'red' }} />

                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">

                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0  text-center ">

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle fw-semibold text-uppercase  me-1 text-danger" href="#"
                                id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                home
                            </a>
                            <ul className="dropdown-menu  " aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item " href="shop.html">Fashion 1</a></li>
                                <li><a className="dropdown-item" href="#">Fashion 2</a></li>
                                <li><a className="dropdown-item" href="#">furniture 1</a></li>
                                <li><a className="dropdown-item" href="#">furniture 2</a></li>
                                <li><a className="dropdown-item" href="#">Electronics 1</a></li>
                                <li><a className="dropdown-item" href="#">Electronics 1</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle redHover fw-semibold text-uppercase text-black  me-1"
                                href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                pages
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">About Us</a></li>
                                <li><a className="dropdown-item" href="#">Cotact Us</a></li>

                                <li><a className="dropdown-item" href="#">Terms and Conditions</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle fw-semibold text-uppercase text-black  me-1" href="#"
                                id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                product
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Women's</a></li>
                                <li><a className="dropdown-item" href="#">Men's</a></li>
                                <li><a className="dropdown-item" href="#">Kids</a></li>
                                <li><a className="dropdown-item" href="#">Accessoires</a></li>

                            </ul>
                        </li>
                        <li className="nav-item dropdown fw-semibold text-uppercase text-black  me-1">
                            <a className="nav-link dropdown-toggle fw-semibold text-uppercase text-black  me-1" href="#"
                                id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                blog
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Grid</a></li>
                                <li><a className="dropdown-item" href="#">List</a></li>

                                <li><a className="dropdown-item" href="#">Singal Post</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle fw-semibold text-uppercase text-black  me-1" href="#"
                                id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                shop
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Shop Page Layout</a></li>
                                <li><a className="dropdown-item" href="#">Other Page</a></li>

                                <li><a className="dropdown-item" href="#">Product Page</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fw-semibold text-uppercase text-black  me-1" href="#">Contact us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="fa-solid fa-magnifying-glass fs-5"
                                style={{ color: '#0c0d0d;' }}  ></i></a>
                        </li>
                        <li className="nav-item dropdown position-relative d-inline-block ">
                            <a className="nav-link" href="#"><FontAwesomeIcon icon={faShoppingCart} />
                                {totalQuantity > 0 && (
                                    <span className="badge rounded-pill bg-danger">{totalQuantity}</span>
                                )}
                            </a>
                            <ul className="dropdown-menu  menuOnLeft rounded-0 mt-2" aria-labelledby="navbarDropdown">
                                <li className="p-2">
                                    <div className="d-flex w-100 border-bottom justify-content-evenly">
                                        <img className="img-fluid h-25 w-25 p-2" src="../ShopWise/product img/cartImg1.jfif"
                                            alt="" />
                                        <div>
                                            <a href="#" className="text-decoration-none text-black fw-semibold">
                                                <p className="m-0 p-0">Varibale Product 001</p>
                                            </a>
                                            <p>1 <i className="fa-solid fa-xmark" style={{ color: '#0d0d0d;' }} ></i> $ 78.00</p>
                                        </div>
                                        <button type="button" className="btn fs-5 closeBtn"><i
                                            className="fa-solid fa-xmark"></i></button>
                                    </div>
                                </li>
                                <li className="p-2">
                                    <div className="d-flex w-100 border-bottom justify-content-evenly">

                                        <img className="img-fluid h-25 w-25 p-2" src="../ShopWise/product img/cartImg2.jfif"
                                            alt="" />
                                        <div>
                                            <a href="#" className="text-decoration-none text-black fw-semibold">
                                                <p className="m-0 p-0">Ornare consequat</p>
                                            </a>
                                            <p>1 <i className="fa-solid fa-xmark" style={{ color: '#0d0d0d;' }}></i> $ 81.00</p>
                                        </div>

                                        <button type="button" className="btn fs-5 closeBtn"><i
                                            className="fa-solid fa-xmark"></i></button>

                                    </div>
                                </li>
                                <li className="p-2">
                                    <div className=" w-100 ">

                                        <div className="d-flex justify-content-evenly mt-2">
                                            <button className="btn btn-dark rounded-0 px-3">View Cart</button>
                                            <button className="btn btn-danger rounded-0 px-3"><a
                                                className="text-decoration-none text-black"
                                                href="checkout.html">Checkout</a></button>
                                        </div>

                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <section>
            <div className="container mt-5">
                <div className="row">

                    <div className="col-lg-8 col-md-12 mb-3">
                        <div className="card shadow">
                            <div className="card-header bg-danger bg-opacity-25">
                                <h4>Billing Address</h4>
                            </div>
                            <div class="card-body mb-5">

                                <div class="row">

                                    <div class="col-lg-6 col-md-6">
                                        <input type="text" placeholder="City " class="form-control m-2" onChange={(e) => { getplaceObj(e, 'deliveryCity') }} />
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <input type="text" placeholder="Pincode " class="form-control m-2" onChange={(e) => { getplaceObj(e, 'deliveryPinCode') }} />
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <textarea placeholder="Address Line 1 " class="form-control m-2" rows="3" onChange={(e) => { getplaceObj(e, 'deliveryAddress1') }}></textarea>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <textarea placeholder="Address Line  2" class="form-control m-2" rows="3" onChange={(e) => { getplaceObj(e, 'deliveryAddress2') }}></textarea>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <textarea placeholder="Landmark" class="form-control m-2" rows="3" onChange={(e) => { getplaceObj(e, 'deliveryLandMark') }}></textarea>
                                    </div>



                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-12">
                        <div className="card shadow ">
                        <div class="card-header bg-primary text-white">
                                <h4>Your Order</h4>
                            </div>
                            <div className="card-body">
                                {
                                    cartProductListByCustomer.map((cartItems, index) => {
                                        return (
                                            <>
                                                <div className="border-top d-flex mt-2" style={{ width: '50px', height: '50px' }} >
                                                <img className="image-fluid" src={cartItems.productImageUrl} alt="" style={{ maxWidth: '50%', maxHeight: '50%' }} />


                                                    <div className="ps-3">
                                                        <p className="p-0 m-0 fw-semibold">{cartItems.productShortName}</p>
                                                        <p className="p-0 m-0">${cartItems.productPrice.toFixed(2)}</p>
                                                        <p className="text-start mt-4"><button className="btn">QTY : <b>{cartItems.quantity}</b> </button></p>
                                                    </div>
                                                </div>


                                            </>
                                        )
                                    })
                                }
                               
                                <div class="border-top ">


                                    <div class=" border-top ">
                                        <div class="d-flex justify-content-between mt-2">
                                            <p class="fw-semibold">Total :</p>
                                            <p class="fw-semibold"><h6>${cartProductListByCustomer.reduce((total, item) => total + item.productPrice * item.quantity, 0).toFixed(2)}</h6></p>
                                        </div>
                                    </div>
                                    <div class="row border-top ">
                                        <div class="col-12 text-center mt-2">
                                            <div class="w-100 bg-black">
                                                <button class="btn text-white rounded-0 " onClick={placeorder}>Place Order</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    );
};

export default CheckOut;