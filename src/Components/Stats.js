import React, {useState, useEffect} from 'react'
import './Stats.css';
import { OrderService } from './services/orderService';

function Stats () {

    const [ top5prod, setTop5prod ] = useState([]);
    const [ top5unique, setTop5unique ] = useState([]);
    const [ pas5Days, setPas5Days ] = useState([]);

    useEffect(() => {
        getTop5();
    });

    function getTop5 () {
        OrderService.getAll ()
            .then(orders => {
                let buyProducts = {};
                let top5Unique = {};
                let pas5Days = {};
                for (let order of orders) {
                    for (let product of order.order) {
                        if (!buyProducts[product._id]) {
                            buyProducts[product._id] = {product: product, amount: 0};
                        }
                        buyProducts[product._id].amount += product.amount;
                    }
                    if (!top5Unique[top5Unique._id]) {
                        top5unique[ top5unique._id] = {top5Unique: top5Unique, amount: 0};
                    }
                    top5unique[top5Unique._id].amount += top5Unique.amount;
                }
                if (!pas5Days[pas5Days._id]) {
                    pas5Days[pas5Days._id] = {pas5Days: pas5Days, amount: 0};
                }
                
                let buyProductsArr = Object.values(buyProducts).sort((a,b) => b.amount - a.amount);
                buyProductsArr.length = 5;
                setTop5prod(buyProductsArr);
             
                let buyProductsUnique = Object.values(buyProducts).sort((a,b) => b.amount - a.amount);
                buyProductsArr.length = 5;
                setTop5unique (buyProductsUnique);
            
                let buyPas5Days = Object.values(buyProducts).sort((a,b) => b.amount - a.amount);
                buyProductsArr.length = 5;
                setPas5Days(buyPas5Days);
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
                        {top5unique.map(product => 
                         <h1 key={product._id}>{product.title}</h1>
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

export default Stats;