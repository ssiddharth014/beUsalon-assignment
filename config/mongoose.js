const mongoose = require('mongoose')

const URL = 'mongodb+srv://shop:shop@shop.abwnf.mongodb.net/<dbname>?retryWrites=true&w=majority'
const db=async() =>{
	try{
await mongoose.connect(URL,{useUnifiedTopology:true,useNewUrlParser:true,useCreateIndex:true})
console.log('connected..');
}
catch(err){
	console.log(err)
}
}

module.exports= db;