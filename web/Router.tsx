import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const List = lazy(() => import('./pages/List'));

const routers = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/list',
    element: (
      <Suspense>
        <List />
      </Suspense>
    ),
  },
]);

const Router = () => {
  return <RouterProvider router={routers}></RouterProvider>;
};

export default Router;
