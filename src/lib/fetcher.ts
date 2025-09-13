export async function fetcher(url: string, options?: RequestInit) {
  const res = await fetch(url, options);

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Request failed");
  }

  return res.json();
}
