"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleJobAction, updateJobAction } from "@/utils/actions";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CustomFormField, CustomFormSelect } from "./FormComponents";
import {
  createAndEditJobSchema,
  CreateAndEditJobType,
  JobStatus,
  JobMode,
} from "@/utils/types";
import { toast } from "sonner";

function EditJobForm({ jobId }: { jobId: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getSingleJobAction(jobId),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) =>
      updateJobAction(jobId, values),
    onSuccess: (data) => {
      if (!data) {
        toast("there was an error");
        return;
      }
      toast("job updated");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });

      router.push("/jobs");
    },
  });

  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: data?.position || "",
      company: data?.company || "",
      location: data?.location || "",
      status: (data?.status as JobStatus) || JobStatus.applied,
      mode: (data?.mode as JobMode) || JobMode.fullTime,
    },
  });

  function onSubmit(values: CreateAndEditJobType) {
    mutate(values);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="bg-muted p-8 rounded"
    >
      <h2 className="capitalize font-semibold text-4xl mb-6">edit job</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
        <CustomFormField name="position" control={form.control} />
        <CustomFormField name="company" control={form.control} />
        <CustomFormField name="location" control={form.control} />
        <CustomFormSelect
          name="status"
          control={form.control}
          labelText="job status"
          items={Object.values(JobStatus)}
        />
        <CustomFormSelect
          name="mode"
          control={form.control}
          labelText="job mode"
          items={Object.values(JobMode)}
        />

        <Button
          type="submit"
          className="self-end capitalize"
          disabled={isPending}
        >
          {isPending ? "updating" : "edit job"}
        </Button>
      </div>
    </form>
  );
}
export default EditJobForm;
