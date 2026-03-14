# React Query — Learning Playground

Hands-on demos for **TanStack React Query v5** built with Vite + React.

---

## Stack

React · Vite · TanStack React Query v5 · React Query Devtools

---

## Setup
```bash
git clone https://github.com/rouamansour/react-query-sandbox.git
cd react-query-sandbox
npm install
npm run dev
```

Open http://localhost:5173 — the React Query Devtools panel appears bottom-right.

---

## What's covered

| # | Demo | Concepts |
|---|------|----------|
| 1 | `useQuery` basics | loading · error states · data |
| 2 | Dynamic `queryKey` | auto-refetch on state change |
| 3 | `useMutation` | POST · pending / success / error lifecycle |
| 4 | Advanced options | `staleTime` · `retry` · `enabled` · `refetchOnWindowFocus` |

---

## Key concepts

| Concept | What it does |
|---------|--------------|
| `QueryClient` | Global cache manager |
| `queryKey` | Unique cache identifier per query |
| `staleTime` | How long data is considered fresh |
| `enabled` | Toggle fetching on/off |
| DevTools | Visual inspector for the cache |

---

## API

All demos use [JSONPlaceholder](https://jsonplaceholder.typicode.com) — no auth needed.

---

## Resources

- [TanStack Query docs](https://tanstack.com/query/latest)
- [Vite docs](https://vitejs.dev/guide/)