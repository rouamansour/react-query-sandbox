import { useState } from 'react'
import './App.css';
import { useQuery, useMutation } from '@tanstack/react-query'

// API functions 
const fetchUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!res.ok) throw new Error('Network error')
  return res.json()
}

const fetchPost = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  if (!res.ok) throw new Error('Network error')
  return res.json()
}

const createPost = async (newPost) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(newPost),
    headers: { 'Content-Type': 'application/json' },
  })
  return res.json()
}

// Test 1 : useQuery basic 
function Test1() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  if (isLoading) return <p className="status">⏳ Loading...</p>
  if (isError)   return <p className="status error">❌ Error: {error.message}</p>

  return (
    <ul className="list">
      {data.map(user => (
        <li key={user.id} className="list-item">
          <strong>{user.name}</strong>
          <span>{user.email}</span>
        </li>
      ))}
    </ul>
  )
}

// Test 2 : dynamic queryKey 
function Test2() {
  const [postId, setPostId] = useState(1)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['post', postId],      // re-fetches automatically when postId changes
    queryFn: () => fetchPost(postId),
  })

  return (
    <div>
      <div className="nav-row">
        <button onClick={() => setPostId(id => Math.max(1, id - 1))} disabled={postId === 1}>
           Prev
        </button>
        <span className="badge">Post #{postId}</span>
        <button onClick={() => setPostId(id => id + 1)}>Next</button>
      </div>

      {isLoading || isFetching
        ? <p className="status">Loading post {postId}...</p>
        : (
          <div className="card">
            <h3>{data?.title}</h3>
            <p>{data?.body}</p>
          </div>
        )
      }
    </div>
  )
}

// Test 3 : useMutation 
function Test3() {
  const [title, setTitle] = useState('')
  const [body, setBody]   = useState('')

  const mutation = useMutation({ mutationFn: createPost })

  const handleSubmit = () => {
    if (!title.trim()) return
    mutation.mutate({ title, body, userId: 1 })
  }

  return (
    <div>
      <div className="form">
        <input
          placeholder="Post title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Post body"
          value={body}
          onChange={e => setBody(e.target.value)}
          rows={3}
        />
        <button onClick={handleSubmit} disabled={mutation.isPending}>
          {mutation.isPending ? ' Sending...' : 'Create post'}
        </button>
      </div>

      {mutation.isSuccess && (
        <div className="result success">
          ✅ Post created! Server returned ID: <strong>{mutation.data.id}</strong>
        </div>
      )}
      {mutation.isError && (
        <div className="result error">Error: {mutation.error.message}</div>
      )}
    </div>
  )
}

// Test 4 : advanced options 
function Test4() {
  const [enabled, setEnabled] = useState(true)

  const { data, isLoading, isFetching, dataUpdatedAt } = useQuery({
    queryKey: ['users-advanced'],
    queryFn: fetchUsers,
    staleTime:            1000 * 60 * 5,  // fresh for 5 min → no background refetch
    retry:                2,              // retry twice on error
    refetchOnWindowFocus: false,          // no refetch on tab focus
    enabled,                             // disable/enable the query on demand
  })

  const lastUpdate = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString()
    : '—'

  return (
    <div>
      <div className="options-grid">
        <div className="option-badge">staleTime: 5 min</div>
        <div className="option-badge">retry: 2</div>
        <div className="option-badge">refetchOnWindowFocus: false</div>
        <div className="option-badge">enabled: {enabled ? 'true' : 'false'}</div>
      </div>

      <div className="nav-row" style={{ marginTop: 12 }}>
        <button onClick={() => setEnabled(v => !v)}>
          {enabled ? '⏸ Disable query' : 'Enable query'}
        </button>
        <span className="badge">Last update: {lastUpdate}</span>
        {isFetching && <span className="badge fetching">Fetching...</span>}
      </div>

      {!enabled && <p className="status">Query is disabled — no fetch will happen.</p>}
      {isLoading && enabled && <p className="status">Loading...</p>}

      {data && (
        <ul className="list">
          {data.slice(0, 4).map(user => (
            <li key={user.id} className="list-item">
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const TABS = [
  { id: 1, label: 'Test 1 — useQuery',       component: <Test1 /> },
  { id: 2, label: 'Test 2 — Dynamic key',    component: <Test2 /> },
  { id: 3, label: 'Test 3 — useMutation',    component: <Test3 /> },
  { id: 4, label: 'Test 4 — Advanced',       component: <Test4 /> },
]

export default function App() {
  const [activeTab, setActiveTab] = useState(1)
  const current = TABS.find(t => t.id === activeTab)

  return (
    <>
      <div className="app">
        <h1> React Query — 4 Tests</h1>

        <div className="tabs">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`tab-btn ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="panel">
          <h2>{current.label}</h2>
          {current.component}
        </div>
      </div>
    </>
  )
}
