import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <Card className="bg-red-50 border-red-200 mb-8">
      <CardContent className="p-8 text-center">
        <AlertTriangle className="text-red-500 w-12 h-12 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-900 mb-2">Unable to Load Skip Options</h3>
        <p className="text-red-700 mb-4">
          {error || "We're having trouble connecting to our services. Please try again."}
        </p>
        <Button 
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
}
