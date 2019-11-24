const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const User=require('../api/models/User');

const opts={};


opts.secretOrKey='secret';
opts.jwtFromRequest=ExtractJWT.fromAuthHeaderAsBearerToken();


module.exports=passport=>{
    console.log('test');
    return passport.use(new JWTStrategy(opts,(payload,done)=>{
        console.log('payload',payload);
        const {id,email}=payload;
        console.log('email',email);
        return User.findAll({
        where:{
            email
        }
    })
    .then(user=>{
        if(user.length===0){
            return done('error',false);
        }
        return done(null,user[0]);
    })
    .catch(err=>done(err,false));



    }))



}