import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';

const stripePromise = loadStripe("pk_test_51IuL8bSJNs038e9RW8SgsxGWZaxGL4uhoLqg160CQwXGBCq6527tHbKx8ZHhbR2F3dVfhCIrj3o0eHwZAp0NnSR300ZOQSVn7J");
console.log(stripePromise);

const PaymentForm = ({ checkoutToken, shippingData, nextStep, backStep, onCaptureCheckout }) => {

    console.log(shippingData);
    
    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();
        
        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({type: 'card', card: cardElement});

        if(error) {
            console.log(error);
        } else {
            const orderData = {
                list_item: checkoutToken.live.line_items,
                customer: {firstname: shippingData.firstname, lastname: shippingData.lastname, email: shippingData.email},
                shipping: {name: 'Primary', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry},
                fulfillment: {shipping_method: shippingData.shippingOption},
                payment: {gateway: 'stripe', stripe: {
                    payment_method_id: paymentMethod.id
                }}
            }

            console.log(orderData);
            onCaptureCheckout(checkoutToken.id, orderData);

            nextStep();
        }
    }
    
    return (
        <React.Fragment>
            <Review checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>Payment method</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe}) => (
                        <form onSubmit={(event) => handleSubmit(event, elements, stripe)}>
                            <CardElement />
                            <br />
                            <br />
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Button variant="outlined" onClick={backStep}>Back</Button>
                                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                    Pay { checkoutToken.live.subtotal.formatted_with_symbol }
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </React.Fragment>
    )
}

export default PaymentForm
