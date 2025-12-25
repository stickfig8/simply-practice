import "./App.css";
import { BrowserRouter } from "react-router-dom";

import { useBrowserLanguage } from "./hooks/common/useBrowserLanguage";
import RouterLayout from "./components/layout/RouterLayout";

function App() {
  useBrowserLanguage();

  return (
    <BrowserRouter>
      <RouterLayout />
    </BrowserRouter>
  );
}

export default App;
