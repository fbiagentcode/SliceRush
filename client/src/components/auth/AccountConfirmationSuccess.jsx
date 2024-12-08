
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export default function AccountConfirmationSuccess({open, setOpen}){
    return (
    <Dialog open= {open} onOpenChange= {setOpen}>
        <DialogContent>
            <DialogHeader>
                <VisuallyHidden.Root>
                    <DialogTitle>Registration Success</DialogTitle>
                    <DialogDescription>Thank you for registering!</DialogDescription>
                </VisuallyHidden.Root>
            </DialogHeader>
            <Card>
                <CardHeader>
                    <h2>Registration Success</h2>
                </CardHeader>
                <CardContent>
                    <img src= "/images/success.png" alt= "success" />
                    <p>Thank you for registering! Your account registration is successfully complete. You may login now with your credentials to start using Slice Rush.</p>
                </CardContent>
            </Card>
        </DialogContent>
    </Dialog>)
}