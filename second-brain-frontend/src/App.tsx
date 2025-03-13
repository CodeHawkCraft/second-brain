import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { MyContextProvider, useMyContext } from "./Context/Context";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";

// Protected route component
const ProtectedRoute = () => {
  const { token } = useMyContext();

  if (!token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

const GuestRoute = () => {
  const { token } = useMyContext();

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

function App() {
  return (
    <MyContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<GuestRoute />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </MyContextProvider>
  );
}


export default App;