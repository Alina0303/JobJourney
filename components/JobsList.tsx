"use client";
import { getAllJobsAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import JobCard from "./JobCard";
import ButtonContainer from "./ComplexButtonContainer";

function JobsList() {
  const params = useSearchParams();
  const search = params.get("search") || "";
  const jobStatus = params.get("jobStatus") || "all";
  const page: number = Number(params.get("page") || 1);
  const { data, isPending } = useQuery({
    queryKey: ["jobs", search ?? "", jobStatus, page],
    queryFn: () => getAllJobsAction({ search, jobStatus, page }),
  });
  const jobs = data?.jobs || [];
  const count = data?.count || 0;
  const totalPages = data?.totalPages || 0;

  if (isPending) {
    return <h2>Please wait...</h2>;
  }
  if (jobs.length === 0) {
    return <h2>No jobs found...</h2>;
  }
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold capitalize">{count} jobs found</h2>
        {totalPages < 2 ? null : (
          <ButtonContainer currentPage={page} totalPages={totalPages} />
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {jobs.map((job) => {
          return <JobCard key={job.id} job={job} />;
        })}
      </div>
    </>
  );
}
export default JobsList;
