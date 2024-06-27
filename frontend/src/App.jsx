import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Photos from "./pages/Photos"
import SinglePhoto from "./pages/SinglePhoto"
import CreatePhoto from "./pages/CreatePhoto"
import EditPhoto from "./pages/EditPhoto"
import DefaultLayout from "./layouts/DefaultLayout";
import { AuthProvider } from "./contexts/AuthContext";
import LogIn from "./pages/Login";
import PrivatePage from "./middleware/PrivatePage";

function App() {

  return (
    <>
      <BrowserRouter>

        <AuthProvider>

          <Routes>

            {/* Rotte Pubbliche */}
            <Route element={<DefaultLayout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<LogIn />} />
              <Route path="photos" element={<Photos />} />
              <Route path="/photos/:id" element={<SinglePhoto />} />
            </Route>

            {/* Rotte Private */}
            <Route element={
              <PrivatePage>
                <DefaultLayout />
              </PrivatePage>
            }>
              <Route path="/photos/create" element={<CreatePhoto />} />
              <Route path="/photos/:id/edit" element={<EditPhoto />} />
            </Route>

          </Routes>

        </AuthProvider>

      </BrowserRouter>
    </>
  )
}

export default App
