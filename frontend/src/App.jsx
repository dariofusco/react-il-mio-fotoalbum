import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Photos from "./pages/Photos";
import SinglePhoto from "./pages/SinglePhoto";
import CreatePhoto from "./pages/CreatePhoto";
import EditPhoto from "./pages/EditPhoto";
import DefaultLayout from "./layouts/DefaultLayout";
import { AuthProvider } from "./contexts/AuthContext";
import LogIn from "./pages/Login";
import PrivatePage from "./middleware/PrivatePage";
import Categories from "./pages/Categories";
import CreateCategory from "./pages/CreateCategory";
import Contacts from "./pages/Contacts";
import Messages from "./pages/Messages";

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
              <Route path="categories" element={<Categories />} />
              <Route path="/categories/create" element={<CreateCategory />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="messages" element={<Messages />} />
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
