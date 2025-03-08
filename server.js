const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const dbAuth = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '14062005',
  database: 'user_auth'
});

const dbCheckout = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '14062005',
  database: 'Checkout'
});

dbAuth.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL (user_auth):', err);
    return;
  }
  console.log('Connected to MySQL (user_auth)');
});

dbCheckout.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL (Checkout):', err);
    return;
  }
  console.log('Connected to MySQL (Checkout)');
});

app.use(bodyParser.json());
app.use(express.static('public'));

// User registration
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  dbAuth.query(query, [username, email, hashedPassword], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send({ id: result.insertId });
    }
  });
});

// User login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  dbAuth.query(query, [email], async (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.length === 0) {
      res.status(401).send('User not found');
    } else {
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Invalid credentials');
      }
    }
  });
});

// Endpoint to handle checkout
app.post('/checkout', (req, res) => {
  const { cart } = req.body;
  const user_id = 1; 

  const query = 'INSERT INTO orders (user_id, product_id, quantity) VALUES ?';
  const values = cart.map(item => [user_id, item.product_id, item.quantity]);

  dbCheckout.query(query, [values], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send('Order placed successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

