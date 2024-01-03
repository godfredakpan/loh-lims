
const express = require('express');
const bodyParser = require('body-parser');
const laboratorySupplyRoutes = require('./src/routes/laboratorySupplyRoutes');
const db = require('./src/config/db');
const cors = require("cors");

const app = express();

const whitelist = [
  "http://localhost:3000",
  "http://localhost:3001"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));


const PORT = 3001;

app.use(bodyParser.json());

db.connect();

app.get("/", (req, res) => {
    res.send("LIMS API for Lights on Heights");
});
  

app.use('/api/laboratory-supplies', laboratorySupplyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
