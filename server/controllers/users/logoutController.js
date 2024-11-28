
export default function logoutController(req, res){
    res.cookie("auth", null, { maxAge: 0 }).json({loggedOut: true});
}