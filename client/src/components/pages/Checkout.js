import React, { useEffect, useContext } from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
import CheckoutForm from '../CheckoutForm';
import RegistrationContext from '../../context/registration/registrationContext';

const Checkout = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
const registrationContext = useContext(RegistrationContext);
const { product, user, setProduct, register, setAlert } = registrationContext;
console.log({registrationContext});
  return (
    <StripeProvider apiKey="pk_test_51IeN17DM571FkYKwNxOvFAFBRx2iCBJRWlDwPQcCJZqfdzD1OGwOcc8xM8u7qb5EtA21ZRcE1vnsyt5dpI4lxWDB00k6KSein3">
      <Elements>
        <CheckoutForm selectedProduct={product} email={user.email} />
      </Elements>
    </StripeProvider>
  )
}

export default Checkout
