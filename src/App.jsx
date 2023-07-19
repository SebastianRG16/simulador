import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FormPage } from "./pages/FormPage";
import { ViewPage } from "./pages/ViewPage";
import { VistaImages } from "./pages/VistaImages";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/noEntrar" element={<FormPage/>}></Route>
        <Route path="/" element={<ViewPage/>}></Route>
        <Route path="/vista" element={<VistaImages/>}></Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
