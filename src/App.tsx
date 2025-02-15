import Navbar from "./components/navbar";
import "./App.css";
import { Route, Routes } from "react-router";
import routes from "./routes";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {Object.values(routes).map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
