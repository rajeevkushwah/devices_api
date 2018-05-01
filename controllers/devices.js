var DeviceObj = require('./../models/devices.js');
let moment = require('moment');
let constantObj = require('./../constants.js');
let io = require('../server').io;
let mongoose = require('mongoose');





exports.addDevice=function(req,res,next){


    req.assert('hostname', 'hostname cannot be blank.').notEmpty();    
    req.assert('loopback_ipv4', 'loopback_ipv4 cannot be blank').notEmpty();

   let errors = req.validationErrors();
  if (errors) {
    return res.status(400).send({
      msg: constantObj.messages.requiredParams,
      err: errors
    });
  }
   
    
    DeviceObj.find({ $or: [ { hostname: req.body.hostname},{loopback_ipv4: req.body.loopback_ipv4 }] }).exec(function(error, devices) {

        if(error){
              return res.status(400).send({
                        msg: constantObj.messages.errorRetreivingData,
                        err: error
                      });
            }

             if(devices.length==0){
                DeviceObj(req.body).save(req.body,function(err,responce){
            if(err){
              return res.status(400).send({
                        msg: constantObj.messages.errorInSave,
                        err: err
                      });
            }
            return res.status(200).send({
                        msg: constantObj.messages.deviceSuccess,
                        data: responce
                      });
          })
             }else{
              return res.status(400).send({
                        msg:  constantObj.messages.deviceAlreadyExist
                        
                      });
             }
      })

  

}

exports.editDevice=function(req,res,next){

    req.assert('_id', '_id cannot be blank.').notEmpty(); 
    req.assert('hostname', 'hostname cannot be blank.').notEmpty();    
    req.assert('loopback_ipv4', 'loopback_ipv4 cannot be blank').notEmpty();

   let errors = req.validationErrors();
  if (errors) {
    return res.status(400).send({
      msg: constantObj.messages.requiredParams,
      err: errors
    });
  }
   
    
    DeviceObj.find({ $or: [ { hostname: req.body.hostname,_id: { $ne: req.body._id }}, {loopback_ipv4: req.body.loopback_ipv4 ,_id: { $ne: req.body._id }}] }).exec(function(error, devices) {

        if(error){
              return res.status(400).send({
                        msg: constantObj.messages.errorRetreivingData,
                        err: error
                      });
            }

             if(devices.length==0){
                DeviceObj.update({_id:req.body._id},{$set:{ hostname: req.body.hostname, loopback_ipv4: req.body.loopback_ipv4 }},function(err,responce){
            if(err){
              return res.status(400).send({
                        msg: constantObj.messages.errorInSave,
                        err: err
                      });
            }
            return res.status(200).send({
                        msg: constantObj.messages.deviceUpdateSuccess,
                        data: responce
                      });
          })
             }else{
              return res.status(400).send({
                        msg:  constantObj.messages.deviceAlreadyExist
                        
                      });
             }
      })

  

}



exports.deleteDevice=function(req,res,next){
    
    DeviceObj.remove({_id:req.params.device_id}).exec(function(err,responce){
      if(err){
        return res.status(400).send({
                  msg: constantObj.messages.errorRetreivingData,
                  err: err
                });
      }
      return res.status(200).send({
                  msg: constantObj.messages.deviceDeleteSuccess,
                  data: responce
                });
    })

}


exports.getOne=function(req,res,next){
    
    DeviceObj.findOne({_id:req.params.device_id}).exec(function(err,responce){
      if(err){
        return res.status(400).send({
                  msg: constantObj.messages.errorRetreivingData,
                  err: err
                });
      }
      return res.status(200).send({
                  msg: constantObj.messages.successRetreivingData,
                  data: responce
                });
    })

}


exports.getData=function(req,res,next){
    
    DeviceObj.find({is_deleted:false,enable:true}).exec(function(err,responce){
    	if(err){
    		return res.status(400).send({
                  msg: constantObj.messages.errorRetreivingData,
                  err: err
                });
    	}
    	return res.status(200).send({
                  msg: constantObj.messages.successRetreivingData,
                  data: responce
                });
    })

}

