const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', //  frontend URL
  credentials: true
}));
