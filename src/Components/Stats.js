import React, {useState, useEffect} from 'react'
import './Stats.css';
import { OrderService } from './services/orderService';

function Stats () {

    const [ top5prod, setTop5prod ] = useState([]);
    const [ top5unique, setTop5unique ] = useState([]);
    const [ past5Days, setPast5Days ] = useState([]);

    useEffect(() => {
        loadStats();
    }, []);

    function loadStats () {
        OrderService.getAll ()
            .then(orders => {
                let top5Map = {};
                let top5UniqueMap = {};
                let past5DaysMap = {};

                for (let order of orders) {
                    
                    let day = new Date(order.date).toLocaleDateString();
                    if (!past5DaysMap[day]) {
                        past5DaysMap[day] = {day: day, price: 0};
                    }
                    past5DaysMap[day].price += order.price;
                    
                    for (let product of order.order) {
                       
                        if (!top5Map[product._id]) {
                            top5Map[product._id] = {product: product, amount: 0};
                        }
                        top5Map[product._id].amount += product.amount;

                        if (!top5UniqueMap[product._id]) {
                            top5UniqueMap[product._id] = {product: product, amount: 0};
                        }
                        top5UniqueMap[product._id].amount++;

                    }  
                }
                
                let top5ProductsArr = Object.values(top5Map).sort((a,b) => b.amount - a.amount);
                top5ProductsArr.length = 5;
                setTop5prod(top5ProductsArr);
                 
                let top5UniqueArr = Object.values(top5UniqueMap).sort((a,b) => b.amount - a.amount);
                top5UniqueArr.length = 5;
                setTop5unique(top5UniqueArr);

                let past5DaysArr = Object.values(past5DaysMap).reverse();
                past5DaysArr.length = 5;
                setPast5Days(past5DaysArr);
            })
            .catch(e => console.error('Error loading API', e));
    }

    return (
        <div className="top-sale">
            <div className="products-container">
                <div className="product-box">
                    <b>Top 5 sale</b>
                    {top5prod.map(product => 
                        <div key={product.product._id}>{product.product.title} - {product.amount}</div>
                    )}
                </div>
                <div className="product-box">
                    <b>Top unique sale</b>
                    {top5unique.map(product =>
                        <div key={product.product._id}>{product.product.title} - {product.amount}</div>
                    )}
                </div>
                <div className="product-box">
                    <b>past 5 day $</b>
                    {past5Days.map(day => 
                        <div key={day.day}>{day.day} - {day.price}$</div>
                    )}
                </div>
            </div>
        </div>
    );

}

export default Stats;