import React from 'react'
import './Home.css';
import { useState, useEffect } from 'react';
import { ProductService } from './services/product.service';
import { OrderService } from './services/orderService';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingCart } from 'react-icons/hi';

const Home = () => {
    const [ showShoppingCart, setShowShoppingCart] = useState(false);
    const [ products, setProducts ] = useState([]);
    const [ shoppingCart, setShoppingCart] = useState([]);

    useEffect(() => {
        getAllProducts();
        getShoppingCart();
    }, []);

    function getAllProducts () {
        ProductService.getAll()
            .then(data => { setProducts(data); })
            .catch(error => console.error(error));
    }

    function getShoppingCart () {
        let cart = localStorage.getItem("shoppingCart") || "[]";
        try {
            cart = JSON.parse(cart);
            setShoppingCart(cart);
        }
        catch (e) {
            console.warn('shopping cart in localstorage is broken', e);
        }
    }

    function addToCart (product) {
        let existingProduct = shoppingCart.find(p => p._id === product._id);
        if (existingProduct) {
            existingProduct.amount++;
        } else {
            product.amount = 1;
            shoppingCart.push(product);
        }
        setShoppingCart(shoppingCart.concat()); //copy the array so react will see the change
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    }   

    function pay () {
        OrderService.add(shoppingCart);
        setShoppingCart([]);
        localStorage.setItem("shoppingCart", "[]");
    }
   
    return (
        <>
            <div className="shopping-cart">
                <div className= "shopping">
                    <HiOutlineShoppingCart />
                </div>
                <button onClick={() => setShowShoppingCart(!showShoppingCart)}>Shopping Cart</button>
                {showShoppingCart ?  
                    <div className="cart-content">
                        {shoppingCart.map(product => 
                            <div key={product._id}>{product.amount}x {product.title} {product.price}$</div>
                        )}
                        <div>Total {shoppingCart.reduce((sum, product) => sum + parseInt(product.price)*product.amount, 0)}$</div>
                        <button className="pay" onClick={() => pay()}>Pay</button>
                    </div>
                : <></>
                }
            </div>

            <div className="products-container">
                {products.map(product => (
                    <div className="product-box" key={product._id}>
                        <div>{product.title}</div>
                        <div>{product.price}$</div>
                        <img alt="" src={product.image}/> 
                        <button onClick={() => addToCart(product)}>Buy</button>     
                    </div>
                ))}
            </div>
            <Link to="/admin">Admin</Link>
            <br></br>
            <Link to="/stats">Stats</Link>
        </>
    );
}
export default Home;