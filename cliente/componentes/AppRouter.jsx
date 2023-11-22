import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Link,
    Route,
    Outlet,
    Routes,
  } from "react-router-dom";

  import "../AppRouter.css"

  const router = createBrowserRouter([
    { path : "/", Component: Layout },
    { path: "*", Component: Root }
  ]);

  export default function AppRouter() {
    return <RouterProvider router={router} />;
  }

  function Root() {
    return (
      <Routes>
        <Route path="*" element={<NoExistePagina />} />
        <Route element={<Layout />}>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/blog" element={<BlogApp />} />
          <Route exact path="/users" element={<UserApp />} />
        </Route>
      </Routes>
    );
  }

  function NoExistePagina() {
    return(
        <h1>Error, la página no existe</h1>
    )
  }

  function Layout() {
    return (
      <>
        <div className="container">
          <div className="header">
            <Link to="/home">Inicio</Link>
            <div className="nav">
              <NavMenu />
            </div>
            <div>
            </div>
          </div>
          <div className="main">
            <Outlet />
          </div>
          <div className="footer" align="center">
            ©️ me 2023
          </div>
        </div>

        {/* <header>
          
          <NavMenu />
        </header>
        <main> */}
          {/* 2️⃣ Render the app routes via the Layout Outlet */}
          {/* <Outlet />
        </main>
        <footer>©️ me 2023</footer> */}
      </>
    );
  }

  function NavMenu() {
    return(
        <nav>
          <Link to="/blog">BLOG</Link> <Link to="users">USERS</Link>
        </nav>
    )
  }
  
  function Home() {
    return (
      <>
        <h1>Welcome!</h1>
        <p>
          Check out the <Link to="/blog">blog</Link> or the{" "}
          <Link to="users">users</Link> section
        </p>
      </>
    );
  }
  
  function BlogApp() {
    return (
      <Routes>
        <Route index element={<h1>Blog Index</h1>} />
        <Route path="posts" element={<h1>Blog Posts</h1>} />
      </Routes>
    );
  }
  
  function UserApp() {
    return (
      <Routes>
        <Route index element={<h1>Users Index</h1>} />
      </Routes>
    );
  }