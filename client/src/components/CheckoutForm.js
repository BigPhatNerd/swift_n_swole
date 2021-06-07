import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Button  } from 'react-bootstrap';
import Spinner from './Spinner';

import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from 'react-stripe-elements'
import axios from 'axios'
import RegistrationContext from '../context/registration/registrationContext';


const CheckoutForm = ({ selectedProduct, stripe, email }) => {
  const registrationContext = useContext(RegistrationContext);
  const { setAlert, product, loadUser } = registrationContext;
  const [receiptUrl, setReceiptUrl] = useState('');
  const [stripeLoading, setStripeLoading]  = useState(false);

  const handleStripeLoading = () => setStripeLoading(true);
  const handleStopStripeLoading = () => setStripeLoading(false)

console.log('CheckoutForm.js')
console.log({registrationContext})
  if (selectedProduct === null) {
   <Redirect to='/' />
    return null
  }

  

  const handleSubmit = async event => {

   try {
      event.preventDefault()
      handleStripeLoading()
     
      const { token } = await stripe.createToken({
      name: 'customer name'
    })
    
    if(!token){
      handleStopStripeLoading();
     setAlert('There was a problem with your Stripe transaction', 'dark');
     return
   }
const price = selectedProduct.price * 100;
//Replace code with proper
    const order = await axios.post('/stripe/charge', {
      amount: price.toString().replace('.', ''),
      source: token.id,
      receipt_email: email,
      eventId: product.id
    })

    setReceiptUrl(order.data.charge.receipt_url);
    loadUser();
   } catch(err) {
    handleStopStripeLoading();
     setAlert(err.message, 'danger')
     
     
   }


  }


  if (receiptUrl) {
     
    return (
      <div className="success">
        <h2>Payment Successful!</h2>
        <a href={receiptUrl}>View Receipt</a>
        <br />
        <Link to="/">Home</Link>
      </div>
    )
  }

  return (
   <Container className='pt-4'>
    <Row className="justify-content-center m-2">
    <h3>Type: {selectedProduct.name}</h3>
    </Row>
    <Row className="justify-content-center m-2">
    <h3>Description: {selectedProduct.descr}</h3>
    </Row>
    <Row className="justify-content-center m-2">
    <h3>Venue: {selectedProduct.venue}</h3>
    </Row>
      <Row className="justify-content-center m-2">
      <h3>Amount: ${selectedProduct.price}</h3>
      </Row>
      <Row className="justify-content-center m-2">
      <h3>Email: {email} </h3>
      </Row>
      <form onSubmit={handleSubmit}>
        <label>
        <Row className="justify-content-center m-2">
          Card details
          </Row>
          <div id='card-details'>
          <CardNumberElement />
          </div>
        </label>
<br />
        <label>
          Expiration date
          <div id='expiration'>
          <CardExpiryElement />
          </div>
        </label>
        <br />
        <label>
          CVC
          <div id='cvc'>
          <CardCVCElement />
          </div>
        </label>
        <br />
      {stripeLoading && <Spinner />}
        <Button  type="submit" className="order-button btn btn-primary m-2" size="lg" disabled={stripeLoading}>
        
          Pay
        </Button>
      </form>
    </Container>
  )
}

export default injectStripe(CheckoutForm)
