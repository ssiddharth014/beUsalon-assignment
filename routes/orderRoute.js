const express = require('express')

const Order = require('../models/order.js')
const User= require('../models/user.js')
const router = express.Router();








router.post('/create',async (req,res)=>{
	try{
		
		const exist=await  User.findOne({_id:req.body._id})

		if (exist)
		{
			
			const order= new Order({
				id:req.body.id,
				subtotal:req.body.subtotal,
				user:req.body._id
			})
			const newOrder= await order.save()
			if (newOrder)
			{

				return res.status(201).send({"msg":"Order Created","status":201})
			}
		}
		else
		{
			return res.send({"msg":"Unauthorized"})
		}

	}
	catch(err)
	{
		res.send({"err": err.message})
	}
})


router.get('/details/userwise', async(req,res)=>{
	try
	{
		const allOrders=await Order.find({}).populate('user').exec();
		
		const details=[{}]
		allOrders.map(async (list)=>{
			console.log(list.user.id)
			var x=  list.user.id
			console.log("x",x)
			if(details[0][x])
			{
				console.log(typeof(x),"k")
              details[0][x].noOforders+=1;
              details[0][x].avgBill= (((details[0][x].avgBill*(details[0][x].noOforders-1))+list.subtotal)/(details[0][x].noOforders))
			}
			else{
				console.log(typeof(x),"f")
				details[0][x]={"id":list.user.id,"name":list.user.name,
				"noOforders":1,"avgBill":list.subtotal}
			}
		})
		return res.send({"allUserDetails":details})



	}
	catch(err)
	{
		console.log(err)
		res.send({"err": err.message})
	}
})





module.exports= router