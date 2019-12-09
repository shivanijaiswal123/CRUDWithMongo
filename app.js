const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Activity = require('./models/activity.js')

app.use(bodyParser.json());
mongoose.promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/employeeDB')

// Read
app.get('/api/activities',function(req,res){
    console.log("get activites")
    Activity.find({}).then(eachOne => {
        res.json(eachOne);
    })
});


// create
app.post('/api/activities',function(req,res){
    Activity.create(
        
            {
                activity_name: req.body.activity_name,
                quantity : req.body.quantity
            }).then(activity=> {
                res.json(activity)
            });
        
    
});

// getting by id
app.get('/api/activities/:activity_id',function(req,res){
    Activity.findById(req.params.activity_id).then(function(err,activity){
        if(err){
            res.send(err)
        }
        res.json(activity)

    })
})

// Delete
app.delete('/api/activities/:activity_id',function(req,res){
    Activity.findOneAndRemove(
        
            {
                activity_name: req.body.activity_name,
                quantity : req.body.quantity
            }).then(activity=> {
                res.json(activity)
            });
        
    
});

// update
app.put('/api/activities/:activity_id',function(req,res){
    Activity.findOneAndUpdate(
        
            {
                activity_name: req.body.activity_name,
                quantity : req.body.quantity
            }).then(activity=> {
                res.json(activity)
            });
        
    
});




//listening server
app.listen(4008);
console.log("Good job")
