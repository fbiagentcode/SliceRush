import { useContext, useEffect, useRef } from "react";

import { authContext } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import InputWithLabel from "../ui/InputWithLabel";
import FileInput from "../ui/FileInput";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import ButtonLoading from "../ui/ButtonLoading";

const origin = import.meta.vite.VITE_ORIGIN;

export default function EditProfile({user}){
    const { fetchHandler, isLoading, error } = useFetch();
    const controller = useRef();
    const { dispatch } = useContext(authContext);
    const [ changesExist, setChangesExist ] = useState(false);
    const [ success, setSuccess ] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ name, setName ] = useState("");    
    const [ image, setImage ] = useState(null);
    const [ imageUrl, setImageUrl ] = useState(user.imageUrl);

    const saveChanges = async () => {
        const form = new FormData();
        const formProps = new Map({email, name, image});
        // add fields to form
        for (const [ field, value ] of formProps) 
            if (value) form.append(field, value);
        // if form is empty do not update
        if (form.entries().next().done) return setChangesExist(false);

        // update user
        const result = await fetchHandler(`${origin}/users/${user._id}`, controller.current.signal,
        {
            method: "PUT",
            body: form
        });

        if (result) {
            setSuccess(true);
            dispatch({type: "UPDATE", payload: result});
        }
    };

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
            </div>
            <DialogFooter>
                { isLoading? <ButtonLoading /> : 
                <Button onClick= {saveChanges}>Save</Button> }
            </DialogFooter>
        </DialogContent>
    </Dialog>
}