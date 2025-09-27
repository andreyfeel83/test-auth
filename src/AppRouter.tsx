import {BrowserRouter, Route, Routes} from 'react-router';
import {LoginPage} from '@/components/LoginPage';
import {AuthKeyPage} from '@/components/AuthKeyPage';
import {Layout} from '@/components/Layout';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <LoginPage />
            </Layout>
          }
        />
        <Route
          path="/auth"
          element={
            <Layout showBackArrow>
              <AuthKeyPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
