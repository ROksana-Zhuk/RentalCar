import { lazy, Suspense } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.module.css'
import Layout from './components/Layout/Layout.jsx';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage.jsx'));
const DetailsPage = lazy(() => import('./pages/DetailsPage/DetailsPage.jsx'));

function App() {


  return (
    <>
    <Layout>
        <Suspense fallback={<div>Loading page...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:id" element={<DetailsPage/>} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  )
}

export default App
