interface IRoute {
  path: string;
  element: JSX.Element;
}

export default interface IRoutes {
  home: IRoute;
  starredRepos: IRoute;
  notFound: IRoute;
}
