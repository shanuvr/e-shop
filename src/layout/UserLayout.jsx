import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

export default function UserLayout({ children }) {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}