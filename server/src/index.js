
const express= require('express');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());

const {register, login} = require('./controllers/AuthController')
const products = require('./controllers/productController')

app.post('/register',register)
app.post('/login',login)
app.use('/products',products)




const connect= require('./config/db')

const port=  8000

app.listen(port, async()=>{

  try{
    await connect()
    console.log(`connected to port ${port}`)
  }catch(err){
    console.log(`error connecting to port ${port}`)
  }
})
