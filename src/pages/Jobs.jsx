import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axios from 'axios';
import JobList from '../components/JobList';
import FilterSection from '../components/FilterSection';
import { useInView } from 'react-intersection-observer';

const JOBS_PER_PAGE = 9;

function Jobs() {
  const { ref, inView } = useInView({
    onChange: (inView) => {
      if (inView && hasMore) {
        setDisplayCount(prev => prev + JOBS_PER_PAGE);
      }
    }
  });
  const [displayCount, setDisplayCount] = React.useState(JOBS_PER_PAGE);
  const searchTerm = useSelector(state => state.jobs.searchTerm);
  const filters = useSelector(state => state.jobs.filters);

  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs', searchTerm, filters],
    queryFn: async () => {
      const response = await axios.get('https://remotive.com/api/remote-jobs');
      return response.data.jobs;
    }
  });

  const filteredJobs = useMemo(() => {
    if (!jobs) return [];
    
    return jobs.filter(job => {
      const searchValue = searchTerm?.toLowerCase() || '';
      const matchesSearch = !searchValue || 
        job.title.toLowerCase().includes(searchValue) ||
        job.company_name.toLowerCase().includes(searchValue);
      
      const matchesJobType = !filters.jobType || filters.jobType === 'all' || 
        job.job_type.toLowerCase().replace('-', '_') === filters.jobType;
        
      const matchesLocation = !filters.location || filters.location === 'all' || 
        job.candidate_required_location.toLowerCase().includes(filters.location.toLowerCase());
    
      return matchesSearch && matchesJobType && matchesLocation;
    });
  }, [jobs, searchTerm, filters]);

  const displayedJobs = useMemo(() => 
    filteredJobs?.slice(0, displayCount),
    [filteredJobs, displayCount]
  );

  const hasMore = filteredJobs?.length > displayCount;

  return (
    <div className="min-h-[80vh] w-full flex flex-col">
      <div className="flex items-center justify-between w-full mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Available Jobs ({filteredJobs?.length || 0})
        </h1>
      </div>

      <FilterSection />

      <div className="flex-grow"> 
        <JobList jobs={displayedJobs} />
      </div>
      
      <div ref={ref} className="flex justify-center mt-8 w-full">
        {hasMore && (
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>
    </div>
  );
}

export default Jobs;
