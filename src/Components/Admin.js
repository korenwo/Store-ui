import React, { useState, useEffect} from 'react';
import './Admin.css';
import { ProductService } from './services/product.service';
import Modal from "react-modal";
import ProductForm from './ProductForm';
import { Link } from 'react-router-dom';

Modal.setAppElement("#root");

function Admin() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts();
    }, []);

    function getAllProducts () {
        ProductService.getAll()
            .then(data => { setProducts(data); })
            .catch(error => console.error(error));
    }

    async function deleteProduct (product) {
        await ProductService.delete(product);
        getAllProducts();
    }

    return (
        <div>
            <button onClick={() => setShowAddForm(true)}>Add</button>
            
            <Modal
                isOpen={showAddForm}
                onRequestClose={() => setShowAddForm(false)}
                contentLabel="Add new product"
            >
                <h2>Add new product</h2>
                <ProductForm onSave={() => { getAllProducts(); setShowAddForm(false); }}></ProductForm>
            </Modal>

            <Modal
                isOpen={showEditForm ? true : false}
                onRequestClose={() => setShowEditForm(false)}
                contentLabel="Edit product"
            >
                <h2>Edit product</h2>
                <ProductForm product={showEditForm} onSave={() => { getAllProducts(); setShowEditForm(false); }}></ProductForm>
            </Modal>

            <table>
                <thead>
                    <tr>
                        <th>title</th>
                        <th>price</th>
                        <th>option</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product.title}</td>
                            <td>{product.price}$</td>
                            <td>
                                <button onClick={() => setShowEditForm(product)}>Edit</button>
                                <button onClick={() => deleteProduct(product)}>delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/">Home</Link>
        </div>
    )
}

export default Admin;