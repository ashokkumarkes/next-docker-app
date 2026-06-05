"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import UserForm from "@/components/ui/UserForm";
import { createUser, getUsers, User } from "@/services/user/api";

export default function UsersPage() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        setLoading(true);
        setError(null);
        const userData = await getUsers();
        if (active) {
          setUsers(userData);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Unable to load users');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadUsers();
    return () => {
      active = false;
    };
  }, []);

  async function handleAddUser(data: Omit<User, "id" | "createdAt">) {
    try {
      setError(null);
      const newUser = await createUser(data);
      setUsers((prev) => [newUser, ...prev]);
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save user');
      throw err;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Users</h1>
          <p className="text-sm text-gray-500">Manage users and add new profiles from the same page.</p>
        </div>
        <Button onClick={() => setOpen(true)}>Add user</Button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add new user">
        <UserForm onSubmit={handleAddUser} onCancel={() => setOpen(false)} />
      </Modal>

      {error ? (
        <Card className="border-red-200 bg-red-50 text-red-700">
          <div className="rounded-lg p-4">{error}</div>
        </Card>
      ) : null}

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="px-4 py-3 font-medium text-gray-600">Email</th>
                <th className="px-4 py-3 font-medium text-gray-600">Role</th>
                <th className="px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 font-medium text-gray-600">Joined</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    No users found. Add your first user.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-4 py-4 text-gray-500">{user.email}</td>
                    <td className="px-4 py-4 text-gray-500">{user.role}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : user.status === "Inactive"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-500">{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}