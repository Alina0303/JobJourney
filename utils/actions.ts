"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "./db";
import "dayjs";
import { redirect } from "next/navigation";
import { createAndEditJobSchema, CreateAndEditJobType, JobType } from "./types";
import dayjs from "dayjs";
import { Prisma } from "@/prisma/generated/client";

const authenticateAndRedirect = async (): Promise<string> => {
  const { userId } = await auth();

  if (!userId) redirect("/");
  return userId;
};

export const createJobAction = async (
  values: CreateAndEditJobType,
): Promise<JobType | null> => {
  const userId = await authenticateAndRedirect();
  try {
    createAndEditJobSchema.parse(values);
    const job: JobType = await prisma.job.create({
      data: { ...values, clerkId: userId },
    });
    return job;
  } catch (error) {
    console.error(error);
    return null;
  }
};

type getAllJobsActionType = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

export const getAllJobsAction = async ({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: getAllJobsActionType): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> => {
  const userId = await authenticateAndRedirect();
  try {
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    };
    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: {
              contains: search,
            },
          },
          {
            company: {
              contains: search,
            },
          },
        ],
      };
    }
    if (jobStatus && jobStatus !== "all") {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      };
    }

    const skip = (page - 1) * limit;

    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
      take: limit,
      skip,
      orderBy: {
        createdAt: "desc",
      },
    });

    const count: number = await prisma.job.count({
      where: whereClause,
    });
    const totalPages = Math.ceil(count / limit);

    return { jobs, count, page, totalPages };
  } catch (error) {
    console.error(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
};

export const deleteJobAction = async (id: string): Promise<JobType | null> => {
  const userId = await authenticateAndRedirect();
  try {
    const job: JobType = await prisma.job.delete({
      where: {
        id,
        clerkId: userId,
      },
    });
    return job;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSingleJobAction = async (
  id: string,
): Promise<JobType | null> => {
  let job: JobType | null = null;
  const userId = await authenticateAndRedirect();
  try {
    job = await prisma.job.findUnique({
      where: {
        id,
        clerkId: userId,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
  if (!job) {
    redirect("/jobs");
  }
  return job;
};

export const updateJobAction = async (
  id: string,
  values: CreateAndEditJobType,
): Promise<JobType | null> => {
  let job: JobType | null = null;
  const userId = await authenticateAndRedirect();
  try {
    job = await prisma.job.update({
      where: {
        id,
        clerkId: userId,
      },
      data: { ...values },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
  return job;
};

export const getStatsAction = async (): Promise<{
  applied: number;
  interview: number;
  offer: number;
  rejected: number;
}> => {
  const userId = await authenticateAndRedirect();

  try {
    const stats = await prisma.job.groupBy({
      by: ["status"],
      _count: { status: true },
      where: { clerkId: userId },
    });
    const statsObject = stats.reduce(
      (acc, curr) => {
        acc[curr.status] = curr._count.status;
        return acc;
      },
      {} as Record<string, number>,
    );
    let defaultStats = {
      applied: 0,
      interview: 0,
      offer: 0,
      rejected: 0,
      ...statsObject,
    };
    return defaultStats;
  } catch (error) {
    console.error(error);
    redirect("/jobs");
  }
};

export const getChartsDataAction = async (): Promise<
  {
    date: string;
    count: number;
  }[]
> => {
  const userId = await authenticateAndRedirect();
  const sixMonthsAgo = dayjs().subtract(6, "months").toDate();
  try {
    const jobs = await prisma.job.findMany({
      where: {
        clerkId: userId,
        createdAt: { gte: sixMonthsAgo },
      },
      orderBy: { createdAt: "asc" },
    });
    let applicationsPerMonth = jobs.reduce(
      (acc, curr) => {
        const date = dayjs(curr.createdAt).format("MMM YY");
        const existingEntry = acc.find((entry) => entry.date === date);
        if (existingEntry) {
          existingEntry.count += 1;
        } else acc.push({ date, count: 1 });
        return acc;
      },
      [] as Array<{ date: string; count: number }>,
    );
    return applicationsPerMonth;
  } catch (error) {
    console.error(error);
    redirect("/jobs");
  }
};
