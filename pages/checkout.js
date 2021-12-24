import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Layout from '../components/layout/layout'
import StripeCheckoutForm from "../components/stripe/stripeCheckoutForm";

const Checkout = () => {

 // const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
 const stripePromise = loadStripe('pk_test_51JJalJLXMXnonUZ019wkVxroBYLGALpeFfnPC5Bt5kkW4Jd1y8oDDLWfKLT0Q4SuY2QHIhPmojRekr7woLfbOkst00FUGg1Ups');

  return (
    <Layout classMain="fullpage">
      <Elements stripe={stripePromise}>
        <StripeCheckoutForm/>
      </Elements>
    </Layout>
  );
};

export default Checkout;
