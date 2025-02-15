import Home from "../pages/home";
import NotFoundPage from "../pages/notFound";

import StarredReposPage from "../pages/starredRepos";
import IRoutes from "./routes";

const routes: IRoutes = {
  home: { path: "/", element: <Home /> },
  starredRepos: { path: "/starred-repos", element: <StarredReposPage /> },
  notFound: { path: "*", element: <NotFoundPage /> },
};

export default routes;
