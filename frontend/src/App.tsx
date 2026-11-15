import { AppRouter } from "./app/router/AppRouter";
import useAuth from "./features/auth/hook/useAuth";
import useActiveCategories from "./hook/useActiveCategories";
import useSocketConnection from "./hook/useSocketConnection";

function App() {
  useAuth();
  useActiveCategories();
  useSocketConnection();
  
  return <AppRouter />;
}

export default App;