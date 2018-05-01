module.exports = function(app, express,io) {
    let router = express.Router();
    let constantObj = require('./../constants.js');

     
    let deviceController = require('./../controllers/devices');
    
    
     app.post('/api/v1/add_device', deviceController.addDevice); //add device
     app.put('/api/v1/edit_device', deviceController.editDevice); //edit device
     app.get('/api/v1/getdata', deviceController.getData); // GetData
     app.get('/api/v1/getone/:device_id', deviceController.getOne); // GetData
     app.delete('/api/v1/remove_device/:device_id', deviceController.deleteDevice); // GetData


     app.post('/api/v1/add_interface', deviceController.addInterface); //add device
     app.post('/api/v1/edit_interface', deviceController.updateInterface); //update device

      app.delete('/api/v1/remove_interface/:device_id/:interface_id', deviceController.deleteInterface); // GetData



}
