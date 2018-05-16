const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register'); 
const signin = require('./controllers/signin'); 
const image = require('./controllers/image'); 
const profile = require('./controllers/profile'); 

app.use(bodyParser.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
}
});

app.get('/', (req, res) => {res.send('it is working')});
app.put('/image', (req, res) => {image.countEntries(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => {profile.getProfile(req, res, db)});
app.post('/signin', (req,res) => {signin.onSignIn(req, res, db, bcrypt)});
app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});


app.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})
