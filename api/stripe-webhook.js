const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const event = req.body;

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const amountTotal = session.amount_total;
    const partnerShare = Math.round(amountTotal * 0.6);

    console.log('Amount Total:', amountTotal);
    console.log('Partner Share:', partnerShare);

    try {
      const transfer = await stripe.transfers.create({
        amount: partnerShare,
        currency: session.currency,
        destination: process.env.CONNECTED_ACCOUNT_ID,
      });

      console.log('Transfer created:', transfer.id);
    } catch (error) {
      console.error('Transfer failed:', error);
    }
  }

  res.status(200).json({ received: true });
};