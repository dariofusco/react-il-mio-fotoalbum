import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Photos from "./pages/Photos"
import SinglePhoto from "./pages/SinglePhoto"
import CreatePhoto from "./pages/CreatePhoto"
import EditPhoto from "./pages/EditPhoto"
import DefaultLayout from "./layouts/DefaultLayout";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="photos" element={<Photos />} />
            <Route path="/photos/:id" element={<SinglePhoto />} />
            <Route path="/photos/create" element={<CreatePhoto />} />
            <Route path="/photos/:id/edit" element={<EditPhoto />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
