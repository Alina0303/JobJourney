"use client";
import { getChartsDataAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";

function ChartsContainer() {
  const { isPending, data } = useQuery({
    queryKey: ["charts"],
    queryFn: () => getChartsDataAction(),
  });
  if (isPending) {
    return <h2>loading...</h2>;
  }
  if (!data || data?.length < 1) return null;
  return (
    <section className="mt-16">
      <h1 className="text-center text-4xl font-semibold">
        Monthly Applications
      </h1>

      <BarChart
        style={{
          width: "100%",
          height: "300px",
        }}
        responsive
        data={data}
        margin={{
          top: 50,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip
          cursor={false}
          contentStyle={{
            backgroundColor: "#5e77cd",
            borderRadius: "8px",
            color: "#fff",
          }}
          labelStyle={{ color: "#fff" }}
          itemStyle={{ color: "#fff" }}
        />

        <Bar
          dataKey="count"
          barSize={75}
          fill="#193CB8"
          radius={[10, 10, 0, 0]}
          activeBar={{ fill: "#5e77cd" }}
        />
      </BarChart>
    </section>
  );
}
export default ChartsContainer;
