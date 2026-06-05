"use client";
import { useState } from "react";
import Button from "./Button";

type Props = {
  onSubmit?: (data: { name: string; email: string; experience: string; status: string }) => void;
  onCancel?: () => void;
};

export default function CandidateForm({ onSubmit, onCancel }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [status, setStatus] = useState("Applied");
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
      onSubmit?.({ name: name.trim(), email: email.trim(), experience: experience.trim() || "0 yrs", status });
      setName("");
      setEmail("");
      setExperience("");
      setStatus("Applied");
      setErrors({});
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Candidate name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm bg-white"
            placeholder="Alex Johnson"
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
            placeholder="candidate@example.com"
          />
          {errors.email && <div className="text-xs text-red-600 mt-1">{errors.email}</div>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Experience</label>
          <input
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm bg-white"
            placeholder="3 yrs"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm bg-white"
          >
            <option>Applied</option>
            <option>Screening</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Hired</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Add candidate</Button>
      </div>
    </form>
  );
}
