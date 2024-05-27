import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const pages = import.meta.glob("./pages/**/*.jsx", { eager: true })

const routes = []
// On va boucler pour recuperer tout nos fichiers pour créer nos routes.
for (const path of Object.keys(pages)){
  const fileName = path.match(/\.\/pages\/(.*)\.jsx$/)?.[1]
  //On va filtrer les fichier qui ne respecte pas le format
  if(!fileName){
    continue
  }

  // On va normaliser nos routes
  const normalizedPath = fileName.includes("$")
    ? fileName.replace('$', ':')
    : fileName.replace(/\/Accueil/, "")

  routes.push({
    path: fileName === "Accueil" ? "/" : `${normalizedPath.toLowerCase()}`,
    Element: pages[path].default,
    loader: pages[path]?.loader,
    action: pages[path]?.action,
    ErrorBoundary: pages[path]?.ErrorBoundary
  })
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:
      routes.map(({Element, ErrorBoundary, ...rest}) => ({
        ...rest,
        element: <Element/>,
        ...(ErrorBoundary && { errorElement: <ErrorBoundary/> })
      }))
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)