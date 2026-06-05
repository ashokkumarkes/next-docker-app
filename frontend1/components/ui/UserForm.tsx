"use client";
import { useState } from "react";
import Button from "./Button";

type Props = {
  onSubmit?: (data: { name: string; email: string; role: string; status: string }) => void;
  onCancel?: () => void;
};

export default function UserForm({ onSubmit, onCancel }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Admin");
  const [status, setStatus] = useState("Active");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = "Name is required";
    if (!email.trim()) nextErrors.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) nextErrors.email = "Enter a valid email";
    return nextErrors;
  }

  function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      onSubmit?.({ name: name.trim(), email: email.trim(), role, status });
      setName("");
      setEmail("");
      setRole("Admin");
      setStatus("Active");
      setErrors({});
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm bg-white"
            placeholder="Jane Doe"
          />
          {errors.name && <div className="text-xs text-red-600 mt-1">{errors.name}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm bg-white"
            placeholder="jane.doe@example.com"
          />
          {errors.email && <div className="text-xs text-red-600 mt-1">{errors.email}</div>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm bg-white"
          >
            <option>Admin</option>
            <option>Recruiter</option>
            <option>Manager</option>
            <option>Contributor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm bg-white"
          >
            <option>Active</option>
            <option>Inactive</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Add user</Button>
      </div>
    </form>
  );
}
