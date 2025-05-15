
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Lightbulb,
  PlusCircle,
  UserCircle,
  Users,
  ThumbsUp,
  MessageSquare,
  Save,
  Play
} from "lucide-react";

// SCAMPER methodology elements
const scamperElements = [
  {
    id: "substitute",
    title: "Substitute",
    description: "What materials, components, or systems could be replaced with alternatives to improve the solution?",
    promptQuestions: [
      "What can you substitute or swap to improve the solution?",
      "What would happen if you replaced part of the solution with something else?",
      "What other technology could you substitute to solve this challenge?",
      "Could you use this solution in a different context?"
    ],
    examples: [
      "Substitute manual processes with automated workflows",
      "Replace on-premise systems with cloud services",
      "Substitute legacy technologies with modern platforms"
    ],
    color: "bg-blue-50 border-blue-200"
  },
  {
    id: "combine",
    title: "Combine",
    description: "How might different components, services, or products be integrated to create new value?",
    promptQuestions: [
      "What would happen if you combined this solution with another?",
      "How could you merge different technologies to create more value?",
      "What partnerships could enhance your solution?",
      "Could you combine functions or features to improve efficiency?"
    ],
    examples: [
      "Combine AI with traditional analytics for deeper insights",
      "Integrate IoT sensors with cloud platforms for real-time monitoring",
      "Merge customer-facing and back-office systems for seamless operations"
    ],
    color: "bg-purple-50 border-purple-200"
  },
  {
    id: "adapt",
    title: "Adapt",
    description: "How can existing solutions, patterns, or ideas be adjusted for this specific client context?",
    promptQuestions: [
      "How could you adapt an existing solution to meet this need?",
      "What could you adapt from another industry to solve this problem?",
      "How might this solution need to be modified for different users?",
      "What capabilities from other solutions could you adapt here?"
    ],
    examples: [
      "Adapt consumer UX patterns for enterprise applications",
      "Customize industry frameworks for specific client needs",
      "Scale enterprise solutions for mid-market clients"
    ],
    color: "bg-green-50 border-green-200"
  },
  {
    id: "modify",
    title: "Modify",
    description: "What aspects of existing solutions could be enhanced, magnified, or diminished to improve outcomes?",
    promptQuestions: [
      "What could you magnify or emphasize in the solution?",
      "What elements could you minimize to reduce complexity?",
      "How could you modify the workflow to improve user experience?",
      "What would happen if you changed the scale or frequency?"
    ],
    examples: [
      "Enhance security features for sensitive industries",
      "Simplify interfaces for improved adoption",
      "Expand data model to accommodate future growth"
    ],
    color: "bg-yellow-50 border-yellow-200"
  },
  {
    id: "purpose",
    title: "Put to another use",
    description: "How might existing capabilities be leveraged in new ways or for different purposes?",
    promptQuestions: [
      "Could this solution be used for something else entirely?",
      "Are there other problems this approach could solve?",
      "How could existing client investments be repurposed?",
      "What new markets or users could benefit from this solution?"
    ],
    examples: [
      "Repurpose customer analytics for operational insights",
      "Use employee collaboration tools for customer engagement",
      "Apply security frameworks to improve operational resilience"
    ],
    color: "bg-orange-50 border-orange-200"
  },
  {
    id: "eliminate",
    title: "Eliminate",
    description: "What components, steps, or features could be removed to simplify or streamline the solution?",
    promptQuestions: [
      "What could you remove without affecting functionality?",
      "How could you reduce complexity while maintaining value?",
      "What would happen if you eliminated a constraint?",
      "Which processes or handoffs could be eliminated?"
    ],
    examples: [
      "Remove manual approval steps with automated rules",
      "Eliminate data silos with integrated platforms",
      "Remove technical debt by modernizing architecture"
    ],
    color: "bg-red-50 border-red-200"
  },
  {
    id: "reverse",
    title: "Reverse",
    description: "How might inverting, reordering, or reversing assumptions create innovative approaches?",
    promptQuestions: [
      "What if you reversed the process flow?",
      "How would the solution change if you inverted a key assumption?",
      "What would an opposite approach look like?",
      "What if users became creators or administrators?"
    ],
    examples: [
      "Shift from reactive to proactive problem solving",
      "Move from centralized to distributed architecture",
      "Change from custom development to configuration-driven approaches"
    ],
    color: "bg-indigo-50 border-indigo-200"
  }
];

// Sample ideas for demonstration
const sampleIdeas = {
  "substitute": [
    {
      id: "idea-1",
      text: "Replace manual data entry with intelligent document processing",
      author: "Alex Chen",
      votes: 5,
      comments: 2
    },
    {
      id: "idea-2",
      text: "Substitute legacy reporting with real-time dashboards",
      author: "Samantha Jackson",
      votes: 3,
      comments: 1
    }
  ],
  "combine": [
    {
      id: "idea-3",
      text: "Integrate SFDC with ERP for 360-degree customer visibility",
      author: "Mark Wilson",
      votes: 4,
      comments: 0
    }
  ]
};

