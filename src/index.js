import express from 'express';
import { PORT } from './constants/constants.js';
const app = express();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});
