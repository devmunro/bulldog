import 'dotenv/config';
import axios from 'axios';

const apiKey = process.env.NINJA_API_KEY;


export const getAllExercises = ( req, res) => {
    const url = 'https://api.api-ninjas.com/v1/exercises';
    const headers = {
        'X-Api-Key': apiKey
    };
    axios.get(url, {headers: headers})
    .then(response => {
        res.status(200).json(response.data);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: error.message });
    });
}