import { RouterProvider, createHashRouter } from 'react-router-dom';
import MainInterface from '@/pages/mainInterface';
import GameLibrary from '@/pages/game';
import HomePage from '@/pages/home';
import CDKPage from '@/pages/vipCenter/cdkPage';
import VipCenter from '@/pages/vipCenter';
import UserInfoPage from '@/pages/userInfo';
import GameList from '@/pages/game/gameList';
import KeyModification from '@/pages/game/detail';

const routers = createHashRouter([
  {
    path: '/',
    element: <MainInterface />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'game',
        element: <GameLibrary />,
        children: [
          {
            path: '',
            element: <GameList />,
          },
          {
            path: ':id',
            element: <KeyModification />,
          },
        ],
      },
      {
        path: 'vipCenter',
        children: [
          {
            path: '',
            element: <VipCenter />,
          },
          {
            path: 'cdk',
            element: <CDKPage />,
          },
        ],
      },
      {
        path: 'user',
        element: <UserInfoPage />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={routers} />;
};

export default Router;
