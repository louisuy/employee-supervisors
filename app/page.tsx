import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddEmployee from "@/components/AddEmployee";

import employees from "@/data/employeesUiObject.json"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-5xl font-bold">Employee Supervisors</h1>
      <div className="p-5">
        <AddEmployee/>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Delete</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Delete Employee</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this employee?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={employee.name}
                          className="col-span-3"
                          readOnly
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="supervisor" className="text-right">
                          Supervisor
                        </Label>
                        <Input
                          id="supervisor"
                          value={employee.supervisor}
                          className="col-span-3"
                          readOnly
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this employee?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          defaultValue={employee.name}
                          className="col-span-3"
                          
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="supervisor" className="text-right">
                          Supervisor
                        </Label>
                        <Input
                          id="supervisor"
                          defaultValue={employee.supervisor}
                          className="col-span-3"
                          
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
