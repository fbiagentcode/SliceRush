
export default function mongooseErrorHandler(err, req, res, next){
    const errorTypes = ["MongoServerError", "ValidationError"];
    // if error is not related to mongodb
    if (!(errorTypes.includes(err.name))) return next(err);

    if(err.code === 11000) return next({err: {email: "An account with that email already exists."}, code: 409});
    else if(err.errors){
        const errors = {};    
        Object.values(err.errors).forEach(({properties}) => properties? errors[properties.path] = properties.message : false);
        if (Object.keys(errors).length) return next({err: errors, code: 409});
        else return next({err: err.message, code: 500});
    }
   next(err);
}