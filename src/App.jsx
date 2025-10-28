import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar'
import Home from './components/home'
import About from './components/about'
import Skillset from './components/skillset'
import Projects from './components/projects'
import Contact from './components/contact'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      )
    },
    {
      path: "/about",
      element: (
        <>
          <Navbar />
          <About/>
        </>
      )
    },
    {
      path: "/skillset",
      element: (
        <>
          <Navbar />
          <Skillset/>
        </>
      )
    },
    {
      path: "/projects",
      element: (
        <>
          <Navbar />
          <Projects/>
        </>
      )
    },
    {
      path: "/contact",
      element: (
        <>
          <Navbar />
          <Contact/>
        </>
      )
    },
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )

}
export default App
