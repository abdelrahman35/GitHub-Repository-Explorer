import Navbar from "./components/navbar";
import "./App.css";
import { Route, Routes } from "react-router";
import routes from "./routes";

function App() {
  return (
    <>
      <Navbar />
      <div className="pagesWrapper">
        {" "}
        <Routes>
          {Object.values(routes).map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </>
  );
}

export default App;
