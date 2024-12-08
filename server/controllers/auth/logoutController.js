
export default function logoutController(req, res){
    res.cookie("auth", 0, { maxAge: 0 }).json({loggedOut: true});
    console.log(`${req.user.name} logged out at ${Date(Date.now())}`);
}