const mongoose = require ('mongoose')

const salonUserSchema= new mongoose.Schema({
	id:{type:Number, required:true ,unique: true},
	name:{type:String, required:true}

})





const salonuserModel= mongoose.model('SalonUser',salonUserSchema);
 module.exports= salonuserModel;
