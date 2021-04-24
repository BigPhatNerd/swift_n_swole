import React, { useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
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
  const { setAlert } = registrationContext;
  const [receiptUrl, setReceiptUrl] = useState('')

console.log({selectedProduct})
console.log({email})
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
      receipt_email: email
    })
    setReceiptUrl(order.data.charge.receipt_url);

  }


  if (receiptUrl) {
     
    return (
      <div className="success">
        <h2>Payment Successful!</h2>
        <a href={receiptUrl}>View Receipt</a>
        <Link to="/">Home</Link>
      </div>
    )
  }

  return (
    <div className="checkout-form">
    <p>Type: {selectedProduct.name}</p>
    <p>Description: {selectedProduct.descr}</p>
    <p>Venue: {selectedProduct.venue}</p>
      <p>Amount: ${selectedProduct.price}</p>
      <p>Email: {email} </p>
      <form onSubmit={handleSubmit}>
        <label>
          Card details
          <CardNumberElement />
        </label>

        <label>
          Expiration date
          <CardExpiryElement />
        </label>
        <label>
          CVC
          <CardCVCElement />
        </label>
        <button type="submit" className="order-button">
          Pay
        </button>
      </form>
    </div>
  )
}

export default injectStripe(CheckoutForm)
