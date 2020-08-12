const express = require('express')

const User = require('../models/user.js')
const Order = require('../models/order.js')

const router = express.Router();
//const mongooseDynamic = require('mongoose-dynamic-schemas')
router.post('/register',async (req,res)=>{


	try{
		
		const exist=await  User.findOne({id:req.body.id})

		if (exist){
			return res.status(400).send({msg:"user exists"})
		}
		else{
			const user= new User({
				id:req.body.id,
				name:req.body.name
			})
			const newUser= await user.save()
			if (newUser)
			{

				return res.status(201).send({"msg":"User Created","status":201,"id":newUser._id})
			}
		}

	}
	catch(err){
		
           return res.send({msg:err.message})
	}
})

router.get('/update/userOrders',async(req,res)=>{
	try{
		



		const insert = await User.aggregate([{$addFields :{"myorders":0}}])
	

		if(insert )
			
		{
			console.log(insert)
			const allOrders=await Order.find({}).populate('user').exec();

			allOrders.map(async(list)=>{
				let user= await User.findOne({id:list.user.id})
                        if(user )
                        	
                        { 
                        	user.myorders+=1;
                        	user.save()
                        }
			})
			
			return res.send({"sucsess":true,"message":"Successfully Updated"})
		}

	}
	catch(err)
	{
		res.send({"msg":err.message})
	}
})
module.exports= router