"use client";

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
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ViewChain() {
  const [employees, setEmployees] = useState([]); // Define employees state

  const view = async () => {
    const res = await fetch("/api/employees", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const employeesData = await res.json();
    setEmployees(employeesData); // Update employees state
  };

  const EmployeeTree = ({ data } : any) => {
    if (Object.keys(data).length === 0) {
      return null;
    }
  
    return (
      <ul>
        {Object.entries(data).map(([name, children]) => (
          <li key={name}>
            {name}
            <EmployeeTree data={children} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <Dialog onOpenChange={view}>
        <DialogTrigger asChild>
          <Button variant="outline">View Chain</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chain of Employees</DialogTitle>
            <DialogDescription>
              This is the employee hierarchy.
            </DialogDescription>
          </DialogHeader>
          <pre>{JSON.stringify(employees, null, 2)}</pre>
          {/* <EmployeeTree data={employees} /> */}
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
