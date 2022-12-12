import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
const STRIPE_KEY =
  'sk_test_51MAewqAimYsCeNwXoVLP63zvnfu8Qatj2CgdeJlxSPmZfjqaMDRd9pn0RzO5psArSLiz7w3ENfukLujcoK6wxoIx00MeXSACjI';

export default function handler(req, res) {
  //Need to forward request to Stripe API
  const stripe = new Stripe(STRIPE_KEY);
  // console.log('stripe', stripe);
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
      console.log('token', token);
      res.status(200).json({ token });
    })
    .catch((err) => {
      console.log('err', err);
      res.status(500).json({ error: err });
    });
  // console.log('req', req);

  console.log('req.body', req.body);
}
