import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';

const steps = ['Shipping address', 'Payment Details'];
const Checkout = ({ cart }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    useEffect(() => {
        const generateToken = async () => {
            try{
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                console.log(token);
                setCheckoutToken(token);             
            } catch (error) {

            }
        }
        // You cannot create async function as a direct function of useEffect
        generateToken();
    }, [cart]);
    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} /> : <PaymentForm />
    
    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    )
    
    return (
        <React.Fragment>
            <div className={classes.toolbar} />
            <div className={classes.layout} />
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {
                   activeStep === steps.length ? < Confirmation /> : checkoutToken && <Form />
                }
            </Paper>                       
        </React.Fragment>
    )
}

export default Checkout
