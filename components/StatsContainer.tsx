"use client";
import { getStatsAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import StatsCard from "./StatsCard";

function StatsContainer() {
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });

  return (
    <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-4">
      <StatsCard title={"applied"} value={data?.applied || 0} />
      <StatsCard title={"interview"} value={data?.interview || 0} />
      <StatsCard title={"offer"} value={data?.offer || 0} />
      <StatsCard title={"rejected"} value={data?.rejected || 0} />
    </div>
  );
}
export default StatsContainer;
