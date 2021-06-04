import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Row, Button  } from 'react-bootstrap';

import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from 'react-stripe-elements'
import axios from 'axios'
import RegistrationContext from '../context/registration/registrationContext';
import Spinner from './Spinner';

const CheckoutForm = ({ selectedProduct, stripe, email }) => {
  const registrationContext = useContext(RegistrationContext);
  const { setAlert, product, loadUser } = registrationContext;
  const [receiptUrl, setReceiptUrl] = useState('');

console.log('CheckoutForm.js')
console.log({registrationContext})
  if (selectedProduct === null) {
   <Redirect to='/' />
    return null
  }

  

  const handleSubmit = async event => {
    event.preventDefault()

console.log("I was hit");
    const { token } = await stripe.createToken({
      name: 'customer name'
    })
    
    if(!token) return setAlert('There was a problem in Stripe', 'dark');
const price = selectedProduct.price * 100;
    const order = await axios.post('http://localhost:5000/stripe/charge', {
      amount: price.toString().replace('.', ''),
      source: token.id,
      receipt_email: email,
      eventId: product.id
    })
    setReceiptUrl(order.data.charge.receipt_url);
    loadUser();


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
        <Button  type="submit" className="order-button btn btn-primary" size="lg">
        
          Pay
        </Button>
      </form>
    </Container>
  )
}

export default injectStripe(CheckoutForm)
