require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const postCharge = require('./src/stripe');
const paymentRouter = express.Router();

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

/* Payments Controller */
paymentRouter.post('/stripe/charge', postCharge)
paymentRouter.all('*', (_, res) =>
  res.json({ message: 'please make a POST request to /stripe/charge' })
) // catch all other requests
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
}) // define middleware to enable CORS for all requests
app.use(bodyParser.json())
app.use('/api', paymentRouter)
app.use(express.static(path.join(__dirname, './public')))

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'))
})

//LISTENER

// for react router
app.get('*', (req, res) => {
	res.sendFile(path.resolve(path.join(__dirname, 'public', 'index.html')))
})

app.listen(PORT, () => {
    console.log(`API Listening on port ${PORT}`);
});
