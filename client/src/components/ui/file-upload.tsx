import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Upload, File, X } from "lucide-react";

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileChange?: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // in bytes
  className?: string;
  buttonText?: string;
  showSelectedFile?: boolean;
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      className,
      onFileChange,
      accept,
      maxSize,
      buttonText = "Upload file",
      showSelectedFile = true,
      ...props
    },
    ref
  ) => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      
      if (!file) {
        setSelectedFile(null);
        setError(null);
        if (onFileChange) onFileChange(null);
        return;
      }

      // Check file size if maxSize is provided
      if (maxSize && file.size > maxSize) {
        setError(`File size exceeds the maximum allowed size (${formatFileSize(maxSize)})`);
        setSelectedFile(null);
        if (onFileChange) onFileChange(null);
        return;
      }

      setSelectedFile(file);
      setError(null);
      if (onFileChange) onFileChange(file);
    };

    const handleButtonClick = () => {
      fileInputRef.current?.click();
    };

    const handleRemoveFile = () => {
      setSelectedFile(null);
      setError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      if (onFileChange) onFileChange(null);
    };

    const formatFileSize = (bytes: number): string => {
      if (bytes < 1024) return bytes + " bytes";
      else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
      else return (bytes / 1048576).toFixed(1) + " MB";
    };

    return (
      <div className={cn("space-y-2", className)}>
        <input
          type="file"
          className="hidden"
          ref={(node) => {
            // Handle both refs
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            fileInputRef.current = node;
          }}
          onChange={handleFileChange}
          accept={accept}
          {...props}
        />
        
        <div className="flex flex-col gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleButtonClick}
            className="w-full flex items-center justify-center gap-2"
          >
            <Upload className="h-4 w-4" />
            {buttonText}
          </Button>
          
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          
          {showSelectedFile && selectedFile && (
            <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
              <File className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm flex-1 truncate">{selectedFile.name}</span>
              <span className="text-xs text-muted-foreground">
                {formatFileSize(selectedFile.size)}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={handleRemoveFile}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export { FileUpload };
