"use client";
import { useState } from "react";
import Card from "../../components/ui/Card";
import Avatar from "../../components/Avatar";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import CandidateForm from "../../components/ui/CandidateForm";
import { candidates as mockCandidates } from "../../shared/mock/data";

type Candidate = {
  id: number;
  name: string;
  email: string;
  experience: string;
  status: string;
};

export default function CandidatesPage() {
  const [open, setOpen] = useState(false);
  const [candidateList, setCandidateList] = useState<Candidate[]>(mockCandidates);

  function handleAddCandidate(data: Omit<Candidate, "id">) {
    setCandidateList((prev) => [
      { id: Date.now(), ...data },
      ...prev,
    ]);
    setOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Candidates</h1>
        <Button onClick={() => setOpen(true)}>Add candidate</Button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add new candidate">
        <CandidateForm onSubmit={handleAddCandidate} onCancel={() => setOpen(false)} />
      </Modal>

      <Card>
        <div className="space-y-3">
          {candidateList.map((c) => (
            <div key={c.id} className="flex items-center justify-between gap-4 border-b last:border-0 pb-3 pt-3">
              <div className="flex items-center gap-4">
                <Avatar name={c.name} />
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.email}</div>
                </div>
              </div>
              <div className="hidden sm:block text-sm">{c.experience}</div>
              <div>
                <Badge
                  color={
                    c.status === "Interview"
                      ? "indigo"
                      : c.status === "Applied"
                      ? "yellow"
                      : c.status === "Screening"
                      ? "green"
                      : c.status === "Offer"
                      ? "indigo"
                      : "gray"
                  }
                >
                  {c.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
