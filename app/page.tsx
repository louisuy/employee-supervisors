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

import employees from "@/data/employeesUiObject.json";
import { ClerkProvider, SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <ClerkProvider>
      <SignedIn>
        <main className="flex min-h-screen flex-col items-center p-24">
          <h1 className="text-5xl font-bold">Employee Supervisors</h1>
          <div className="p-5 flex gap-2">
            <AddEmployee />
            <ViewChain />
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
                      <DeleteDialog employee={employee} />
                      <EditDialog employee={employee} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </main>
        <main className="flex min-h-screen flex-col items-center p-24">
          <h1 className="text-5xl font-bold">Employee Supervisors</h1>
          <div className="p-5 flex gap-2">
            <AddEmployee />
            <ViewChain />
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
                      <DeleteDialog employee={employee} />
                      <EditDialog employee={employee} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </main>
      </SignedIn>
      <SignedOut>
        <div className="flex min-h-screen justify-center items-center p-24">
          <div className="">
            <p className="text-3xl w-1/2">
              Welcome to the <br />
              <span className="font-bold"> Employees Supervisor Management App</span>
            </p>
            <p className="pt-10 w-1/2">
              This application is a technical challenge for the Junior Fullstack Developer role at FlipAE.<br/><br/>This was created by <Link className="text-stone-400 hover:text-cyan-700 transition-all" href={'https://github.com/louisuy'} target="_blank">Louis Uy</Link>
            </p>
          </div>
          <div>
            <SignIn />
          </div>
        </div>
      </SignedOut>
    </ClerkProvider>
  );
}
