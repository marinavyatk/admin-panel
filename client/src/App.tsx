import { AppRoutes } from "./routing/routes.tsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer aria-label={undefined} position="bottom-right" />
    </>
  );
}

export default App;
