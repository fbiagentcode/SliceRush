import OrderCard from "./OrderCard";
import { Table, TableBody, TableRow, TableHead, TableCell, TableHeader } from "../ui/table";

export default function OrdersTable({orders, setOrders}){
    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Placed at</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            { orders.map(({_id, userId, status, placedAt}, i) => <TableRow key= {i}>
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
}