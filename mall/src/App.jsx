import "./App.css";
import root from "./router/root";
import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <RouterProvider router={root} />
    </>
  );
}

export default App;
