const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

const userRoutes = require('./routes/users');
const jobRoutes = require('./routes/jobs');
const candidateRoutes = require('./routes/candidate');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use('/users', userRoutes);
app.use('/jobs', jobRoutes);
app.use('/candidate', candidateRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
