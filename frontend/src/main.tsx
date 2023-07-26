import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './global.scss';

import { Home } from '@/pages/home';
import { Login } from '@/pages/login/login';
import { Signup } from '@/pages/signup/signup';
import { Dashboard } from '@/pages/dashboard';
import { handleRefresh } from '@/api/main/helpers/account';

const container = document.getElementById('app') as HTMLElement;

const root = createRoot(container);
const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/dashboard', element: <Dashboard /> },
]);

// essa função é chamada quando o usuário atualiza a página
// se o token estiver expirado ou inválido, então o token é removido
// e o usuário terá que fazer login novamente
// se o token for válido, então o token é atualizado
await handleRefresh();

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
