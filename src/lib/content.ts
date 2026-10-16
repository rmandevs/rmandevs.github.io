import { getCollection } from "astro:content";

export const dateLabel = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
export const getProjects = async () =>
  (await getCollection("projects")).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
export const getPosts = async () =>
  (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
