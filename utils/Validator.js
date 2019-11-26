const validator=require('validator');

const validate=(user)=>{

    const errors={};

    if(Object.keys(user).filter(user=>user==='firstName').length>0){

        if(validator.isEmpty(user.firstName)){
            errors.firstName='Please enter your first name'; 
        }

    }

    if(Object.keys(user).filter(user=>user==='lastName').length>0){

        if(validator.isEmpty(user.lastName)){
            errors.lastName='Please enter your last name'; 
        }

    }

    if(!validator.isEmail(user.email)){
        errors.email="Please enter a valid email";
    }

    if(!validator.isLength(user.email,{min:1})){
        errors.email="Please enter a valid email";
    }

    if(!validator.isLength(user.password,{min:6})){
        errors.password="Minimum Characters needed are 6";
    }

return {
    isValid:Object.keys(errors).length===0,
    errors
}
}

module.exports= validate;