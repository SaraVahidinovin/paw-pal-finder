import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import AllDogsPage from "./pages/AllDogsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddDogPage from "./pages/AddDogPage";
import MyDogsPage from "./pages/MydogsPage";
import FavoritesPage from "./pages/FavoritesPage";
import DogInfoPage from "./pages/DogInfoPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import { dogsLoader } from "./loader/loader";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
           <Route index element={<HomePage />} />
           <Route path='alldogs' element={<AllDogsPage />} loader={dogsLoader}/>
           <Route path='login' element={<LoginPage />}/>
           <Route path='register' element={<RegisterPage />}/>
           <Route path='adddog' element={<AddDogPage mode= "create"/>}/>
           <Route path='editDog/:id' element={<AddDogPage mode= "edit"/>}/>
           <Route path='mydogs' element={<MyDogsPage/>} loader={dogsLoader}/>
           <Route path='favorites' element={<FavoritesPage />} />
           <Route path='dogInfo/:chipNumber' element={<DogInfoPage />} />
           <Route path='about' element={<AboutPage />} />
           <Route path='contact' element={<ContactPage />} />
        </Route>
    )
);
