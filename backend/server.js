const express = require('express')
const app = express();
const dotenv = require('dotenv')
const connection = require('./config/db')
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes')
const { errorResponseHandler, invalidPathHandler } = require('./controllers/errorHandlerMiddleware');



dotenv.config();
connection()
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server running")
}
)

app.use('/api/users',userRoutes)
app.use('/api/ticket',ticketRoutes) 

app.use(errorResponseHandler);
app.use(invalidPathHandler);

const PORT = process.env.PORT
app.listen(PORT, () => { console.log('server is running') })