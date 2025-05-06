
import { Layout } from "@/components/layout/Layout";
import { SolutionMatcher } from "@/components/portfolio-advisor/SolutionMatcher";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const PortfolioAdvisor = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <Alert className="bg-blue-50 border-blue-200 text-blue-800">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>AI-Powered Solution Matching</AlertTitle>
          <AlertDescription>
            Solutions are now intelligently ranked based on insights from your client meetings.
            The matching algorithm analyzes detected challenges and sentiment to find the best fit.
          </AlertDescription>
        </Alert>
        
        <SolutionMatcher />
      </div>
    </Layout>
  );
};

export default PortfolioAdvisor;
