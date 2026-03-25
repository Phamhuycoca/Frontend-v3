import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import { Routers } from './routers/routers.tsx';
import { Provider } from 'react-redux';
import { store } from './stores/store.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyleProvider hashPriority="high">
      <ConfigProvider theme={{ cssVar: { key: 'app' }, hashed: false }}>
        <Provider store={store}>
          <Router>
            <Routes>
              {Routers.map((route) => {
                if (route.children) {
                  return (
                    <Route key={route.path} path={route.path} element={route.element}>
                      {route.children.map((childRoute) => (
                        <Route
                          key={childRoute.path}
                          path={childRoute.path}
                          element={childRoute.element}
                        />
                      ))}
                    </Route>
                  );
                }
                return <Route key={route.path} path={route.path} element={route.element} />;
              })}
            </Routes>
          </Router>
        </Provider>
      </ConfigProvider>
    </StyleProvider>
  </StrictMode>,
);
