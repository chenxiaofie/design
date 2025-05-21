import React from 'react';
import Header from '@/layouts/components/Header';
import Footer from '@/layouts/components/Footer';
import { Outlet } from 'react-router-dom';

const DefaultLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default DefaultLayout;
