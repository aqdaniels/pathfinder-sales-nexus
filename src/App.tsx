
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClientIntelligence from "./pages/ClientIntelligence";
import PortfolioAdvisor from "./pages/PortfolioAdvisor";
import MarketPosition from "./pages/MarketPosition";
import SwotAnalysis from "./pages/SwotAnalysis";
import GrowthAnalyzer from "./pages/GrowthAnalyzer";
import CompetitiveBattlecard from "./pages/CompetitiveBattlecard";
import ExecutiveValueStorytelling from "./pages/ExecutiveValueStorytelling";
import TechnologyMaturityAssessment from "./pages/TechnologyMaturityAssessment";
import MeetingIntelligence from "./pages/MeetingIntelligence";
import ValueChain from "./pages/ValueChain";
import StrategyDevelopment from "./pages/StrategyDevelopment";
import CompetitiveIntelligence from "./pages/CompetitiveIntelligence";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/client-intelligence" element={<ClientIntelligence />} />
          <Route path="/portfolio-advisor" element={<PortfolioAdvisor />} />
          <Route path="/market-position" element={<MarketPosition />} />
          <Route path="/swot-analysis" element={<SwotAnalysis />} />
          <Route path="/growth-analyzer" element={<GrowthAnalyzer />} />
          <Route path="/competitive-battlecard" element={<CompetitiveBattlecard />} />
          <Route path="/executive-value-storytelling" element={<ExecutiveValueStorytelling />} />
          <Route path="/technology-maturity-assessment" element={<TechnologyMaturityAssessment />} />
          <Route path="/meeting-intelligence" element={<MeetingIntelligence />} />
          <Route path="/value-chain" element={<ValueChain />} />
          <Route path="/strategy-development" element={<StrategyDevelopment />} />
          <Route path="/competitive-intel" element={<CompetitiveIntelligence />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
