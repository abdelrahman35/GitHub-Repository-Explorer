import { create } from "zustand";
import { responseDataType } from "./store";
import { removeStarredRepo, starNewRepo } from "../network";

interface IReposStore {
  starredRepos: responseDataType[];
  starRepo: (owner: string, repo: responseDataType) => Promise<void>;
  error: boolean;
  loading: boolean;
}

export const useStarredReposManager = create<IReposStore>((set, get) => ({
  starredRepos: [],
  error: false,
  loading: false,
  starRepo: async (owner, repo) => {
    const isRepoStarred = get().starredRepos.find(
      (item) => item.id === repo.id
    );
    if (!isRepoStarred) {
      set({ loading: true });
      try {
        await starNewRepo(owner, repo.title);
        set((state) => ({
          loading: false,
          starredRepos: [...state.starredRepos, repo],
        }));
      } catch (error) {
        set(() => ({
          loading: false,
          error: !!error,
        }));
      }
    } else {
      set({ loading: true });
      try {
        const filteredStarredRepos = get().starredRepos.filter(
          (item) => item.id !== repo.id
        );
        await removeStarredRepo(owner, repo.title);
        set(() => ({
          loading: false,
          starredRepos: [...filteredStarredRepos],
        }));
      } catch (error) {
        set(() => ({
          loading: false,
          error: !!error,
        }));
      }
    }
  },
}));
