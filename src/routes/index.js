//const { response } = require('express');
const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.get('/',async(req, res)=>{
   const movies = await Movie.find();//traer datos desde bd
   console.log(movies);
res.render('index',{
    movies
});
});

router.post('/add',async (req, res)=>{
   const Movie = new Movie(req.body);  
   await Movie.save();//guardar en la bd
res.redirect('/');//re dirigir a la pag principal
});

router.get('/update/:id', async (req, res)=>{
    const { id } = req.params;
    const Movie = await Movie.findById(id);
   await Movie.save();
   res.redirect('/');
});

//pintar formulario para editar
router.get('/edit/:id',async(req, res)=>{
    const { id } = req.params;
    const Movie = await Movie.findById(id);//traer datos desde bd
res.render('edit',{
    Movie
});
});


//editar con los datos obtenidos de la funcion anteriror
router.post('/edit/:id',async(req, res)=>{
    const { id } = req.params;
    await Movie.update({_id:id},req.body);
    res.redirect('/');
});

router.get('/delete/:id',async(req,res)=>{
const { id } = req.params;
await Movie.remove({_id:id});
res.redirect('/');
});

module.exports = router;