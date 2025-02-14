import { create } from "zustand";
import { responseDataType } from "./repsonse";

interface IReposStore {
  starredRepos: responseDataType[];
  starNewRepo: (repo: responseDataType) => void;
  removeStarredRepo: (repo: responseDataType) => void;
}
export const useStarredReposManager = create<IReposStore>((set) => ({
  starredRepos: [],
  starNewRepo: (repo) =>
    set((state) => ({ starredRepos: [...state.starredRepos, repo] })),
  removeStarredRepo: (repo) =>
    set((state) => ({
      starredRepos: [
        ...state.starredRepos.filter((item) => item.id !== repo.id),
      ],
    })),
}));
