import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { LoginButton } from '../Auth/LoginButton';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-3 sm:pt-12 flex">
        <div className="top-8 sm:top-12 lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-64 pt-8 sm:pt-12">
          <Sidebar />
        </div>
        <div className="flex-1 lg:pl-64">
          <main>
            <div className="fixed top-8 sm:top-12 right-4 z-50 mt-2">
              <LoginButton />
            </div>
            <div className="max-w-screen-sm mx-auto sm:px-4 sm:max-w-none sm:px-6 lg:px-8 py-4 sm:py-6">
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}