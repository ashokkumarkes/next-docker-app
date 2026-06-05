"use client";
import { useState, useRef } from "react";
import Button from "../ui/Button";

type Stage = { id: number; name: string; days: number };

type Props = {
  onSubmit?: (data: {
    title: string;
    department: string;
    location: string;
    type: string;
    minSalary?: number | null;
    maxSalary?: number | null;
    description: string;
    stages: Stage[];
  }) => void;
};

export default function JobForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Full-time");
  const [minSalary, setMinSalary] = useState<number | "">("");
  const [maxSalary, setMaxSalary] = useState<number | "">("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stages, setStages] = useState<Stage[]>([{ id: 1, name: "Screening", days: 2 }]);
  const stageNameRef = useRef<HTMLInputElement | null>(null);
  const stageDaysRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  function validate() {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "Title is required";
    if (!department.trim()) e.department = "Department is required";
    if (minSalary !== "" && maxSalary !== "" && Number(minSalary) > Number(maxSalary)) e.salary = "Min must be <= max";
    return e;
  }

  function handleAddStage() {
    const name = stageNameRef.current?.value?.trim();
    const days = Number(stageDaysRef.current?.value || 0);
    if (!name) return;
    setStages((s) => [...s, { id: Date.now(), name, days: days || 0 }]);
    if (stageNameRef.current) stageNameRef.current.value = "";
    if (stageDaysRef.current) stageDaysRef.current.value = "";
  }

  function handleRemoveStage(id: number) {
    setStages((s) => s.filter((st) => st.id !== id));
  }

  function getDescriptionHtml() {
    return editorRef.current?.innerHTML ?? "";
  }

  function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      const data = {
        title,
        department,
        location,
        type,
        minSalary: minSalary === "" ? null : Number(minSalary),
        maxSalary: maxSalary === "" ? null : Number(maxSalary),
        description: getDescriptionHtml(),
        stages,
      };
      onSubmit?.(data);
      // reset
      setTitle("");
      setDepartment("");
      setLocation("");
      setType("Full-time");
      setMinSalary("");
      setMaxSalary("");
      setStages([{ id: 1, name: "Screening", days: 2 }]);
      if (editorRef.current) editorRef.current.innerHTML = "";
      alert("Job posted (mock)");
    }
  }

  function exec(cmd: string) {
    document.execCommand(cmd);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm bg-white"
            placeholder="Senior React Developer"
          />
          {errors.title && <div className="text-xs text-red-600 mt-1">{errors.title}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm bg-white"
            placeholder="Engineering"
          />
          {errors.department && <div className="text-xs text-red-600 mt-1">{errors.department}</div>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm bg-white"
            placeholder="Remote / San Francisco"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2 text-sm bg-white">
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Min salary</label>
          <input
            type="number"
            value={minSalary as any}
            onChange={(e) => setMinSalary(e.target.value === "" ? "" : Number(e.target.value))}
            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm bg-white"
            placeholder="e.g. 50000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Max salary</label>
          <input
            type="number"
            value={maxSalary as any}
            onChange={(e) => setMaxSalary(e.target.value === "" ? "" : Number(e.target.value))}
            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm bg-white"
            placeholder="e.g. 80000"
          />
        </div>
      </div>
      {errors.salary && <div className="text-xs text-red-600">{errors.salary}</div>}

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <div className="mt-2 border rounded">
          <div className="px-2 py-1 bg-gray-50 flex gap-2">
            <button type="button" onClick={() => exec("bold")} className="text-sm px-2 py-1">B</button>
            <button type="button" onClick={() => exec("italic")} className="text-sm px-2 py-1">I</button>
            <button type="button" onClick={() => exec("insertUnorderedList")} className="text-sm px-2 py-1">• List</button>
          </div>
          <div ref={editorRef} contentEditable className="min-h-[120px] p-3 text-sm" style={{ outline: 'none' }} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Hiring flow (stages)</label>
        <div className="mt-2 space-y-2">
          {stages.map((s) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className="flex-1 text-sm">{s.name} <span className="text-xs text-gray-400">({s.days}d)</span></div>
              <button type="button" onClick={() => handleRemoveStage(s.id)} className="text-red-500 text-xs">Remove</button>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-2">
            <input ref={stageNameRef} placeholder="Stage name e.g. Interview" className="rounded-md border px-3 py-2 text-sm" />
            <input ref={stageDaysRef} placeholder="Days" type="number" className="rounded-md border px-3 py-2 text-sm" />
            <div />
            <div>
              <button type="button" onClick={handleAddStage} className="mt-1 px-3 py-2 rounded-md bg-indigo-600 text-white text-sm">Add stage</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Application Timeline (preview)</label>
        <div className="mt-2 border rounded p-3 bg-gray-50 text-sm">
          {stages.length === 0 && <div className="text-gray-500">No stages</div>}
          <ol className="list-decimal pl-5 space-y-1">
            {stages.map((s) => (
              <li key={s.id}>{s.name} — {s.days} day(s)</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button type="button" variant="ghost" onClick={() => {
          setTitle(""); setDepartment(""); setLocation(""); setType("Full-time"); setMinSalary(""); setMaxSalary(""); setStages([{ id: 1, name: "Screening", days: 2 }]); if (editorRef.current) editorRef.current.innerHTML = ""; setErrors({});
        }}>Cancel</Button>
        <Button type="submit">Post job</Button>
      </div>
    </form>
  );
}
