import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "@/redux/slices/jobsSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const FilterSection = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.jobs.filters);

  const jobTypes = [
    { value: "full_time", label: "Full Time" },
    { value: "part_time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "other", label: "Other" },
  ];

  const locations = [
    { value: "Worldwide", label: "Worldwide" },
    { value: "USA Only", label: "USA Only" },
    { value: "Europe", label: "Europe" },
    { value: "Americas", label: "Americas" },
  ];

  const handleFilterChange = (type, value) => {
    dispatch(setFilters({ [type]: value }));
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Select
        value={filters.jobType}
        onValueChange={(value) => handleFilterChange("jobType", value)}
      >
        <SelectTrigger className="w-[180px] text-white">
          <SelectValue placeholder="Job Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {jobTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.location}
        onValueChange={(value) => handleFilterChange("location", value)}
      >
        <SelectTrigger className="w-[180px] text-white">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          {locations.map((location) => (
            <SelectItem key={location.value} value={location.value}>
              {location.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterSection;
