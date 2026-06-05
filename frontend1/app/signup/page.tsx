"use client";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useState } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Create account</h2>
        <div className="space-y-3">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full px-3 py-2 border rounded-md" />
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full px-3 py-2 border rounded-md" />
          <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" type="password" className="w-full px-3 py-2 border rounded-md" />
          <Button className="w-full">Sign up</Button>
        </div>
      </Card>
    </div>
  );
}
