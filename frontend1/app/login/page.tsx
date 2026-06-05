"use client";
import { useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Sign in</h2>
        <div className="space-y-3">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 border rounded-md" />
          <input value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" type="password" className="w-full px-3 py-2 border rounded-md" />
          <Button className="w-full">Sign in</Button>
        </div>
      </Card>
    </div>
  );
}
