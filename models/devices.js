var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var devicesSchema = new mongoose.Schema({	
  	hostname:{type:String, unique: 'Host name already exists.'},
  	loopback_ipv4:{type:String, unique: 'loopback ipv4 already exists.'}, 
  	interfaces:[{
        interface: {
            type: String
        },
        interface_ipv4: {
            type: String
        },
        is_deleted : {type : Boolean, default : false},
        enable : {type : Boolean, default : true},
        created_date : {type : Date, default : Date.now}
    }],  	
	is_deleted : {type : Boolean, default : false},
	enable : {type : Boolean, default : true},
	created_date : {type : Date, default : Date.now}
});





var devicesObj = mongoose.model('devices' , devicesSchema);
module.exports = devicesObj;