const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  console.log('Webhook received');

  console.log(JSON.stringify(req.body, null, 2));

  res.status(200).json({
    received: true
  });
};