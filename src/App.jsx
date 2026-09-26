import AppRoutes from './routes/AppRoutes'
import { ProfileProvider } from './context/ProfileContext'

const App = () => {
  return (
    <ProfileProvider>
      <AppRoutes />
    </ProfileProvider>
  )
}

export default App