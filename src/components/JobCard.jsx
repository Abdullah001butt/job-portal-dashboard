import React, { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/slices/favoritesSlice";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CalendarIcon, MapPinIcon, Building2Icon, HeartIcon } from "lucide-react";

const formatDate = (dateString) => (
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
);

const JobMetadata = memo(({ location, date }) => (
  <div className="space-y-2 text-xs sm:text-sm md:text-base">
    <p className="text-muted-foreground flex items-center gap-2">
      <MapPinIcon className="h-3 w-3 sm:h-4 sm:w-4" />
      {location}
    </p>
    <p className="text-muted-foreground flex items-center gap-2">
      <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
      Posted: {formatDate(date)}
    </p>
  </div>
));

const JobCard = memo(({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoriteJobs = useSelector((state) => state.favorites.favoriteJobs);
  const isFavorite = favoriteJobs.some((favJob) => favJob.id === job.id);

  const handleFavoriteClick = useCallback((e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(job));
  }, [dispatch, job]);

  const handleViewDetails = useCallback(() => {
    navigate(`/job/${job.id}`);
  }, [navigate, job.id]);

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-2 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
          <CardTitle className="text-base sm:text-lg md:text-xl line-clamp-1 flex-1">
            {job.title}
          </CardTitle>
          <div className="flex items-center gap-2 shrink-0">
            <Badge 
              variant="secondary" 
              className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5"
            >
              {job.job_type}
            </Badge>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleFavoriteClick}
              className={`h-8 w-8 sm:h-9 sm:w-9 ${isFavorite ? "text-red-500" : "text-gray-500"}`}
            >
              <HeartIcon 
                className="h-4 w-4 sm:h-5 sm:w-5" 
                fill={isFavorite ? "currentColor" : "none"} 
              />
            </Button>
          </div>
        </div>
        <CardDescription className="flex items-center gap-2 text-xs sm:text-sm md:text-base">
          <Building2Icon className="h-3 w-3 sm:h-4 sm:w-4" />
          {job.company_name}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6">
        <JobMetadata 
          location={job.candidate_required_location} 
          date={job.publication_date} 
        />
      </CardContent>
      
      <CardFooter className="p-4 sm:p-6">
        <Button 
          className="w-full h-9 sm:h-10 text-sm sm:text-base"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
});

JobCard.displayName = 'JobCard';

export default JobCard;
