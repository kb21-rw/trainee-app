import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import Error from "./components/Error"
import Layout from "./components/Layout"
import NotFound from "./pages/NotFound"
import Login, {action as loginAction} from "./pages/Login"

export default function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route >
    <Route path="/" element={<Layout/>} errorElement={<Error/>}>
<Route index element={<h1>Overview page</h1>}/>
<Route path="/forms" element={<h1>Forms page</h1>}/>
<Route path="/trainees" element={<h1>Trainees page</h1>}/>
<Route path="/administer-coach" element={<h1>Administer coach page</h1>}/>
<Route path="/profile-settings" element={<h1>profile settings page</h1>}/>
    </Route>
    <Route path="/login" element={<Login/>} action={loginAction}/>
    <Route path="*" element={<NotFound/>}/>
    </Route>
  ))
  return (
  <RouterProvider router={router}/>
  )
}
