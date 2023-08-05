const { Schema,model} = require('mongoose')


const userSchema = new Schema({
    username:{
        type:String,
        required: true
        // unique : true
    }
,
password:{
        type: String,
        required : true,
        unique : true
    }
    ,
email:{
        type: String,
        required: true,
        unique : true
    },

    role: {
        type: String,
        required: true,
        default: "user"
    }
,
profile:{
    type: String,
    default : "https://shutterstock.7eer.net/c/38919/1636625/1305?trafcat=T4&trafsrc=Direct&u=https://www.shutterstock.com/image-photo/2180848911&sharedid=www.vecteezy.com&subId1=search-sponsored-grid_height_boost-test&subId2=010591df-a099-42eb-815e-367936c86885&adtype=vector&adplacement=SRP&subId3=default-profile-picture_2180848911_null"
   
}
,
    joining: {
        type: Date,
        default: Date.now
    }
})
const user = model('user', userSchema)
module.exports = user