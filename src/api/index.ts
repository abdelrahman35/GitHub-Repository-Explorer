import axiosInstance from "./axiosInstance";

export const starNewRepo = async (owner: string, repo: string) => {
  await axiosInstance.put(`/user/starred/${owner}/${repo}`, {
    owner,
    repo,
  });
};

export const removeStarredRepo = async (owner: string, repo: string) => {
  await axiosInstance(`/user/starred/${owner}/${repo}`, {
    method: "DELETE",
    data: {
      owner,
      repo,
    },
  });
};

export const fetchRepos = async (keyword: string) => {
  const repsonse = await axiosInstance.get("/search/repositories", {
    params: { q: keyword, per_page: 10 },
  });
  return repsonse;
};
