import AddEmployee from "@/components/AddEmployee";
import { DeleteDialog } from "@/components/Delete";
import { EditDialog } from "@/components/Edit";
import ViewChain from "@/components/ViewChain";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import employees from "@/data/employeesUiObject.json"


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-5xl font-bold">Employee Supervisors</h1>
      <div className="p-5 flex gap-2">
        <AddEmployee/>
        <ViewChain/>
      </div>

      <Table>
        {/* <TableCaption>
          A list of your employees and their supervisors.
        </TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Employee Name</TableHead>
            <TableHead>Supervisor</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.name}>
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell>{employee.supervisor}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                <DeleteDialog employee = {employee}/>
                <EditDialog employee = {employee}/>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}