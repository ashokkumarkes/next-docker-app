"use client";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import { jobs } from "../../shared/mock/data";
import Button from "../../components/ui/Button";
import JobForm from "../../components/ui/JobForm";
import Modal from "../../components/ui/Modal";
import { useState } from "react";

export default function JobsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Jobs</h1>
        <Button onClick={() => setOpen(true)}>New Job</Button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Create job posting">
        <JobForm
          onSubmit={(data) => {
            console.log("job submit", data);
            setOpen(false);
          }}
        />
      </Modal>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500">
                <th className="p-2">Title</th>
                <th className="p-2">Department</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id} className="border-t">
                  <td className="p-2">{j.title}</td>
                  <td className="p-2">{j.department}</td>
                  <td className="p-2">
                    <Badge color={j.status === "Open" ? "green" : "red"}>{j.status}</Badge>
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <Button variant="ghost">Edit</Button>
                      <Button variant="ghost">Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
