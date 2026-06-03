import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

function StatsCard({ title, value }: { title: string; value: number }) {
  return (
    <Card className="bg-muted">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="capitalize">{title}</CardTitle>
        <CardDescription className="text-4xl font-extrabold text-primary mt-[0px!important]">
          {value}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export const StatsLoadingCard = () => {
  return (
    <Card className="w-[330px] h-[88px]">
      <CardHeader className="flex flex-row justify-between items-center">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-12 w-12 rounded-full" />
      </CardHeader>
    </Card>
  );
};
export default StatsCard;
