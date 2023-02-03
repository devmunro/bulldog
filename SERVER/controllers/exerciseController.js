import 'dotenv/config';
import axios from 'axios';

const apiKey = process.env.NINJA_API_KEY;


export const getExercisesByType = ( req, res) => {
    const type = req.query.type;
    console.log(type)
    const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/' + type;
    const headers = {
    'X-RapidAPI-Key': process.env.X_API_KEY,
    'X-RapidAPI-Host': process.env.X_API_HOST
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