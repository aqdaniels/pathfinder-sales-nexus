
// Types for our matching engine
export type ClientChallenge = {
  name: string;
  confidence: number;
};

export type ClientTopic = {
  name: string;
  mentions: number;
  sentiment: number;
};

export type ClientInsight = {
  clientName: string;
  lastMeeting: string;
  sentiment: number;
  keyTopics: ClientTopic[];
  challenges: ClientChallenge[];
  summary: string;
};

export type Solution = {
  id: string;
  name: string;
  description: string;
  confidenceScore: number;
  keyFeatures: string[];
  benefits: string[];
  practice: "Custom Apps" | "SAP" | "Enterprise & Cloud" | "Data & AI";
  tags: string[];
};

export type ChallengeMatchEvidence = {
  challengeName: string;
  confidenceScore: number;
  matchedFeatures: string[];
  matchedBenefits: string[];
};

export type SolutionWithEvidence = Solution & {
  matchEvidence: ChallengeMatchEvidence[];
  overallScore: number;
};

/**
 * Calculate a match score between a solution and client insights
 */
export function matchSolutionToInsights(
  solution: Solution,
  clientInsight: ClientInsight
): SolutionWithEvidence {
  const matchEvidence: ChallengeMatchEvidence[] = [];
  
  // For each client challenge, calculate how well the solution addresses it
  clientInsight.challenges.forEach(challenge => {
    const matchedFeatures = solution.keyFeatures.filter(feature => 
      featureAddressesChallenge(feature, challenge.name)
    );
    
    const matchedBenefits = solution.benefits.filter(benefit => 
      benefitAddressesChallenge(benefit, challenge.name)
    );
    
    // Calculate a score based on how many features and benefits match the challenge
    const featureScore = matchedFeatures.length / solution.keyFeatures.length * 100;
    const benefitScore = matchedBenefits.length / solution.benefits.length * 100;
    
    // Weight the combined score by the challenge confidence
    const confidenceScore = Math.round(
      (featureScore * 0.4 + benefitScore * 0.6) * (challenge.confidence / 100)
    );
    
    if (matchedFeatures.length > 0 || matchedBenefits.length > 0) {
      matchEvidence.push({
        challengeName: challenge.name,
        confidenceScore,
        matchedFeatures,
        matchedBenefits
      });
    }
  });
  
  // Calculate overall score based on evidence and client sentiment
  const evidenceScore = matchEvidence.reduce((sum, evidence) => sum + evidence.confidenceScore, 0);
  const topicBoost = calculateTopicBoost(solution, clientInsight.keyTopics);
  const overallScore = Math.min(
    Math.round((evidenceScore / (matchEvidence.length || 1) + topicBoost) * 
    (clientInsight.sentiment / 80)), // Sentiment modifier
    99 // Cap at 99% to avoid perfect scores
  );
  
  return {
    ...solution,
    matchEvidence,
    overallScore
  };
}

/**
 * Check if a solution feature addresses a specific client challenge
 */
function featureAddressesChallenge(feature: string, challenge: string): boolean {
  // In a real implementation, this would use NLP to match semantically similar concepts
  // For this demo, we'll use a simple keyword match approach
  const challengeKeywords = extractKeywords(challenge);
  const featureKeywords = extractKeywords(feature);
  
  return challengeKeywords.some(ck => 
    featureKeywords.some(fk => fk.includes(ck) || ck.includes(fk))
  );
}

/**
 * Check if a solution benefit addresses a specific client challenge
 */
function benefitAddressesChallenge(benefit: string, challenge: string): boolean {
  // Similar simple matching logic for demo purposes
  const challengeKeywords = extractKeywords(challenge);
  const benefitKeywords = extractKeywords(benefit);
  
  return challengeKeywords.some(ck => 
    benefitKeywords.some(bk => bk.includes(ck) || ck.includes(bk))
  );
}

/**
 * Extract keywords from a string
 */
function extractKeywords(text: string): string[] {
  // In a real implementation, this would use more sophisticated NLP
  // For demo, just split by spaces and remove common words
  return text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .filter(word => word.length > 3)
    .filter(word => !['with', 'from', 'that', 'this', 'will', 'have', 'about'].includes(word));
}

/**
 * Calculate a boost based on how well the solution aligns with key topics
 */
function calculateTopicBoost(solution: Solution, topics: ClientTopic[]): number {
  let boost = 0;
  
  // Check solution tags against topics
  topics.forEach(topic => {
    if (solution.tags.some(tag => 
      tag.toLowerCase().includes(topic.name.toLowerCase()) || 
      topic.name.toLowerCase().includes(tag.toLowerCase())
    )) {
      // Higher boost for positive sentiment topics
      boost += (topic.sentiment / 100) * 10;
    }
  });
  
  // Check solution name and description as well
  topics.forEach(topic => {
    const topicKeywords = extractKeywords(topic.name);
    const solutionKeywords = [
      ...extractKeywords(solution.name),
      ...extractKeywords(solution.description)
    ];
    
    if (topicKeywords.some(tk => 
      solutionKeywords.some(sk => sk.includes(tk) || tk.includes(sk))
    )) {
      boost += (topic.sentiment / 100) * 5;
    }
  });
  
  return Math.min(boost, 20); // Cap the boost at 20 points
}
