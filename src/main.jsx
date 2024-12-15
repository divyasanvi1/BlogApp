import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout } from './components/index.js'
import Login from './pages/Login.jsx'
import SignUp from "./pages/SignUp.jsx"
import AddPost from "./pages/AddPost.jsx"
import AllPost from "./pages/AllPost.jsx"
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import Forget from "./components/password/Forget.jsx"
import Recover from './components/password/Recover.jsx'



const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path: "/login",
        element: (
            <AuthLayout authentication={false}>
                <Login />
            </AuthLayout>
        ),
    },
    {
        path: "/signup",
        element: (
            <AuthLayout authentication={false}>
                <SignUp />
            </AuthLayout>
        ),
    },
    {
        path: "/all-posts",
        element: (
            <AuthLayout authentication>
                {" "}
                <AllPost />
            </AuthLayout>
        ),
    },
    {
        path: "/add-post",
        element: (
            <AuthLayout authentication>
                {" "}
                <AddPost />
            </AuthLayout>
        ),
    },
    {
        path: "/edit-post/:slug",
        element: (
            <AuthLayout authentication>
                {" "}
                <EditPost />
            </AuthLayout>
        ),
    },
    {
        path: "/post/:slug",
        element: <Post />,
    },
    {
        path: "/forget", // Add Forget Password Route
        element: (
          <AuthLayout authentication={false}>
            <Forget />
          </AuthLayout>
        ),
      },
      {
        path: "/resetpassword", // Add Reset Password Route
        element: (
          <AuthLayout authentication={false}>
            <Recover />
          </AuthLayout>
        ),
      },
    ],

  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
