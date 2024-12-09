import { useContext, useEffect, useRef, useState } from "react";

import {ScrollArea} from "../ui/scroll-area";

import { authContext } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import InputWithLabel from "../ui/InputWithLabel";
import FileInput from "../ui/FileInput";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import ButtonLoading from "../ui/ButtonLoading";

const origin = import.meta.env.VITE_ORIGIN;

export default function EditProfile({user}){
    const { fetchHandler, isLoading, error } = useFetch();
    const controller = useRef();
    const { user: auth, dispatch } = useContext(authContext);
    const [ changesMade, setChangesMade ] = useState(false);
    const [ success, setSuccess ] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ name, setName ] = useState("");    
    const [ image, setImage ] = useState(null);
    const [ imageUrl, setImageUrl ] = useState(user.imageUrl);

    useEffect(() => {
        if (email || name || image) return setChangesMade(true);
        setChangesMade(false);
    }, [email, name, image])

    const saveChanges = async () => {
        if (!changesMade) return;

        // reset success state
        setSuccess(false);

        const form = new FormData();
        const formProps = new Map(Object.entries({email, name, image}));
        
        // flag for form empty
        let isEmpty = true;

        // add fields to form
        for (const [ field, value ] of formProps){
            if (value) {
                form.append(field, value);
                isEmpty = false;
            }
        }

        // if form is empty do not update
        if (isEmpty) return setChangesMade(false);

        // update user
        const result = await fetchHandler(`${origin}/users/${user._id}`, controller.current.signal,
        {
            method: "PUT",
            body: form,
        });
        console.log(result);

        // update user context details and set success
        if (result) {
            setSuccess(true);
            dispatch({type: "UPDATE", payload: result});
            setChangesMade(false);
        }
    };

    // update img preview
    useEffect(() => {
        let url;
        if (image){
            url = URL.createObjectURL(image);
        }
        setImageUrl(url || auth?.imageUrl);

        return () => URL.revokeObjectURL(url);
    }, [auth, image])

    useEffect(() => {
        controller.current = new AbortController();

        return () => controller.current.abort();
    }, []);

    return <Dialog>
        <DialogTrigger asChild>
            <Button>Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className=  "p-4 h-[550px] bg-gradient-to-bl from-black from-60% to-grey-800 rounded-2xl shadow-lg border-none max-w-sm">
            <DialogHeader>
                <DialogTitle className= "text-white text-2xl tracking-tight">Edit your profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click <i>Save</i> when done. 
                </DialogDescription>
                { success && <p>Changes saved. Image updates may take a while to show up.</p> }
            </DialogHeader>
            <ScrollArea className= "w-full rounded-lg ">
                <div className= "flex flex-col  justify-center items-center gap-y-4">
                    { imageUrl && <img className= "rounded-full w-1/2" src= {imageUrl} alt= {`${user.name}'s avatar`} crossOrigin= "anonymous"/> }
                    <FileInput setImage= {setImage} />
                    <InputWithLabel 
                        type="text"
                        fieldName= "Name:"
                        fieldValue= {name} 
                        setField= {setName}
                        
                    />
                    <InputWithLabel 
                        type="email"
                        fieldName= "Email:"
                        fieldValue= {email} 
                        setField= {setEmail}
                    />
                    { error?.errors?.email && <p>{error.errors?.email}</p> }
                </div>
            </ScrollArea>
            <DialogFooter>
                { isLoading? <ButtonLoading /> : changesMade && 
                <Button onClick= {saveChanges}>Save</Button> }
                { error?.errors && !error?.errors?.email && <p>{error.errors}</p> }
            </DialogFooter>
        </DialogContent>
    </Dialog>
}