import React from "react";
import JobCard from "./JobCard";

function JobList({ jobs }) {
  if (!jobs?.length) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No jobs found
        </h3>
        <p className="text-gray-600">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobList;
