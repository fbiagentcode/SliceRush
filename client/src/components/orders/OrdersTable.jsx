import OrderCard from "./OrderCard";
import { Table, TableBody, TableRow, TableHead, TableCell, TableHeader } from "../ui/table";

export default function OrdersTable({orders, setOrders}){
    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            { orders.map(({_id, userId, status}, i) => <TableRow key= {i}>
                <TableCell>{_id}</TableCell>
                <TableCell>{userId}</TableCell>
                <TableCell>{status}</TableCell>
                <OrderCard order= {{_id, userId, status}} setOrders= {setOrders}/>
            </TableRow>) }
        </TableBody>
    </Table>
}