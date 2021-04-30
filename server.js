require('dotenv').config()
const express = require('express');
const connectDB = require('./config/db');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile')
const stripe = require('./routes/stripe');
var cors = require('cors')
const app = express();
connectDB();

//Init middleware
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(cors());
app.use(express.json({ extended: false }));

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/stripe', stripe);




if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) =>{
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))