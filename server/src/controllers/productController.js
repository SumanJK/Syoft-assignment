
const Product = require('../models/productModel')

const express = require('express')

const router= express.Router();

//get all products
router.get('/',async(req, res)=>{
  try{

    const products= await Product.find().lean().exec();
    res.status(201).send(products)
    
  }catch(err){
    res.status(404).send(err.message)
  }
});

//post a product
router.post('/',async(req, res)=>{
  try{

    const products= await Product.create(req.body)
    res.status(201).send(products)
    
  }catch(err){
    res.status(404).send(err.message)
  }
});

module.exports = router;