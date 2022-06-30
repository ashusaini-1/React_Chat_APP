const mongoose=require('mongooes');
const bcryt=require('bcryptjs');
const { model } = require('mongoose');

/*
mongoose.connect("mogodb://localhost:27017/",{

UseNewUrlParser:true,UseUnifiedTopology:true}).then(()=>

console.warn("Connection was Successfull")).catch((err)=>{

console.warn(Error)

});*/

const UserSchema=new mongoose.UserSchema({

Username:{
type:String,
required:[true,"Please Provide a Username"]
},
email:{type:String,
    required:[true,"please provide a mail"],
    unique:true,
    match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ]
 },

parssword:{
type:String,
required:[true,'please add a passwprd'],
minlength:6,
select:false


},


resetPasswordToken: String,
resetPasswordExpire: Date,


});
//to check password is modify or not
UserSchema.pre("save",async function(next){
if(!this.modified('password')){
next();
}
const salt=await bcryt.genSalt(10);
this.parssword=await bcryt.hash(this.parssword,salt);
next();

})


const User=mongoose.model('User',UserSchema);
module.exports=User;