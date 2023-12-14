import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter, DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog"
const invoices = [
    {
        invoice: "INV007",
        price: "300",

    },
]

const totalAmount = invoices.reduce(
    (accumulator, currentValue) => accumulator + parseFloat(currentValue.price),
    0,
);

export default function ConfirmPayment() {
    return (
        <>
            <Table className="rounded-lg bg-white">
                <TableHeader className="bg-[#2F80ED] rounded-lg">
                    <TableRow className="rounded-lg">
                        <TableHead className="w-[100px] text-white">Invoice</TableHead>
                        <TableHead className="text-right text-white">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.invoice}>
                            <TableCell className="font-medium">{invoice.invoice}</TableCell>
                            <TableCell className="text-right">{`₦ ${invoice.price}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell className="text-right">{`₦ ${totalAmount}`}</TableCell>
                    </TableRow>

                </TableFooter>

            </Table>



            <Dialog>

                <div className="flex space-x-4 items-center mt-8">
                    <DialogTrigger>
                        <Button size='lg'>Next</Button>
                    </DialogTrigger>
                    <Button variant='ghost' className='text-[#4E598C] text-md font-medium' >Cancel Payment</Button>
                </div>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Purchase Completed</DialogTitle>
                        <DialogDescription>
                            Please check your email for details concerning this transaction
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="link">
                                Return Home
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
