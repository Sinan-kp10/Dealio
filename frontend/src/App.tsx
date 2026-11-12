import { AppRouter } from "./app/router/AppRouter";
import useAuth from "./features/auth/hook/useAuth";
import useActiveCategories from "./hook/useActiveCategories";

function App() {
  useAuth();
  useActiveCategories();
  return <AppRouter />;
}

export default App;