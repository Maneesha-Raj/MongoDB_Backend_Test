const {Schema,model}=require('mongoose');
const demo=new Schema({
    tokenID:{
        type:String,
        required:true
    },
    patientName:{
        type:String,
        required:true
    },
    doctorName:{
        type:String,
        required:true
    },
    doa:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }

});

const HospDet=model('hospdetails',demo);
module.exports=HospDet;