import React, {useState, useEffect} from 'react'
import './Stats.css';
import { OrderService } from './services/orderService';


function Stats () {

    const [ top5prod, setTop5prod ] = useState([]);
    const [ top5unique, setTop5unique ] = useState([]);
    const [ pas5Days, setPas5Days ] = useState([]);

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
                setTop5unique(buyProductsArr);
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
                setPas5Days(buyProductsArr);
            })
    }

        return (
            <div className="top-sale">
                <div className="products-container">
                    <div className="product-box">
                        <b>Top 5 sale</b>
                        {top5prod.map(product => 
                            <span key={product._id}>{product.title}</span>
                        )}
                    </div>
                    <div className="product-box">
                        <b>Top unique sale</b>
                        {top5unique.map(product => 
                         <span key={product._id}>{product.title}</span>
                         )}
                    </div>
                    <div className="product-box">
                        <b>past 5 day $</b>
                        {pas5Days.map(product => 
                         <span key={product._id}>{product.title}{product.date}</span>
                         )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Stats;