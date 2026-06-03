"use client";
import { toast } from "sonner";
import JobInfo from "./JobInfo";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJobAction } from "@/utils/actions";

function DeleteJobBtn({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast("there was an error");
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
      toast("job removed");
    },
  });
  return (
    <Button
      onClick={() => {
        mutate(id);
      }}
      disabled={isPending}
    >
      {isPending ? "deleting" : "delete"}
    </Button>
  );
}
export default DeleteJobBtn;
