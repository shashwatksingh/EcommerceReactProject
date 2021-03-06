import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { Link, useHistory } from 'react-router-dom';

const steps = ['Shipping address', 'Payment Details'];
const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const history = useHistory();
    useEffect(() => {
        const generateToken = async () => {
            try{
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                console.log(token);
                setCheckoutToken(token);             
            } catch (error) {
                history.pushState("");                
            }
        }
        // You cannot create async function as a direct function of useEffect
        generateToken();
    }, [cart]);

    const nextStep = () => setActiveStep(prev => prev + 1);
    const backStep = () => setActiveStep(prev => prev - 1);

    const test = (data) => {
        setShippingData(data);
        nextStep();
    }
    
    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true);           
        }, 3000);
    }

    let Confirmation = () => order.customer ? (
        <React.Fragment>
            <div>
                <Typography variant="h5">Thank You for your purchase {order.customer.firstname} {order.customer.lastname}!! </Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order ref: {order.customer_refernce}</Typography>
            </div>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">BACK TO HOME</Button>
        </React.Fragment>
    ) : isFinished ? (
        <React.Fragment>
            <div>
                <Typography variant="h5">Thank You for your purchase!! </Typography>
                <Divider className={classes.divider} />
            </div>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">BACK TO HOME</Button>
        </React.Fragment>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );
    
    if(error) {
        <React.Fragment>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">BACK TO HOME</Button>
        </React.Fragment>
    }
    
    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} test={test} /> : <PaymentForm onCaptureCheckout={onCaptureCheckout} shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} timeout={timeout} />
    
    return (
        <React.Fragment>
            <CssBaseline />
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
