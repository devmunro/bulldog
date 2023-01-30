import 'dotenv/config';
import axios from 'axios';

const apiKey = process.env.NINJA_API_KEY;


export const getExercisesByType = ( req, res) => {
    const type = req.query.type;
    console.log(type)
    const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/' + type;
    const headers = {
    'X-RapidAPI-Key': 'b63b748399msh0e8f15af5bd6b11p1a177cjsn902b57c82e46',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
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