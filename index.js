const express= require('express')
const cors= require('cors')
const bodyParser= require('body-parser')
const port= process.env.PORT || 7000;
const userRoute= require('./routes/userRoute')
const orderRoute= require('./routes/orderRoute')
//const User= require('./models/user')

const Order= require('./models/order')

const db= require('./config/mongoose.js')
db()


const app=express();
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(cors())
app.use('/user',userRoute )
app.use('/order',orderRoute)


app.listen(port,()=>{
	console.log(`server is up and running at ${port}`)
})
