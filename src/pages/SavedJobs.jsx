import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import JobList from "../components/JobList";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

function SavedJobs() {
  const navigate = useNavigate();
  const savedJobs = useSelector((state) => state.savedJobs.savedJobs);

  return (
    <div className="min-h-[80vh] w-full flex flex-col">
      <div className="flex items-center justify-between w-full mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Saved Jobs ({savedJobs.length})
          </h1>
          <p className="text-muted-foreground">Jobs you've saved for later</p>
        </div>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-white hover:text-blue-500"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {savedJobs.length === 0 ? (
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-4xl">💼</div>
            <h3 className="text-xl font-semibold">No saved jobs yet</h3>
            <p className="text-muted-foreground mb-4">
              Start saving jobs you're interested in
            </p>
            <Button onClick={() => navigate("/")} className="min-w-[200px]">
              Browse Jobs
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-grow">
          <JobList jobs={savedJobs} />
        </div>
      )}
    </div>
  );
}

export default SavedJobs;