export function ScamperWorkshop() {
  const [activeElement, setActiveElement] = useState("substitute");
  const [ideas, setIdeas] = useState(sampleIdeas);
  const [newIdea, setNewIdea] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [sessionParticipants, setSessionParticipants] = useState([
    { id: 1, name: "You", role: "Facilitator", avatar: "" },
    { id: 2, name: "John Smith", role: "Client", avatar: "" },
    { id: 3, name: "Maria Garcia", role: "Solution Architect", avatar: "" },
    { id: 4, name: "David Kim", role: "Industry Expert", avatar: "" }
  ]);

  const currentElement = scamperElements.find(el => el.id === activeElement);

  const handleAddIdea = () => {
    if (!newIdea.trim()) return;

    setIdeas(prev => ({
      ...prev,
      [activeElement]: [
        ...(prev[activeElement] || []),
        {
          id: `idea-${Date.now()}`,
          text: newIdea,
          author: "You",
          votes: 0,
          comments: 0
        }
      ]
    }));

    setNewIdea("");
  };

  const handleVote = (ideaId) => {
    setIdeas(prev => ({
      ...prev,
      [activeElement]: prev[activeElement].map(idea =>
        idea.id === ideaId ? { ...idea, votes: idea.votes + 1 } : idea
      )
    }));
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Sidebar with SCAMPER elements */}
      <div className="col-span-3">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>SCAMPER Methodology</CardTitle>
            <CardDescription>
              A structured approach to solution ideation
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col">
              {scamperElements.map((element) => (
                <button
                  key={element.id}
                  className={`flex items-center p-4 border-l-4 transition-colors hover:bg-gray-50 ${
                    activeElement === element.id
                      ? `${element.color} font-medium`
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveElement(element.id)}
                >
                  <Lightbulb
                    className={`mr-3 h-5 w-5 ${
                      activeElement === element.id ? "text-primary" : "text-gray-400"
                    }`}
                  />
                  <div className="text-left">
                    <div className={activeElement === element.id ? "text-primary" : ""}>
                      {element.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content area */}
      <div className="col-span-9">
        <div className="grid grid-cols-12 gap-6">
          {/* Session controls */}
          <div className="col-span-12">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Button
                      variant={isRecording ? "destructive" : "default"}
                      size="sm"
                      onClick={toggleRecording}
                      className="mr-4"
                    >
                      {isRecording ? (
                        <>
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></div>
                          Recording
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Start Recording
                        </>
                      )}
                    </Button>

                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-sm font-medium">Participants ({sessionParticipants.length})</span>
                      <div className="flex -space-x-2 ml-3">
                        {sessionParticipants.slice(0, 3).map(participant => (
                          <Avatar key={participant.id} className="h-7 w-7 border-2 border-white">
                            <AvatarFallback className="text-xs">
                              {participant.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {sessionParticipants.length > 3 && (
                          <div className="flex items-center justify-center h-7 w-7 rounded-full bg-gray-100 border-2 border-white text-xs">
                            +{sessionParticipants.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Button variant="outline" size="sm" className="mr-2">
                      <Save className="mr-2 h-4 w-4" />
                      Save Session
                    </Button>
                    <Button variant="outline" size="sm">
                      <UserCircle className="mr-2 h-4 w-4" />
                      Invite
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current SCAMPER element */}
          <div className="col-span-12">
            <Card className={`border-l-4 ${currentElement?.color || ""}`}>
              <CardHeader>
                <CardTitle>{currentElement?.title}</CardTitle>
                <CardDescription>
                  {currentElement?.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Prompt Questions</h4>
                    <ul className="space-y-2">
                      {currentElement?.promptQuestions.map((question, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {question}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Examples</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentElement?.examples.map((example, idx) => (
                        <Badge key={idx} variant="outline" className="bg-white">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ideation area */}
          <div className="col-span-12">
            <Card>
              <CardHeader>
                <CardTitle>Collaborative Ideation</CardTitle>
                <CardDescription>
                  Share and build on ideas for the {currentElement?.title.toLowerCase()} approach
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex gap-3">
                    <Textarea
                      placeholder="Share your idea here..."
                      className="flex-1"
                      value={newIdea}
                      onChange={(e) => setNewIdea(e.target.value)}
                    />
                    <Button onClick={handleAddIdea}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Idea
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-4">Ideas ({(ideas[activeElement] || []).length})</h4>

                    {(ideas[activeElement] || []).length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Lightbulb className="mx-auto h-12 w-12 opacity-20 mb-3" />
                        <p>No ideas yet. Be the first to contribute!</p>
                      </div>
                    ) : (
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-4">
                          {(ideas[activeElement] || []).sort((a, b) => b.votes - a.votes).map(idea => (
                            <div
                              key={idea.id}
                              className="p-4 border rounded-md hover:shadow-sm transition-shadow"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center">
                                  <Avatar className="h-7 w-7 mr-2">
                                    <AvatarFallback className="text-xs">
                                      {idea.author.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm font-medium">{idea.author}</span>
                                </div>
                                <div className="flex items-center">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleVote(idea.id)}
                                  >
                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                    <span>{idea.votes}</span>
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <MessageSquare className="h-4 w-4 mr-1" />
                                    <span>{idea.comments}</span>
                                  </Button>
                                </div>
                              </div>
                              <p>{idea.text}</p>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
