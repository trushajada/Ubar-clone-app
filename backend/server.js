const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const cors = require('cors');
const server = http.createServer(app);
const connectToDb = require('./db/db');

app.use(cors());
connectToDb();

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});