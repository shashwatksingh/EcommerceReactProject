import React  from 'react';
import { AppBar, Toolbar, IconButon, Badge, MenuItem, Menu, Typography, IconButton } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/Logo.jpg';
import useStyles from './styles';
const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    //Switching off the elements at the particular location
    const location = useLocation();
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image}/>
                        ShopeNow
                    </Typography>
                    <div className={classes.grow} />
                    { location.pathname === '/' && 
                        (<div className={classes.button}>
                            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>)
                    }
                </Toolbar>
            </AppBar>            
        </>
    )
}

export default Navbar
