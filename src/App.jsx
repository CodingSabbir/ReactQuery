
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

import axios from 'axios'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}


function Example() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.data),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
     {
      data.map((data,i)=>(
        <li key={i}>{data.title}</li>
      ))
     }
      <div>{isFetching ? 'Updating...' : ''}</div>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(<App />)



