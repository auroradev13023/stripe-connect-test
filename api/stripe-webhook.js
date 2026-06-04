const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const event = req.body;

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const amountTotal = session.amount_total;
    const partnerShare = Math.round(amountTotal * 0.6);

    console.log('Amount Total:', amountTotal);
    console.log('Kate Share:', partnerShare);
    console.log('Iryna Share:', amountTotal - partnerShare);
  }

  res.status(200).json({ received: true });
};