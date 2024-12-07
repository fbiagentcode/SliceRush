import { useContext, useEffect, useRef, useState, } from "react";

import { authContext } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import { Button } from "../ui/button";
import ButtonLoading from "../ui/ButtonLoading";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "../ui/dialog";
import { Table, TableBody, TableRow, TableHead, TableCell, TableHeader } from "../ui/table";

const origin = import.meta.env.VITE_ORIGIN;

export default function OrderCard({order, setOrders}){
    const { fetchHandler, isLoading, error } = useFetch();
    const controller = useRef();
    const { user } = useContext(authContext);
    const [ status, setStatus ] = useState(order.status);
    const [ changesMade, setChangesMade ] = useState(false);

    // update order details
    const updateOrder = async () => {
        const result = await fetchHandler(`${origin}/orders/${order._id}`, controller.current.signal,
        {
            method: "PUT",
            body: JSON.stringify({status})
        });
        if (result){
            setStatus(result.status);
            // update orders state
            setOrders(orders => orders.map(val => val._id === order._id? result : val));
            setChangesMade(false);
        }
    };

    useEffect(() => {
        controller.current = new AbortController();

        return () => controller.current.abort();
    }, []);

    return (
    <TableCell>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant= "ghost">View Order</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Order Details:</DialogTitle>
                    <VisuallyHidden.Root>
                        <DialogDescription>Order details are listed below.</DialogDescription>
                    </VisuallyHidden.Root>
                    { user.role === "admin" && <OrderStatusSetter
                        setStatus= {setStatus} 
                        saveChanges= {updateOrder}
                        isLoading= {isLoading}
                        error= {error}
                        changesMade= {changesMade}
                    /> }
                </DialogHeader>
                <Table>
                    <TableBody>
                        { Object.entries(order).map(([field, val], i) => <TableRow key= {i}>
                            <TableHead>{field}</TableHead>
                            <TableCell>{val}</TableCell>
                        </TableRow>) }
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
    </TableCell>)
}

const statuses = ["received", "kitchen", "dispatched"];
function OrderStatusSetter({setStatus, saveChanges, changesMade, error, isLoading}){
    return <div>
        { statuses.map((status, i) => (
            <Button key= {i} onClick= { () => setStatus(status) }>{status}</Button>
        )) }
        { error?.errors && <p>{error?.errors}</p> }
        { isLoading? <ButtonLoading/> : <Button onClick= {saveChanges}>Save Changes</Button> }
    </div>
}