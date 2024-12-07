import EditProfile from "./EditProfile";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

export default function Profile({user}){
    return <Card>
        <CardContent>
            <img src={user.imageUrl} alt= {user.name} crossOrigin= "anonymous"/>
            <h2>{user.name}</h2>
        </CardContent>
        <CardFooter>
            <EditProfile user= {user} />
        </CardFooter>
    </Card>
}