
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export function WinLossAnalytics() {
  const [timeframe, setTimeframe] = useState("quarter");

  // Sample data for the win/loss dashboard
  const winLossByCompetitor = [
    { name: "Acme Corp", wins: 32, losses: 18 },
    { name: "Tech Solutions", wins: 28, losses: 12 },
    { name: "Innovate Inc", wins: 22, losses: 20 },
    { name: "Global Services", wins: 18, losses: 24 },
    { name: "Digital Systems", wins: 16, losses: 14 }
  ];

  const winLossByIndustry = [
    { name: "Financial Services", wins: 38, losses: 16 },
    { name: "Healthcare", wins: 26, losses: 22 },
    { name: "Manufacturing", wins: 24, losses: 18 },
    { name: "Retail", wins: 16, losses: 12 },
    { name: "Public Sector", wins: 12, losses: 20 }
  ];

  const decisionFactors = [
    { name: "Technical Capability", value: 32 },
    { name: "Price/Value", value: 28 },
    { name: "Implementation Timeline", value: 18 },
    { name: "Previous Relationship", value: 12 },
    { name: "Support & Maintenance", value: 10 }
  ];

  const successPatterns = [
    {
      id: 1,
      title: "Early SME Engagement",
      description: "Involving subject matter experts in the early stages of the sales process increases win rate by 35%",
      winRate: "78%"
    },
    {
      id: 2,
      title: "Executive Sponsorship",
      description: "Opportunities with executive sponsor engagement have 42% higher close rates",
      winRate: "82%"
    },
    {
      id: 3,
      title: "Proof of Concept",
      description: "Deals with successful proof of concept demonstrations close at 3x the rate of those without",
      winRate: "75%"
    }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Win/Loss Analysis Dashboard</h2>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="six-months">Last 6 Months</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
            <SelectItem value="two-years">Last 2 Years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Win/Loss by Competitor</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={winLossByCompetitor}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="wins" stackId="a" fill="#22c55e" name="Wins" />
                <Bar dataKey="losses" stackId="a" fill="#ef4444" name="Losses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Win/Loss by Industry</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={winLossByIndustry}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="wins" stackId="a" fill="#22c55e" name="Wins" />
                <Bar dataKey="losses" stackId="a" fill="#ef4444" name="Losses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Key Decision Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={decisionFactors}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {decisionFactors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Winning Patterns & Strategies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {successPatterns.map((pattern) => (
                <div key={pattern.id} className="p-4 border rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{pattern.title}</h3>
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                      Win Rate: {pattern.winRate}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">{pattern.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
