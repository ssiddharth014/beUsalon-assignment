const mongoose =require('mongoose')


const salonOrderSchema= new mongoose.Schema({









	id:{type:Number, unique: true, required: true},
	subtotal:{type:Number, required: true},
	user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SalonUser'

    }
},
    {
    

    timestamps:true




});
const salonorderModel= mongoose.model('SalonOrder',salonOrderSchema);
 module.exports= salonorderModel;
