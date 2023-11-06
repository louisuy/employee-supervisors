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

type EditDialogProps = {
  employee: { name: string; supervisor: string };
};

export function EditDialog({ employee }: EditDialogProps) {
  const router = useRouter();

  const oldName = employee.name;
  const oldSupervisor = employee.supervisor;
  let [name, setName] = useState("");
  let [supervisor, setSupervisor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const addEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name == "") {
      name = oldName
    }
    if (supervisor == "") {
      supervisor = oldSupervisor
    }

    setIsLoading(true);

    const editedData = [
      {
        [oldName]: oldSupervisor,
      },
      {
        [name]: supervisor,
      },
    ];

    const res = await fetch("/api/employees", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedData),
    });

    if (res.status === 201) {
      router.refresh();
      router.push("/");
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>Edit an employee in your team.</DialogDescription>
          </DialogHeader>
          <form onSubmit={addEmployee}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  defaultValue={oldName}
                  value={name}
                  placeholder={oldName}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="supervisor" className="text-right">
                  Supervisor
                </Label>
                <Input
                  id="supervisor"
                  className="col-span-3"
                  defaultValue={oldSupervisor}
                  value={supervisor}
                  placeholder={oldSupervisor}
                  onChange={(e) => setSupervisor(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <span>Saving...</span> : <span>Save changes</span>}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}