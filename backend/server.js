import express from 'express';
import cors from 'cors';

const app= express();
const port= 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'API is connected' });
});

app.post('/webhook', (req,res) => {
    try {
        const data = req.body;

        if (!data || typeof data !== 'string'){
            return res.status(400).json({ error: 'Invalid data format' });
        }

        const charArray = data.split('');
        const sortArray= charArray.sort((a,b) => a.localeCompare(b));

        return res.status(200).json({ word: sortArray});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });        
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});