import Users from "../../models/user.js";
export default async function updateUserByIdController(req, res, next){
    try{
        const { user, params: {userId: id} } = req;
        const update = req.body;

        if (user.role === "admin" || user._id === id){
            const updatedUser = await Users.findByIdAndUpdate(id, update, { new: true });
            if (!updatedUser) return next({err: "Could not find user", code: 404}); 
            res.json(updatedUser);
            return console.log("Updated user details", updatedUser);
        }
        next({err: "Not authorized to update user's details.", code: 401});
    }
    catch(err){
        next(err);
    }
}