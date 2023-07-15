import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FormPage } from "./pages/FormPage";
import { ViewPage } from "./pages/ViewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormPage/>}></Route>
        <Route path="/view" element={<ViewPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
