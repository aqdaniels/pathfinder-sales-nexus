import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface TranscriptViewerProps {
  transcript: string;
  className?: string;
  maxHeight?: string;
}

export function TranscriptViewer({ 
  transcript, 
  className,
  maxHeight = "600px" 
}: TranscriptViewerProps) {
  // Function to format the transcript with speaker highlighting
  const formatTranscript = (text: string) => {
    if (!text) return null;
    
    // Split the transcript into lines
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      // Check if line starts with a speaker name (e.g., "John: ")
      const speakerMatch = line.match(/^(\s*)([^:]+):(.*)/);
      
      if (speakerMatch) {
        const [, leadingSpace, speaker, content] = speakerMatch;
        return (
          <div key={index} className="mb-3">
            <span className="font-semibold text-dxc-purple">{speaker}:</span>
            <span>{content}</span>
          </div>
        );
      }
      
      // Return regular line if no speaker is detected
      return <div key={index} className="mb-3">{line}</div>;
    });
  };

  return (
    <ScrollArea className={cn("rounded-md border", className)} style={{ maxHeight }}>
      <div className="p-4 font-mono text-sm whitespace-pre-line">
        {formatTranscript(transcript)}
      </div>
    </ScrollArea>
  );
}
