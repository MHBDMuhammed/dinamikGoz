import React, { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-md transition-colors duration-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              TÜBİTAK Göz Uyumu Projesi
            </Link>
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-slate-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none"
                aria-label="Menüyü Aç/Kapat"
              >
                {isMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row mt-4 md:mt-0 md:items-center`}>
            <Link href="/egitim" className="px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors">
              Eğitim
            </Link>
            <Link href="/demo" className="px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors">
              İnteraktif Demo
            </Link>
            <Link href="/test" className="px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors">
              Test
            </Link>
            <div className="hidden md:block ml-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 