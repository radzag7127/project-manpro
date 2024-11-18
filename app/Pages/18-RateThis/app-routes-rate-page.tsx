"use client";

import { useState } from "react";
import { Star, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

// Mock data for demonstration (this would be passed as a prop in a real scenario)
const mockItem = {
  type: "agent",
  name: "John Doe",
  image: "/placeholder.svg?height=50&width=50",
  specialization: "Residential",
};

export function RateThisPage() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionProgress, setSubmissionProgress] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isVerified) {
      alert("Please verify your interaction before submitting.");
      return;
    }
    setIsSubmitted(true);
    // Simulate submission process
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setSubmissionProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto max-w-2xl py-8">
        <Card>
          <CardHeader>
            <CardTitle>Thank You for Your Feedback!</CardTitle>
            <CardDescription>
              Your rating has been submitted and will be reviewed to ensure
              quality and transparency.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={submissionProgress} className="w-full" />
            <p className="mt-2 text-sm text-muted-foreground">
              Processing your feedback...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <h1 className="text-3xl font-bold mb-4">Rate Your Experience</h1>
      <p className="mb-6">
        Your feedback helps improve our platform and guides other users in
        making informed decisions.
      </p>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Verify Your Interaction</CardTitle>
            <CardDescription>
              Please confirm that you have genuinely interacted with this{" "}
              {mockItem.type} through Rumaku.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="verify-interaction"
                checked={isVerified}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIsVerified(e.target.checked)
                }
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="verify-interaction">
                I confirm that I have interacted with this {mockItem.type}{" "}
                through Rumaku
              </Label>
            </div>
            {!isVerified && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Verification Required</AlertTitle>
                <AlertDescription>
                  Please only rate listings or profiles you've genuinely
                  interacted with to maintain fairness.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {isVerified && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Rate Your Experience</CardTitle>
              <CardDescription>
                How would you rate your experience?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-8 w-8 cursor-pointer ${
                      star <= rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
              <Textarea
                placeholder={`Tell us more about your experience. Was it as described? How was the communication?`}
                value={comment}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setComment(e.target.value)
                }
                className="w-full"
              />
            </CardContent>
          </Card>
        )}

        <Button type="submit" disabled={!isVerified || rating === 0}>
          Submit Rating
        </Button>
      </form>
    </div>
  );
}
