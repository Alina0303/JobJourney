import * as z from "zod";

export type JobType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  position: string;
  company: string;
  location: string;
  status: string;
  mode: string;
};

export enum JobStatus {
  applied = "applied",
  interview = "interview",
  offer = "offer",
  rejected = "rejected",
}

export enum JobMode {
  fullTime = "full-time",
  partTime = "part-time",
  internship = "internship",
}

export const createAndEditJobSchema = z.object({
  position: z.string().min(2, { message: "Must be at least 2 characters." }),
  company: z.string().min(2, { message: "Must be at least 2 characters." }),
  location: z.string().min(2, { message: "Must be at least 2 characters." }),
  status: z.nativeEnum(JobStatus),
  mode: z.nativeEnum(JobMode),
});

export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>;
