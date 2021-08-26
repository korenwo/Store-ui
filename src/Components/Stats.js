import React, {useState, useEffect} from 'react'
import './Stats.css';
import { OrderService } from './services/orderService';

function Stats () {

    const [ top5prod, setTop5prod ] = useState([]);
    const [ top5un, setTop5un ] = useState([]);
    const [ pas5D, setPas5D ] = useState([]);

    useEffect(() => {
        getTop5();
        getTop5unique();
        getPas5Days();
    });

    function getTop5 () {
        OrderService.getAll ()
            .then(orders => {
                let buyProducts = {};
                for (let order of orders) {
                    for (let product of order.order) {
                        if (!buyProducts[product._id]) {
                            buyProducts[product._id] = {product: product, amount: 0};
                        }
                        buyProducts[product._id].amount += product.amount;
                    }
                }
                let buyProductsArr = Object.values(buyProducts).sort((a,b) => b.amount - a.amount);
                buyProductsArr.length = 5;
                setTop5prod(buyProductsArr);
            })
        }

    function getTop5unique () {
        OrderService.getAll ()
            .then(orders => {
                let buyProducts = {};
                for (let order of orders) {
                    for (let product of order.order) {
                        if (!buyProducts[product._id]) {
                            buyProducts[product._id] = {product: product};
                        }    
                    }
                }
                let buyProductsArr = Object.values(buyProducts).sort((a,b) => b.amount - a.amount);
                buyProductsArr.length = 5;
                setTop5un(buyProductsArr);
            })
        }

    function getPas5Days  () {
        OrderService.getAll ()
            .then(orders => {
                let buyProducts = {};
                for (let order of orders) {
                    for (let product of order.order) {
                        if (!buyProducts[product._id]) {
                            buyProducts[product._id] = {product: product, amount: 0};
                        }
                        buyProducts[product._id].amount += product.amount;
                    }
                }
                let buyProductsArr = Object.values(buyProducts).sort((a,b) => b.amount - a.amount);
                buyProductsArr.length = 5;
                setPas5D(buyProductsArr);
            })
        }

        return (
            <div className="top-sale">
                <div className="products-container">
                    <div className="product-box">
                        <b>Top 5 sale</b>
                        {top5prod.map(product => 
                            <div key={product._id}>{product.title}</div>
                        )}
                    </div>
                    <div className="product-box">
                        <b>Top unique sale</b>
                        {top5un.map(product => 
                         <h1 key={product._id}>{product.title}</h1>
                         )}
                    </div>
                    <div className="product-box">
                        <b>past 5 day $</b>
                        {pas5D.map(product => 
                         <span key={product._id}>{product.title}{product.date}</span>
                         )}
                    </div>
                </div>
            </div>
        )
    }


export default Stats;