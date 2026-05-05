import express from 'express';
import studentRouter from './routes/student';
import logger from './middleware/logger';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger)

app.get('/', (req, res) => {
    res.send('API is running')
});

app.use('/students', studentRouter)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});