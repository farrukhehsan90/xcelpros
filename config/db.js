const Sequelize=require('sequelize');

const db=new Sequelize('postgres://hzrxydpe:iWIOm2OWubuVitIEpV853WHCK1iN86t1@salt.db.elephantsql.com:5432/hzrxydpe')

db.authenticate()
    .then(res=>console.log('Postgres connected'))
    .catch(err=>console.log('err',err));


module.exports=db;