import { create } from "zustand";
import { responseDataType } from "./store";

interface IReposStore {
  starredRepos: responseDataType[];
  starRepo: (repo: responseDataType) => void;
}
export const useStarredReposManager = create<IReposStore>((set) => ({
  starredRepos: [],
  starRepo: (repo) =>
    set((state) => {
      const isRepoStarred = state.starredRepos.find(
        (item) => item.id === repo.id
      );
      if (!isRepoStarred) {
        return { starredRepos: [...state.starredRepos, repo] };
      }
      return {
        starredRepos: [
          ...state.starredRepos.filter((item) => item.id !== repo.id),
        ],
      };
    }),
}));
