import React, { useEffect, useState } from 'react';
import { ProductService } from './services/product.service';

function ProductForm(props) {
    const [product, setProduct] = useState({title: '', description: '', price: '', image: ''});

    useEffect(() => {
        if (props.product) { //only for edit mode
            setProduct(props.product);
        }
    }, [props.product]);

    async function save(e) {
        if (props.product) {
            await editProduct();
        } else {
            await addNewProduct();
        }
        e.preventDefault();
    }

    async function addNewProduct() {
        await ProductService.add(product);
    }

    async function editProduct() {
        await ProductService.edit(product);
    }

    return (
        <div>
            <form onSubmit={save}>
                <div>
                    <label htmlFor="title">title:</label>
                    <input type="text" id="title" name="title" value={product.title} onChange={e => setProduct({...product, title: e.target.value})} />
                </div>
                <div>
                    <label htmlFor="description">description:</label>
                    <input type="text" id="description" name="description" value={product.description} onChange={e => setProduct({...product, description: e.target.value})} />
                </div>
                <div>
                    <label htmlFor="price">price:</label>
                    <input type="text" id="price" name="price" value={product.price} onChange={e => setProduct({...product, price: e.target.value})} />$
                </div>
                <div>
                    <label htmlFor="image">image URL:</label>
                    <input type="text" id="image" name="image" value={product.image} onChange={e => setProduct({...product, image: e.target.value})} />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default ProductForm
