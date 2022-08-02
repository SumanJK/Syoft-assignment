

const app= require('index.js')
const connect= require('./config/db')

const port= process.env.PORT || 8000

app.listen(port, async()=>{

  try{
    await connect()
    console.log(`connected to port ${port}`)
  }catch(err){
    console.log(`error connecting to port ${port}`)
  }
})