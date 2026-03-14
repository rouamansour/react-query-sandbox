# React Query — Learning Playground 🚀

A step-by-step practice project for exploring **TanStack React Query (v5)** with a Vite + React setup.

---

## 🛠️ Tech Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [TanStack React Query v5](https://tanstack.com/query/latest)
- [React Query Devtools](https://tanstack.com/query/latest/docs/framework/react/devtools)

---

## 📦 Installation

```bash
# 1. Clone the repo
git clone https://github.com/rouamansour/react-query-sandbox.git
cd react-query-sandbox

# 2. Scaffold the React app
npm create vite@latest . -- --template react
npm install

# 3. Install React Query
npm install @tanstack/react-query
npm install @tanstack/react-query-devtools
```

---

## ⚙️ Setup

Wrap your app with `QueryClientProvider` in `main.jsx`:

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
```

---

## 🧪 What's Covered

### 1. `useQuery` — Basic data fetching

Fetch a list of users from a public API and handle loading/error states.

```jsx
const { data, isLoading, isError } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
})
```

### 2. Dynamic `queryKey` — Fetch by ID

Use a state variable as part of the query key so React Query automatically re-fetches when the ID changes.

```jsx
const { data } = useQuery({
  queryKey: ['post', postId],
  queryFn: () => fetchPost(postId),
})
```

### 3. `useMutation` — POST requests

Create new resources and track the pending / success / error lifecycle.

```jsx
const mutation = useMutation({ mutationFn: createPost })
mutation.mutate({ title: 'Hello', body: 'World', userId: 1 })
```

### 4. Advanced Options

Configure caching and refetch behavior:

```jsx
useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 1000 * 60 * 5,   // data stays fresh for 5 min
  retry: 2,                    // retry twice on error
  refetchOnWindowFocus: false  // no refetch on tab focus
})
```

---

## 💡 Key Concepts

| Concept | Description |
|---|---|
| `QueryClient` | Global cache manager |
| `queryKey` | Unique identifier for each query |
| `useQuery` | Read / fetch data |
| `useMutation` | Create / update / delete |
| `staleTime` | How long cached data stays fresh |
| DevTools | Visual cache inspector (bottom-right panel) |

---

## 🌐 API Used

All examples use the free mock REST API:  
👉 [https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com)

---

## 🚀 Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and check the **React Query Devtools** panel to explore the cache in real time.

---

## 📚 Resources

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Vite Docs](https://vitejs.dev/guide/)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)