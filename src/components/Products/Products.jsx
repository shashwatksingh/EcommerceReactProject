import React from 'react';
import { Grid } from '@material-ui/core';
import Product from './Product/Product';
import useStyles from './styles';
//Products array for temporary use
const products = [
    {id: 1, name: 'Shoes', description: 'Running Shoes', price: '$5', 'image': 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80'},
    {id: 2, name: 'Macbook', description: 'Higher end Laptops', price: '$8.75', 'image': 'https://images.unsplash.com/photo-1613502971768-d0b2138cc2db?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bWFjYm9vayUyMHByb3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'},
    {id: 3, name: 'Laptop', description: 'Medium range laptop', price: '$7.54', 'image': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'},
    {id: 4, name: 'Television', description: 'best Televisions in the category',price: '$12', 'image': 'https://images.unsplash.com/photo-1611484543726-c3685163acfe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'}
];
products.map((product) => {
    return console.log(product);
});
const Products = () => {
    const classes = useStyles();
    return(
    <main className={classes.content}>
        <div className={classes.toolbar} />
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