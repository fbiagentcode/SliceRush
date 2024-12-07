import { useContext, useEffect, useRef, useState } from "react";

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
    const { dispatch } = useContext(authContext);
    const [ changesMade, setChangesMade ] = useState(false);
    const [ success, setSuccess ] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ name, setName ] = useState("");    
    const [ image, setImage ] = useState(null);
    const [ imageUrl, setImageUrl ] = useState(user.imageUrl);

    const saveChanges = async () => {
        const form = new FormData();
        const formProps = new Map(Object.entries({email, name, image}));
        // add fields to form
        for (const [ field, value ] of formProps) 
            if (value) form.append(field, value);
        // if form is empty do not update
        if (form.entries().next().done) return setChangesMade(false);

        // update user
        const result = await fetchHandler(`${origin}/users/${user._id}`, controller.current.signal,
        {
            method: "PUT",
            body: form
        });

        // update user context details and set success
        if (result) {
            setSuccess(true);
            dispatch({type: "UPDATE", payload: result});
            setChangesMade(false);
        }
    };

    useEffect(() => {
        let url;
        if (image){
            url = URL.createObjectURL(image);
        }
        setImageUrl(url || user.imageUrl);

        return () => URL.revokeObjectURL(url);
    }, [authContext, image])

    useEffect(() => {
        controller.current = new AbortController();

        return () => controller.current.abort();
    }, []);

    return <Dialog>
        <DialogTrigger asChild>
            <Button>Edit Profile</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit your profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click <i>Save</i> when done. 
                </DialogDescription>
                { success && <p>Changes saved.</p> }
            </DialogHeader>
            <div>
                { imageUrl && <img src= {imageUrl} alt= {`${user.name}'s avatar`} /> }
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
            <DialogFooter>
                { isLoading? <ButtonLoading /> : 
                <Button onClick= {saveChanges}>Save</Button> }
                { error?.errors && !error?.errors?.email && <p>{error.errors}</p> }
            </DialogFooter>
        </DialogContent>
    </Dialog>
}