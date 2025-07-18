const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
  res.send('Backend server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
