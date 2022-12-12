import Stripe from 'stripe';
const stripeKey = process.env.STRIPE_KEY;
export default function handler(req, res) {
  //We now forward the request to the Stripe API
  console.log('stripe key', stripeKey);
  const stripe = new Stripe(stripeKey);
  const { card_number, expiration_month, expiration_year, cvv } = req.body;

  if (!card_number || !expiration_month || !expiration_year || !cvv) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  stripe.tokens
    .create({
      card: {
        number: card_number,
        exp_month: Number(expiration_month),
        exp_year: Number(expiration_year),
        cvc: cvv,
      },
    })
    .then((token) => {
      res.status(200).json({ token });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
