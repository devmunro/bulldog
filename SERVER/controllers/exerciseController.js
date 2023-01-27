import 'dotenv/config';
import axios from 'axios';

const apiKey = process.env.NINJA_API_KEY;


export const getExercisesByType = ( req, res) => {
    const type = req.query.type;
    console.log(type)
    const url = 'https://api.api-ninjas.com/v1/exercises?type=cardio';
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