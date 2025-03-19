import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { toggleSavedJob } from "@/redux/slices/savedJobsSlice";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  ArrowLeft,
  Building2Icon,
  MapPinIcon,
  CalendarIcon,
  ExternalLink,
  BookmarkIcon,
  DollarSign,
  TagIcon,
} from "lucide-react";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const response = await axios.get("https://remotive.com/api/remote-jobs");
      return response.data.jobs;
    },
  });

  const job = jobs?.find((job) => job.id === parseInt(id));
  const savedJobs = useSelector(state => state.savedJobs.savedJobs);
  const isSaved = savedJobs.some(savedJob => savedJob.id === job?.id);

  const handleApply = () => {
    window.open(job.url, '_blank');
    toast.success('Redirecting to application page', {
      icon: '🚀',
      duration: 3000,
    });
  };

  const handleSaveJob = () => {
    dispatch(toggleSavedJob(job));
    toast.success(isSaved ? 'Job removed from saved jobs' : 'Job saved successfully!');
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-[250px] animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-[200px] animate-pulse"></div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          <div className="h-40 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="w-full max-w-full mx-auto space-y-6 text-white hover:text-blue-500">
      <Button 
        variant="ghost" 
        className="flex items-center gap-2 text-white"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Jobs
      </Button>

      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="text-2xl lg:text-3xl font-bold">{job.title}</CardTitle>
              <div className="flex items-center gap-2 text-lg">
                {job.company_logo ? (
                  <img 
                    src={job.company_logo} 
                    alt={job.company_name}
                    className="h-10 w-10 rounded-full object-cover border-2 border-gray-100"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2Icon className="h-6 w-6 text-primary" />
                  </div>
                )}
                <span className="font-semibold text-gray-800">{job.company_name}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="px-3 py-1">
                {job.job_type}
              </Badge>
              <Badge variant="outline" className="px-3 py-1">{job.category}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPinIcon className="h-5 w-5 text-primary" />
              {job.candidate_required_location}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Posted: {new Date(job.publication_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            {job.salary && (
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="h-5 w-5 text-primary" />
                {job.salary}
              </div>
            )}
            {job.tags?.length > 0 && (
              <div className="flex items-center gap-2 text-gray-600">
                <TagIcon className="h-5 w-5 text-primary" />
                {job.tags.join(", ")}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600">
            <div dangerouslySetInnerHTML={{ __html: job.description }} />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
            <Button 
              size="lg" 
              className="flex-1 sm:flex-none bg-primary hover:bg-primary/90"
              onClick={handleApply}
            >
              Apply Now
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleSaveJob}
              className="flex-1 sm:flex-none border-primary text-white hover:text-blue-500"
            >
              {isSaved ? 'Unsave Job' : 'Save Job'}
              <BookmarkIcon className="ml-2 h-4 w-4" fill={isSaved ? 'currentColor' : 'none'} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default JobDetails;
