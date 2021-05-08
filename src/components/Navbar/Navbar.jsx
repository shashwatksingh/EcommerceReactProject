import React  from 'react';
import { AppBar, Toolbar, IconButon, Badge, MenuItem, Menu, Typography, IconButton } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/images/Logo.jpg';
import useStyles from './styles';
const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image}/>
                        ShopeNow
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.button}>
                        <IconButton aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>            
        </>
    )
}

export default Navbar
