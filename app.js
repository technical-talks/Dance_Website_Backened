const express=require("express")
const port=8000;
const app=express();
const path=require('path')
const bodyparser=require('body-parser')
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/contactDance');

  
}
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,

  });
var Contact = mongoose.model('Contact', contactSchema);



// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))  // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine','pug') // Set the template engine as pug
app.set('views',path.join(__dirname,'views')) // Set the view directory 

// END POINTS
app.get('/',(req,res)=>{
   
    const params={}
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
   
    const params={}
    res.status(200).render('contact.pug',params);
})
app.post('/contact',(req,res)=>{
  var myData=new Contact(req.body);
  myData.save().then(()=>{
    res.send("this item has been saved to database")

  }).catch(()=>{
    res.status(400).send("Item has not been saved in database")
  })
});




// START SERVER
app.listen(port,()=>{
    console.log(`the application started successfully  on port ${port}`);
})  