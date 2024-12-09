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

    // update order status
    const updateOrder = async () => {
        // do not send request if status is unchanged
        if (status === order.status) return;
        // update status
        const result = await fetchHandler(`${origin}/orders/${order._id}`, controller.current.signal,
        {
            method: "PUT",
            body: JSON.stringify({status}),
            headers: { "Content-Type": "application/json" }
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
        <Dialog >
            <DialogTrigger asChild>
                <Button variant= "ghost">View Order</Button>
            </DialogTrigger>
            <DialogContent className= "bg-gradient-to-r from-grey-800 from-10% to-black rounded-2xl shadow-lg max-w-sm p-6 text-white">
                <DialogHeader>
                    <DialogTitle className= "font-helvetica text-xl mb-4">Order Details:</DialogTitle>
                    <VisuallyHidden.Root>
                        <DialogDescription>Order details are listed below.</DialogDescription>
                    </VisuallyHidden.Root>
                    { user.role === "admin" && <OrderStatusSetter
                        status= { {status, setStatus} }
                        changes= { {changesMade, setChangesMade, saveChanges: updateOrder} }
                        isLoading= {isLoading}
                        error= {error}
                    /> }
                </DialogHeader>
                <Table>
                    <TableBody className= "text-white">
                        { Object.entries(order).map(([field, val], i) => <TableRow key= {i}>
                            <TableHead className= "text-grey-10">{field}</TableHead>
                            <TableCell>{val}</TableCell>
                        </TableRow>) }
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
    </TableCell>)
}

const statuses = ["received", "kitchen", "dispatched"];
function OrderStatusSetter({status: {setStatus, status}, changes: {saveChanges, changesMade, setChangesMade}, error, isLoading}){
    const updateStatus = (option) => {
        if (status === option) {
            setChangesMade(false);
            setStatus(null);
        }
        setStatus(option);
        setChangesMade(true);
    };
    
    return <div className= "flex flex-col items-start gap-y-4 ">
        { changesMade && (isLoading? <ButtonLoading/> : <Button onClick= {saveChanges}>Save Changes</Button>) }
        { error?.errors && <p>{error?.errors}</p> }
        <div className= "flex flex-row gap-4">
            { statuses.map((option, i) => (
                <Button 
                    className= { option === status? "bg-grey-500" : "bg-black" }
                    key= {i} 
                    onClick= { () => updateStatus(option) }
                >
                    {option}
                </Button>
            )) }
        </div>
    </div>
}