const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const users=require('./api/routes/userRoutes');

app.get('/',(req,res)=>{

    return res.json({msg:"Node is running"});

})

app.use(passport.initialize());
require('./config/passport')(passport);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use('/users',users);


const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})