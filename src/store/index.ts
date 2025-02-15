import { create } from "zustand";
import { responseDataType } from "./store";
import { fetchRepos, removeStarredRepo, starNewRepo } from "../network";
import { Repository } from "../network/response";

interface IReposStore {
  starredRepos: {
    data: responseDataType[];
    error: boolean;
    loading: boolean;
  };
  fetchedRepos: { data: Repository[]; error: boolean; loading: boolean };
  starRepo: (owner: string, repo: responseDataType) => Promise<void>;
  fetchRepos: (keyword: string) => Promise<void>;
}

export const useStarredReposManager = create<IReposStore>((set, get) => ({
  starredRepos: {
    data: [],
    error: false,
    loading: false,
  },
  fetchedRepos: { data: [], loading: false, error: false },
  fetchRepos: async (keyword) => {
    set({
      fetchedRepos: {
        loading: true,
        error: false,
        data: [...get().fetchedRepos.data],
      },
    });
    try {
      const data = await fetchRepos(keyword);
      set(() => ({
        fetchedRepos: {
          loading: false,
          data: [...data.data.items],
          error: false,
        },
      }));
    } catch (error) {
      set({
        fetchedRepos: {
          loading: false,
          error: !!error,
          data: [...get().fetchedRepos.data],
        },
      });
    }
  },
  starRepo: async (owner, repo) => {
    const isRepoStarred = get().starredRepos.data.find(
      (item) => item.id === repo.id
    );
    const allReposArray = get().fetchedRepos.data;
    const starredRepoToUpdateHandler = (action: "INCREASE" | "DECREASE") => {
      const updatedStarsNumber = (starsNumber: number) =>
        action === "INCREASE" ? starsNumber + 1 : starsNumber - 1;
      return {
        ...allReposArray.find((item) => item.id === repo.id),
        stargazers_count: updatedStarsNumber(repo.numberOfStars),
      } as Repository;
    };
    const filteredReposArray = allReposArray.filter(
      (item) => item.id !== repo.id
    );
    if (!isRepoStarred) {
      set({
        starredRepos: {
          loading: true,
          data: [...get().starredRepos.data],
          error: false,
        },
      });
      try {
        await starNewRepo(owner, repo.title);
        set((state) => ({
          starredRepos: {
            loading: false,
            data: [...state.starredRepos.data, repo],
            error: false,
          },
        }));

        set({
          fetchedRepos: {
            ...get().fetchedRepos,
            data: [
              starredRepoToUpdateHandler("INCREASE"),
              ...filteredReposArray,
            ],
          },
        });
      } catch (error) {
        set({
          starredRepos: {
            loading: false,
            error: !!error,
            data: [...get().starredRepos.data],
          },
        });
      }
    } else {
      set({
        starredRepos: {
          loading: true,
          data: [...get().starredRepos.data],
          error: false,
        },
      });
      try {
        const filteredStarredRepos = get().starredRepos.data.filter(
          (item) => item.id !== repo.id
        );
        await removeStarredRepo(owner, repo.title);
        set(() => ({
          starredRepos: {
            loading: false,
            data: [...filteredStarredRepos],
            error: false,
          },
        }));
        set({
          fetchedRepos: {
            ...get().fetchedRepos,
            data: [
              starredRepoToUpdateHandler("DECREASE"),
              ...filteredReposArray,
            ],
          },
        });
      } catch (error) {
        set({
          starredRepos: {
            loading: false,
            error: !!error,
            data: [...get().starredRepos.data],
          },
        });
      }
    }
  },
}));
