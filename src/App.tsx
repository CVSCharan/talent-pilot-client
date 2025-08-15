import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Layout from "./components/layout/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Results from "./pages/Results";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import GAuthError from "./pages/GAuthError";
import GAuthSuccess from "./pages/GAuthSuccess";
import Testimonials from "./pages/Testimonials";
import NotFound from "./pages/NotFound";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/results" element={<Results />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/auth/success" element={<GAuthSuccess />} />
            <Route path="/auth/error" element={<GAuthError />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
