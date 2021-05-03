import React from 'react';
import { Grid } from '@material-ui/core';
import Product from './Products/Product';
//Products array for temporary use
const products = [
    {id: 1, name: 'Shoes', description: 'Running Shoes', price: '$5'},
    {id: 2, name: 'Macbook', description: 'Higher end Laptops', price: '$8.75'},
    {id: 3, name: 'Laptop', description: 'Medium range laptop', price: '$7.54'},
    {id: 4, name: 'Television', description: 'best Televisions in the category',price: '$12'}
];
products.map((product) => {
    return console.log(product);
});
const Products = () => {
    return(
    <main>
        <Grid container justify="center" spacing={4}>
            {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
        </Grid>
    </main>
    )
}

export default Products;