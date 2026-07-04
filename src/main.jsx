import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // new
import './index.css'
import App from './App.jsx'
import { store } from './redux/store.js'

const queryClient = new QueryClient() // new

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>   {/* new */}
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
)