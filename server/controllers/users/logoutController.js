
export default function logoutController(req, res){
    res.cookie("auth", 0, { maxAge: 0 }).json({loggedOut: true});
}