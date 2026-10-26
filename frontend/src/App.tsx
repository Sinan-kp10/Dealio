import { AppRouter } from "./app/router/AppRouter";
import useAuth from "./features/auth/hook/useAuth";

function App() {
  useAuth()
  return <AppRouter />
}

export default App;