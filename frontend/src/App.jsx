import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
export default function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/">
      <Route index element={<h1>Hello</h1>}/>
    </Route>
  ))
  return (
  <RouterProvider router={router}/>
  )
}
