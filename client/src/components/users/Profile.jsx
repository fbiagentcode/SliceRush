import EditProfile from "./EditProfile";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

export default function Profile({user}){
    return <Card className=  "flex flex-col h-[400px] justify-center items-center gap-y-4 p-4 bg-gradient-to-bl from-black from-60% to-grey-800 rounded-2xl shadow-lg border-none "> 
        <CardContent className= "flex flex-col  justify-center items-center text-white text-2xl tracking-tight">
            <img className= "rounded-full w-1/2" src={user.imageUrl} alt= {user.name} crossOrigin= "anonymous"/>
            <h2>{user.name}</h2>
        </CardContent>
        <CardFooter>
            <EditProfile user= {user} />
        </CardFooter>
    </Card>
}