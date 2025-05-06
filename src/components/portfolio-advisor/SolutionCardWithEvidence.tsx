
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "../ui/badge";
import { CheckCircle2, InfoIcon, Layers, LinkIcon } from "lucide-react";
import { SolutionWithEvidence } from '@/utils/ChallengeMatchingEngine';

type SolutionCardWithEvidenceProps = {
  solution: SolutionWithEvidence;
  isTopRecommendation?: boolean;
};

export function SolutionCardWithEvidence({ 
  solution, 
  isTopRecommendation = false 
}: SolutionCardWithEvidenceProps) {
  if (isTopRecommendation) {
    return (
      <Card className="border-dxc-purple/30">
        <CardHeader className="bg-dxc-purple-light/10 border-b border-dxc-purple/20">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center text-lg text-dxc-purple-dark">
                <Layers className="mr-2 h-5 w-5 text-dxc-purple" /> Top Recommendation
              </CardTitle>
              <CardDescription>
                Highest confidence match based on client intelligence
              </CardDescription>
            </div>
            <Badge className="bg-dxc-purple/80">
              {solution.overallScore}% Match
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{solution.name}</h3>
              <p className="text-muted-foreground">{solution.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <h4 className="font-medium flex items-center mb-3">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-dxc-purple" /> Key Features
                </h4>
                <ul className="space-y-2">
                  {solution.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="h-5 w-5 rounded-full bg-dxc-purple-light/30 text-dxc-purple-dark flex items-center justify-center text-xs mr-2 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium flex items-center mb-3">
                  <Layers className="mr-2 h-4 w-4 text-dxc-purple" /> Client Benefits
                </h4>
                <ul className="space-y-2">
                  {solution.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="h-5 w-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs mr-2 mt-0.5">
                        ✓
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {solution.matchEvidence.length > 0 && (
              <>
                <Separator className="my-4" />
                <div>
                  <h4 className="font-medium mb-3">Evidence from Client Conversations</h4>
                  <div className="space-y-3">
                    {solution.matchEvidence.map((evidence, idx) => (
                      <div key={idx} className="bg-muted/30 p-3 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-sm">{evidence.challengeName}</span>
                          <Badge variant="outline">
                            {evidence.confidenceScore}% match
                          </Badge>
                        </div>
                        {evidence.matchedBenefits.length > 0 && (
                          <div className="mt-2">
                            <span className="text-xs text-muted-foreground">Solution benefits that address this challenge:</span>
                            <ul className="mt-1 space-y-1">
                              {evidence.matchedBenefits.map((benefit, i) => (
                                <li key={i} className="text-sm flex items-center">
                                  <span className="h-4 w-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs mr-2">
                                    ✓
                                  </span>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary">{solution.practice}</Badge>
              {solution.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline">
                <InfoIcon className="mr-2 h-4 w-4" /> View Details
              </Button>
              <Button>
                <LinkIcon className="mr-2 h-4 w-4" /> Map to Client
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Alternative (non-top) solution card
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{solution.name}</CardTitle>
          <Badge variant="outline">{solution.overallScore}%</Badge>
        </div>
        <CardDescription>{solution.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <span className="text-sm font-medium">Match Confidence</span>
            <Progress value={solution.overallScore} className="h-2 mt-1" />
          </div>
          
          {solution.matchEvidence.length > 0 && (
            <div>
              <span className="text-sm font-medium">Top matched challenge:</span>
              <div className="text-sm text-muted-foreground mt-1 bg-muted/30 p-2 rounded">
                {solution.matchEvidence[0].challengeName}
                <span className="block text-xs mt-0.5">
                  {solution.matchEvidence[0].confidenceScore}% match confidence
                </span>
              </div>
            </div>
          )}
          
          <Separator />
          
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Key Features</span>
            <ul className="text-sm text-muted-foreground space-y-1">
              {solution.keyFeatures.slice(0, 2).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-4 w-4 rounded-full bg-dxc-purple-light/30 text-dxc-purple-dark flex items-center justify-center text-xs mr-2 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{solution.practice}</Badge>
            {solution.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          
          <Button variant="outline" className="w-full">View Solution</Button>
        </div>
      </CardContent>
    </Card>
  );
}
