const express = require('express');
const app = express();
require('dotenv').config();

const userRoutes = require('./routes/users');
const jobRoutes = require('./routes/jobs');

app.use(express.json());
app.use('/users', userRoutes);
app.use('/jobs',jobRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
