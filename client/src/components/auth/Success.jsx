
// import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../ui/dialog";
// import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

// export default function AccountConfirmationSuccess({title, desc, msg, open, setOpen}){
//     return (
//     <Dialog open= {open} onOpenChange= {setOpen}>
//         <DialogContent>
//             <DialogHeader>
//                 <VisuallyHidden.Root>
//                     <DialogTitle>Registration Success</DialogTitle>
//                     <DialogDescription>Thank you for registering!</DialogDescription>
//                 </VisuallyHidden.Root>
//             </DialogHeader>
//             <Card>
//                 <CardHeader>
//                     <h2>Registration Success</h2>
//                 </CardHeader>
//                 <CardContent>
//                     <img src= "/images/success.png" alt= "success" />
//                     <p>Thank you for registering! Your account registration is successfully complete. You may login now with your credentials to start using Slice Rush.</p>
//                 </CardContent>
//             </Card>
//         </DialogContent>
//     </Dialog>)
// }


import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export default function Success({title, desc, msg, open, setOpen}){
    return (
    <Dialog open= {open} onOpenChange= {setOpen}>
        <DialogContent className= "bg-gradient-to-bl from-black from-60% to-grey-800 rounded-2xl shadow-lg border-none max-w-sm p-4 ">
            <DialogHeader>
                <VisuallyHidden.Root>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{msg}</DialogDescription>
                </VisuallyHidden.Root>
            </DialogHeader>
            <Card className= "bg-transparent border-none text-white">
                <CardHeader className= "font-helvetica tracking-tight text-2xl text-center flex flex-col justify-center ">
                    <h2>{title}</h2>
                </CardHeader>
                <CardContent className= "text-grey-5 flex flex-col justify-center gap-y-4 ">
                    <img src= "/images/success.png" alt= "success" />
                    <p>{desc}</p>
                </CardContent>
            </Card>
        </DialogContent>
    </Dialog>)
}