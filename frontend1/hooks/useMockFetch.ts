export async function useMockFetch<T>(data: T, delay = 200) {
  return new Promise<T>((res) => setTimeout(() => res(data), delay));
}
