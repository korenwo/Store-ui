import environment from '../../environments/index'

export class ProductService {

  static getAll () {
    return fetch(environment.apiUrl + '/product._id', {
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

  static edit (product) {
    return fetch(environment.apiUrl + '/' + product._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
  }

  static async delete (product) {
    return fetch(environment.apiUrl + '/' + product._id , {
        method: 'DELETE'
    });
  }

  static async add (product) {
    const res = await fetch(environment.apiUrl + '/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      })
    return res.json();
  }

}