import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, App as AntdApp } from 'antd';
import { Routers } from './routers/routers.tsx';
import { Provider } from 'react-redux';
import { store } from './stores/store.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalModalDelete } from './components/Global/ModalDelete.tsx';
import { GlobalAlert } from './components/Global/Alert.tsx';
createRoot(document.getElementById('root')!).render(
  <StyleProvider hashPriority="high">
    <ConfigProvider theme={{ cssVar: { key: 'app' }, hashed: false }}>
      <AntdApp>
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
          <GlobalAlert />
          <GlobalModalDelete />
        </Provider>
      </AntdApp>
    </ConfigProvider>
  </StyleProvider>,
);
