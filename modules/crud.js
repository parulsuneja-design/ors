const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/appointment',{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,});
var conn = mongoose.Collection;
var crudSchema = new mongoose.Schema({
    name: {type:String,
        required: true,
        index: {
            unique: true,
        }},
    time: {type:String,
        required: true,
        index: {
            unique: true,
            }},
    phone: {
        type:String,
            required: true
        
        },
    service: {
            type:String,
                required: true
            
            },
    date: {
        type:Date,
            default: Date.now }   
});

var crudModel = mongoose.model('crud' , crudSchema);
module.exports=crudModel;