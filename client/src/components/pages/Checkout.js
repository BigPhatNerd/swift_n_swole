import React, { useEffect, useContext } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import { Redirect } from 'react-router-dom';
import CheckoutForm from '../CheckoutForm';
import RegistrationContext from '../../context/registration/registrationContext';
import background from '../../img/bucket.jpg';


const Checkout = () => {
  const registrationContext = useContext(RegistrationContext);
const { product, user  } = registrationContext;
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [user])
  const styles = {
        container: {
            backgroundImage: `url(${background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'
        },

    };


console.log("Checkout");
console.log({registrationContext});
if (user.paid) return (
  <Redirect to="/dashboard" />)
  if (user.email === "") return(
    <Redirect to="/" />)
  return (
     <div id='cover' style={styles.container}>
    <StripeProvider apiKey="pk_test_51IeN17DM571FkYKwNxOvFAFBRx2iCBJRWlDwPQcCJZqfdzD1OGwOcc8xM8u7qb5EtA21ZRcE1vnsyt5dpI4lxWDB00k6KSein3">
      <Elements>
        <CheckoutForm selectedProduct={product} email={user.email} />
      </Elements>
    </StripeProvider>
    </div>
  )
}

export default Checkout
