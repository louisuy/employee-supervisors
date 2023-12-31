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
import { useRouter } from "next/navigation"; // Imported 'router' instead of 'next/navigation'
import { useState } from "react";

type DeleteDialogProps = {
  employee: { name: string; supervisor: string };
};

export function DeleteDialog({ employee }: DeleteDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const deleteEmployee = async () => {
    const res = await fetch("/api/employees", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [employee.name] : employee.supervisor}),
    });

    if (res.status === 201) {
      router.refresh();
      router.push("/");
      setOpen(false)
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              disabled
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
              disabled
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="destructive" onClick={deleteEmployee}>Delete</Button> {/* Removed setting name and supervisor */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}