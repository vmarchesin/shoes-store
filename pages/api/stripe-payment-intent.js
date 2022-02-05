import Stripe from "stripe";

//const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe('sk_test_51JJalJLXMXnonUZ0nioemxYKK7XM92OMW4lcfVg4AANJkNyd2P5bKX9Mz4GLQHPmBdao7GUoniFreF2weUCP6D2t007fhLOn9e');

export default async (req, res) => {
  console.log('req', req.body);
  if (req.method === "POST") {
    try {
      const { amount } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd"
      });

      res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};