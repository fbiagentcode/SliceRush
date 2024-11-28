import mongoose from "mongoose";

export default function mongooseErrorHandler(err, req, res, next){
    if (!(err instanceof mongoose.Error)) next(err);
    if(err.code === 11000) throw {err: {username: "An account with that email already exists."}, code: 409};
    else if(err.errors){
        const errors = {};    
        // Object.values(err.errors).forEach(({properties}) => console.log(properties));
        Object.values(err.errors).forEach(({properties}) => properties? errors[properties.path] = properties.message : false);
        if (Object.keys(errors).length) throw {err: errors, code: 409};
        else throw {err: err.message, code: 500};
    }
    next();
}