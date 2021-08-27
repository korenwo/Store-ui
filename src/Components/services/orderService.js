import environment from '../../environments/index'

export class OrderService {

    static getAll () {
        return fetch(environment.apiUrl + '/orders/getAll', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status !== 200) {
                return null;
            }
            return res.json();
        });
    }
  
    static async add (order) {
        let sum = 0;
        for (let product of order) {
            sum += product.price * product.amount;
        }
        let req = {
            order: order,
            price: sum,
            date: Date.now()
        };
        const res = await fetch(environment.apiUrl + '/orders/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        return res.json();
    }

}