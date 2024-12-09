import OrderCard from "./OrderCard";

import { ScrollArea } from "../ui/scroll-area";
import { Table, TableBody, TableRow, TableHead, TableCell, TableHeader } from "../ui/table";

export default function OrdersTable({orders, setOrders}){
    return (<ScrollArea className= "h-[350px] rounded-lg border-none">
    <Table className= "bg-transparent border-none">
        <TableHeader>
            <TableRow className= "bg-grey-800 text-white border-none ">
                <TableHead >Order ID</TableHead>
                <TableHead>Placed at</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody className= "text-grey-10 bg-grey-950">
            { orders.map(({_id, userId, status, placedAt}, i) => 
            <TableRow 
                className= "border-b-3 border-black"
                key= {i}
            >
                <TableCell>{_id}</TableCell>
                <TableCell>
                    {new Date(placedAt).toLocaleTimeString("en-US", {
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric', 
                    hour: 'numeric', 
                    minute: 'numeric', 
                    hour12: true, 
                    })}
                </TableCell>
                <TableCell>{userId}</TableCell>
                <TableCell>{status}</TableCell>
                <OrderCard order= {{_id, userId, status}} setOrders= {setOrders}/>
            </TableRow>) }
        </TableBody>
    </Table>
    </ScrollArea>
    );
}