import type { AxiosInstance } from "axios";

export const feed = async (
  axiosPrivate: AxiosInstance,
  cursor: string | null
) => {
  const url = cursor ? `/api/feed?cursor=${cursor}` : "/api/feed";

  const res = await axiosPrivate.get(url, {
    withCredentials: true,
  });

  return {
    posts: res.data.posts,
    nextCursor: res.data.nextCursor,
  };
};
