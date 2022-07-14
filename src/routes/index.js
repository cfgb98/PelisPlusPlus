const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const mongoose = require('mongoose');

router.post('/add',async (req, res)=>{
const {title, year, category, director, actors, description}=req.body;

const newMovie= new Movie({ 
    title,
    year,
    category,
    director,
    actors,
    description
 });// crear nuevo dato

  await newMovie.save(); // se almacena en base de datos
 console.log(newMovie);

 res.redirect('/');
});

router.get('/',async(req, res)=>{
    const movies = await Movie.find();//traer datos desde bd
    console.log(movies);
 res.render('index',{movies});
 });

//pintar formulario para editar
router.get('/edit/:id',async(req, res)=>{

    const movie = await Movie.findById(req.params.id)//traer datos desde bd
.then(data =>{
    if(!mongoose.Types.ObjectId.isValid(data.id)){
        console.log('data: ',data);
        return false;
    }
    return {
        id:data.id,
        title:data.title,
        year:data.year,
        category:data.category,
        director:data.director,
        actors:data.actors,
        description:data.description
        
    }
})
res.render('edit',{movie});


});


//editar con los datos obtenidos de la funcion anteriror
router.put('/edit/:id',async(req, res)=>{
    const {title, year, category, director,actors, description} = req.body;
    await Movie.findByIdAndUpdate(req.params.id, {title, year, category, director, actors, description});
    res.redirect('/');
});


router.get('/delete/:id',async(req,res)=>{
const { id } = req.params;
await Movie.remove({_id:id});
res.redirect('/');
});

module.exports = router;