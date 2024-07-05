const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(logger); // Use logger middleware

const personRoutes = require('./routes/person');
app.use('/api/persons', personRoutes);

const authentication = require('./routes/auth')
app.use('/api/auth', authentication)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
