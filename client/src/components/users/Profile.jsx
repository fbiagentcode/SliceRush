import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

export default function Profile({user}){
    return <Card>
        <CardContent>
            <img src={user.imageUrl} alt= {user.name} />
            <h2>{user.name}</h2>
        </CardContent>
        <CardFooter>
            <EditProfile user= {user} />
        </CardFooter>
    </Card>
}