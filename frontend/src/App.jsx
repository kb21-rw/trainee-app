import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import Login, {action as loginAction} from "./pages/Login"


export default function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/">
      <Route index element={<h1>Hello</h1>}/>
      <Route path="/login" element={<Login/>} action={loginAction}/>
    </Route>
  ))
  return (
  <RouterProvider router={router}/>
  )
}
