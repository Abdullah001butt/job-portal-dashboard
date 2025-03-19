import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useIsFetching } from "@tanstack/react-query";
import JobList from "../components/JobList";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";

function Favorites() {
  const navigate = useNavigate();
  const isFetching = useIsFetching(['jobs']);
  const favoriteJobs = useSelector((state) => state.favorites.favoriteJobs);

  if (isFetching) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div className="w-12 h-12 border-4 border-primary/50 border-t-transparent rounded-full animate-spin absolute top-2 left-2"></div>
          </div>
          <p className="text-lg font-medium text-muted-foreground animate-pulse">
            Loading your favorite jobs...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] w-full flex flex-col">
      <div className="flex items-center justify-between w-full mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Favorite Jobs ({favoriteJobs.length})
          </h1>
          <p className="text-muted-foreground">
            Jobs that your favorite
          </p>
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

      {favoriteJobs.length === 0 ? (
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-4xl">❤️</div>
            <h3 className="text-xl font-semibold">
              No saved jobs yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Start saving jobs you're interested in to view them later
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="min-w-[200px]"
            >
              Browse Jobs
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-grow">
          <JobList jobs={favoriteJobs} />
        </div>
      )}
    </div>
  );
}

export default Favorites;
