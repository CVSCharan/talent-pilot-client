import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

import Layout from "./components/layout/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Results from "./pages/Results";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import GAuthError from "./pages/GAuthError";
import GAuthSuccess from "./pages/GAuthSuccess";
import TestimonialsPage from "./pages/Testimonials";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RequireAuth from "./components/layout/RequireAuth";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route element={<RequireAuth />}>
              <Route path="/results" element={<Results />} />
              <Route path="/history" element={<History />} />
            </Route>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/auth/success" element={<GAuthSuccess />} />
            <Route path="/auth/error" element={<GAuthError />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/history" element={<History />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