exports.addInterface=function(req,res,next){
  req.assert('device_id', 'device_id cannot be blank').notEmpty();
   req.assert('interface', 'interface cannot be blank').notEmpty();
    req.assert('interface_ipv4', 'interface_ipv4 cannot be blank').notEmpty();
   
   let errors = req.validationErrors();
  if (errors) {
    return res.status(400).send({
      msg: constantObj.messages.requiredParams,
      err: errors
    });
  }

    let obj={interface:req.body.interface,interface_ipv4:req.body.interface_ipv4};


    DeviceObj.find({ "_id" : req.body.device_id,$or:[{"interfaces.interface" : req.body.interface},{"interfaces.interface_ipv4" : req.body.interface_ipv4}]}).exec(function(error, devices) {

        if(error){
              return res.status(400).send({
                        msg: constantObj.messages.errorRetreivingData,
                        err: error
                      });
            }

             if(devices.length==0){

                DeviceObj.update({_id:req.body.device_id},{$push:{interfaces:obj}},function(err,responce){
                    if(err){
                      return res.status(400).send({
                                msg: constantObj.messages.errorInSave,
                                err: err
                              });
                    }else{       
                      return res.status(200).send({
                                msg: "Interface save successfully",
                                data: responce
                              });
                    }
                    
                  })

             }else{
              return res.status(400).send({
                        msg:  constantObj.messages.interfaceAlreadyExist
                        
                      });
             }
           })
    

}

exports.updateInterface=function(req,res,next){
  req.assert('device_id', 'device_id cannot be blank').notEmpty();
  req.assert('interface_id', 'interface_id cannot be blank').notEmpty();
   req.assert('interface', 'interface cannot be blank').notEmpty();
    req.assert('interface_ipv4', 'interface_ipv4 cannot be blank').notEmpty();
   
   let errors = req.validationErrors();
  if (errors) {
    return res.status(400).send({
      msg: constantObj.messages.requiredParams,
      err: errors
    });
  }

    let obj={_id:req.body.interface_id,interface:req.body.interface,interface_ipv4:req.body.interface_ipv4};


    DeviceObj.find({ "_id" : req.body.device_id,$or:[{"interfaces.interface" : req.body.interface,"interfaces._id": { $ne: req.body.interface_id }},{"interfaces.interface_ipv4" : req.body.interface_ipv4,"interfaces._id": { $ne: req.body.interface_id }}]}).exec(function(error, devices) {

        if(error){
              return res.status(400).send({
                        msg: constantObj.messages.errorRetreivingData,
                        err: error
                      });
            }

             if(devices.length==0){

                DeviceObj.findOneAndUpdate({ "_id": req.body.device_id, "interfaces._id": req.body.interface_id },{ 
                                                            "$set": {
                                                                "interfaces.$": obj
                                                            }
                                                        },function(err,responce){
                    if(err){
                      return res.status(400).send({
                                msg: constantObj.messages.errorInSave,
                                err: err
                              });
                    }else{       
                      return res.status(200).send({
                                msg: "Interface updated successfully",
                                data: responce
                              });
                    }
                    
                  })

             }else{
              return res.status(400).send({
                        msg:  constantObj.messages.interfaceAlreadyExist
                        
                      });
             }
           })
    

}


exports.deleteInterface=function(req,res,next){
    
    DeviceObj.update({_id:req.params.device_id}, {$pull: {
                interfaces: {
                    _id: req.params.interface_id
                }
            }
          }
).exec(function(err,responce){
      if(err){
        return res.status(400).send({
                  msg: constantObj.messages.errorRetreivingData,
                  err: err
                });
      }
      return res.status(200).send({
                  msg: constantObj.messages.interfaceDeleteSuccess,
                  data: responce
                });
    })

}


