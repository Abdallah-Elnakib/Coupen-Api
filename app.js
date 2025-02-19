const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {Coupen} = require('./models/coupen');
const {Auth} = require('./models/auth');
const {connectDB} = require('./config/connDB');

connectDB();
const app = express();

app.use(cors());
app.use(express.json());


app.post('/get-coupen', async (req, res) => {
  const {username, password} = req.headers;
  const auth = await Auth.findOne({username});
  if(!auth) {
        return res.status(401).send('Unauthorized..........');
    }
  if(auth.password !== password) {
        return res.status(401).send('Unauthorized..........');
    }
   if (auth.number === 0) {
        return res.status(401).send('Unauthorized..........');
    }
    const number = auth.number
    await Auth.findOneAndUpdate({username}, {number: number-1});
    const Allcoupen = await Coupen.find();
    const coupen = Allcoupen[0];
    res.send({"Discount code ": coupen.code});
});

app.post('/discount', async (req, res) => {
    const {code} = req.body;
    const coupen = await Coupen.findOne({code});
    if(!coupen) {
        return res.status(400).send('Invalid code');
    }
    await Coupen.deleteOne({
        code
    });
    res.send('Discount applied');
})


mongoose.connection.once('open', () => {
  console.log('Database connected......');
  app.listen(8000, () => {
    console.log('Server started......');
  });
})


mongoose.mongoose.connection.on('error', (error) => {
  console.error(error);
});

