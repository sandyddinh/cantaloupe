require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const path = require('path');
const stripe = require('stripe')('sk_test_51IZiVpCZzgAQXehg6ZnMvqWFR4woJK7jePrXfYN7di6pAyIfYahcz1nkpZgDwlgEw1N1QP6mmuLHwm6GbmguxQx800Bbs0qenG');
const DOMAIN = 'http://localhost:3000';

const MONGODB_URI = process.env.MONGODB_URI
const db = mongoose.connection;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
	useFindAndModify: false
});
db.on('open', () => {
    console.log('Mongo is Connected');
});
/* Middleware */
app.use(express.json());
if (process.env.NODE_ENV !== 'development'){
  app.use(express.static('public'))
}

app.use(/\.[0-9a-z]+$/i, express.static('public'));

/* Controller */
app.use('/api/cantaloupe/cart', require('./controllers/carts'));
app.use('/api/cantaloupe/', require('./controllers/items'));

app.post('/checkout', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Stubborn Attachments',
              images: ['https://i.imgur.com/EHyR2nP.png'],
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${DOMAIN}/success.html`,
      cancel_url: `${DOMAIN}/cancel.html`,
    });
    res.json({ id: session.id });
  });

//LISTENER

// for react router
app.get('*', (req, res) => {
	res.sendFile(path.resolve(path.join(__dirname, 'public', 'index.html')))
})

app.listen(PORT, () => {
    console.log(`API Listening on port ${PORT}`);
});
