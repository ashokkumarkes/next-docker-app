export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5001';

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const errorMessage = body?.message ?? `Request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }
  return response.json();
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/users`, {
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 0 },
  });
  const data = await parseResponse<{ data: User[] }>(response);
  return data.data;
}

export async function createUser(payload: { name: string; email: string; role: string; status: string }): Promise<User> {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await parseResponse<{ data: User }>(response);
  return data.data;
}
