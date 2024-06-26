
const express = require('express');
const path = require('path');
const app = express();

const mongoose=require('mongoose');
const sample=require('./Models/hospitalApp');

const dotenv=require('dotenv');
const { appendFile } = require('fs/promises');
dotenv.config();

const uri=process.env.mongo_uri;
mongoose.connect(uri);

const database=mongoose.connection;

database.on('error',(error)=>{
    console.log(error);
});
database.once("connected",()=>{
    console.log("Database connected");
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.get('/appointments', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/appointments', (req, res) => {

    const id= req.params.id;
    const details=sample.findOne({tokenID: id})
    console.log(details);
    res.json(details);
    
  });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/addAppointment', (req, res) => {
  res.sendFile(__dirname,'public','addAppointment.html');
});

app.post('/addAppointment', async(req, res) => {
    try{
        const data=req.body;
        console.log(data)
        const details= await sample.create(data);
        res.status(201).redirect('/viewAppointment');
    
       }
    catch(error){
    res.status(500).json
    }

});



app.get('/viewAppointment', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'viewAppointment.html'));
});



app.get('/deleteAppointment', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'deleteAppointment.html'));
  
});

app.get('/deleteAppointment/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'deleteAppointment.html'));
    
  });

app.delete('/deleteAppointment/:id', async(req, res) => {

try{
    const data=req.body;
    console.log(data)
    const details= await sample.delete(data);
    res.status(201).redirect('/viewAppointment');

   }
catch(error){
res.status(500).json
}
});



app.get('/api/appointment/:id', async(req, res) => {
    
    res.sendFile(path.join(__dirname, 'public', 'index.html'));


});

app.get('/api/appointment/:id', async(req, res) => {
    const id= req.params.id;
    const details= await sample.findOne({tokenID: id})
    console.log(details);
    res.json(details);
});


app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});