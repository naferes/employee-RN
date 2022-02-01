const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
require('./Employee');


app.use(bodyparser.json());
const Employee = mongoose.model("employee")


//cnq password rSElFb86LaAa3akT
const mongoUri = "mongodb+srv://cnq:rSElFb86LaAa3akT@cluster0-nv3m0.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
})
mongoose.connection.on("connected", ()=>{
    console.log("connected to mongoDb")
})

mongoose.connection.on("error", (err)=> console.log(err))
app.get('/', (req,res)=>{
    Employee.find({}).then(data=>res.send(data))
})

app.post('/send-data', (req,res)=>{
    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        picture: req.body.picture,
        salary: req.body.salary,
        position: req.body.position
    })
    employee.save()
    .then(data=>res.send({message: 'success'}))
    .catch(e=> console.log(e))
})

app.post('/delete', (req,res)=>{
    Employee.findByIdAndRemove(req.body.id)
    .then(data=>res.send("deleted")). catch(e=> console.log(e))
})

app.post('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id,{
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        picture: req.body.picture,
        salary: req.body.salary,
        position: req.body.position
    }).then(data => res.send("updated"))
    .catch(e=> console.log(e))
})


app.listen(3000, ()=>{
    console.log("listening on 3000");
}) 