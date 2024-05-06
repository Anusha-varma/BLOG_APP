import './App.css';
import RootLayout from './Components/RootLayout';
//import Form from "./Form";
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import UserProfile from './Components/UserProfile';
import AuthorProfile from './Components/AuthorProfile';
function App() {
  //create browser router obj
  let router= createBrowserRouter([
    {
      path:'',
      element:<RootLayout />,
      children:[
        { path:'',
          element:<Home />
        },
        {
          path:"register",
          element:<Register />
        },
        {
          path:"login",
          element:<Login />
        },
        {
          path:"user-profile",
          element:<UserProfile />
        },
        {
          path:"author-profile",
          element:<AuthorProfile />
        },
        {
          path:"signout",
          element:<Login />
        }
      ]
    }
  ])
  return (
    <div>
     {/* provide BrowserRouter obj to application*/}
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
