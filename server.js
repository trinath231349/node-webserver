const express= require('express');
const hbs = require('hbs');
const fs = require('fs');
const port= process.env.PORT|| 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')



app.set('view engine','hbs');
//middleware used to pass 



app.use((req, res, next)=>{
    var now =new Date().toString();
    var log =`${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

//
//app.use((req, res, next)=>{
//        res.render('maintanance.hbs');
//        });

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear',() =>{
    return new Date().getFullYear()
});
//handler
app.get('/',(req,res) => {
    
    res.render('home.hbs',{
        pageTitle :'Trinath',
        userName:'chowdary',
   
        
    });
//   res.send('<h1>hello express trinath!</h1>');
//    res.send({
//        name:'trinath',
//        age: 30,     
//    likes: [
//        'name',
//        'cities'
//        ]
//    });
});
app.get('/about',(req,res)=>{
  //  res.send('about Page');
    res.render('about.hbs',{
        pageTitle:'About Page',
      
    });
    
});

app.get('/projects',(req, res)=>{
         res.render('projects.hbs',{
          pageTitle: 'Projects',
         });
         
         });
app.get('/bad',(req,res)=>{
   res.send({
        errormessage:'unable to handle '    
   });
});

app.listen(port,()=>{
console.log(`server is up on port ${port}`);
});
