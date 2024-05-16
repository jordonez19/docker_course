
import express from 'express';
import mongoose from 'mongoose';


const Animal = mongoose.model('Animal', new mongoose.Schema({
    tipo: String,
    estado: String
}));

const app = express();

mongoose.connect('mongodb://admin:password@monguito:27017/');

app.use((req, res, next) => {
    console.log(`Recibida solicitud ${req.method} a ${req.url}`);
    next();
});

app.get('/animal', async (_req, res) => {
    console.log('creando  estos =================> animales animal gato')
    const animal = await Animal.create({ tipo: 'gato', estado: 'feliz' });

    return res.send({ animal, res: 'ok' });
})

app.get('/', async (_req, res) => {
    console.log('obteniendo  animales ')
    const animales = await Animal.find();

    return res.send({ animales, res: 'ok' });
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})