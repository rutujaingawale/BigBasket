import axios from 'axios';
import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MycontextProviders = ({ children }) => { 
    const [loggedUserData, setLoggedUser] = useState({});

    const updateLoggedUserData = (user) => {
        setLoggedUser(user);
    }
    
    const [cartProductListByCustomer, setCartProductListByCustomer] = useState([]);
    const getCartProductListbyCustId = async (custId) => {
        debugger
        try {
            const result = await axios.get(`https://freeapi.miniprojectideas.com/api/BigBasket/GetCartProductsByCustomerId?id=${custId}`);
            if (result.data.data != undefined) {
                setCartProductListByCustomer(result.data.data);
            } else {
                console.error('Invalid data format:', result.data.result);
                // Handle the error accordingly
            }
        } catch (error) {
            console.error('Error fetching cart products:', error);
            // Handle the error accordingly
        }
    };

    return (
        <MyContext.Provider value={{ loggedUserData, updateLoggedUserData,cartProductListByCustomer,getCartProductListbyCustId }}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MycontextProviders };
