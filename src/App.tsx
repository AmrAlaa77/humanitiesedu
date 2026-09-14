import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Aurion from "./pages/Aurion";
import FounderPage from "./pages/FounderPage";
import JourneyPage from "./pages/JourneyPage";
import QoLPage from "./pages/QoLPage";
import WellbeingIndexPage from "./pages/WellbeingIndexPage";
import NextGenPage from "./pages/NextGenPage";
import CPPIAssessment from "./pages/CPPIAssessment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/aurion" element={<Aurion />} />
              <Route path="/founder" element={<FounderPage />} />
              <Route path="/journey" element={<JourneyPage />} />
              <Route path="/qol-2030" element={<QoLPage />} />
              <Route path="/wellbeing-index" element={<WellbeingIndexPage />} />
              <Route path="/nextgen-2030" element={<NextGenPage />} />
              <Route path="/survey" element={<CPPIAssessment />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
