import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axios from 'axios';
import JobList from '../components/JobList';
import FilterSection from '../components/FilterSection';
import { Skeleton } from "../components/ui/skeleton";
import { Button } from "../components/ui/button";

const JOBS_PER_PAGE = 9;

function Jobs() {
  const [displayCount, setDisplayCount] = useState(JOBS_PER_PAGE);
  const searchTerm = useSelector(state => state.jobs.searchTerm);
  const filters = useSelector(state => state.jobs.filters);

  const { data, isLoading } = useQuery({
    queryKey: ['jobs', searchTerm, filters],
    queryFn: async () => {
      const response = await axios.get('https://remotive.com/api/remote-jobs');
      return response.data.jobs;
    }
  });

  const filteredJobs = useMemo(() => 
    data?.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
        job.company_name.toLowerCase().includes(searchTerm?.toLowerCase() || '');
      
      const matchesJobType = !filters.jobType || filters.jobType === 'all' || 
        job.job_type.toLowerCase().replace('-', '_') === filters.jobType;
        
      const matchesLocation = !filters.location || filters.location === 'all' || 
        job.candidate_required_location.toLowerCase().includes(filters.location.toLowerCase());
    
      return matchesSearch && matchesJobType && matchesLocation;
    }),
    [data, searchTerm, filters]
  );

  const paginatedJobs = useMemo(() => 
    filteredJobs?.slice(0, displayCount),
    [filteredJobs, displayCount]
  );

  const hasMore = filteredJobs?.length > displayCount;

  function handleLoadMore() {
    setDisplayCount(prev => prev + JOBS_PER_PAGE);
  }

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div className="w-12 h-12 border-4 border-primary/50 border-t-transparent rounded-full animate-spin absolute top-2 left-2"></div>
          </div>
          <p className="text-lg font-medium text-muted-foreground animate-pulse">
            Loading amazing jobs for you...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] w-full flex flex-col">
      <div className="flex items-center justify-between w-full mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Available Jobs ({filteredJobs?.length || 0})
        </h1>
      </div>

      <FilterSection />

      <div className="flex-grow">
        <JobList jobs={paginatedJobs} />
      </div>
      
      {hasMore && (
        <div className="flex justify-center mt-8 w-full">
          <Button 
            onClick={handleLoadMore} 
            variant="outline" 
            size="lg"
            className="min-w-[200px] text-white hover:text-blue-500"
          >
            Load More Jobs
          </Button>
        </div>
      )}
    </div>
  );
}

export default Jobs;
