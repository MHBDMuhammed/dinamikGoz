import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeToggle from './ThemeToggle';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Sayfa kaydırıldığında header'ın arka planını değiştir
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Aktif sayfayı belirle
  const isActivePage = (path: string) => {
    return router.pathname === path;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
      {/* Header - dinamik şeffaflık ve sabit pozisyon */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-md py-2' 
            : 'bg-white dark:bg-slate-900 py-4'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 hover:scale-105 transition-transform">
            <span className="text-3xl">👁️</span>
            <span className="hidden sm:inline">Dinamik Göz</span>
            <span className="sm:hidden">Dinamik Göz</span>
          </Link>
          
          {/* Masaüstü menü - sağa hizalanmış */}
          <div className="hidden md:flex items-center space-x-6 ml-auto">
            <nav className="flex space-x-6">
              <Link 
                href="/" 
                className={`py-2 px-1 transition-colors border-b-2 ${
                  isActivePage('/') 
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                    : 'border-transparent text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400'
                }`}
              >
                Ana Sayfa
              </Link>
              <Link 
                href="/egitim" 
                className={`py-2 px-1 transition-colors border-b-2 ${
                  isActivePage('/egitim') 
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                    : 'border-transparent text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400'
                }`}
              >
                Eğitim
              </Link>
              <Link 
                href="/demo" 
                className={`py-2 px-1 transition-colors border-b-2 ${
                  isActivePage('/demo') 
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                    : 'border-transparent text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400'
                }`}
              >
                Demo
              </Link>
              <Link 
                href="/test" 
                className={`py-2 px-1 transition-colors border-b-2 ${
                  isActivePage('/test') 
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                    : 'border-transparent text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400'
                }`}
              >
                Test
              </Link>
              <Link 
                href="/iletisim" 
                className={`py-2 px-1 transition-colors border-b-2 ${
                  isActivePage('/iletisim') 
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                    : 'border-transparent text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400'
                }`}
              >
                İletişim
              </Link>
            </nav>
            
            <ThemeToggle />
          </div>
          
          {/* Mobil görünüm için menü butonu */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button 
              className="ml-4 hover:bg-gray-100 dark:hover:bg-slate-800 p-2 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menüyü aç/kapat"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-700 dark:text-slate-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-700 dark:text-slate-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobil menü */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 shadow-lg animate-fadeIn">
            <div className="container mx-auto px-4 py-3">
              <nav className="flex flex-col space-y-3">
                <Link 
                  href="/" 
                  className={`py-2 px-4 rounded-lg transition-colors ${
                    isActivePage('/') 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Ana Sayfa
                </Link>
                <Link 
                  href="/egitim" 
                  className={`py-2 px-4 rounded-lg transition-colors ${
                    isActivePage('/egitim') 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Eğitim
                </Link>
                <Link 
                  href="/demo" 
                  className={`py-2 px-4 rounded-lg transition-colors ${
                    isActivePage('/demo') 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Demo
                </Link>
                <Link 
                  href="/test" 
                  className={`py-2 px-4 rounded-lg transition-colors ${
                    isActivePage('/test') 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Test
                </Link>
                <Link 
                  href="/iletisim" 
                  className={`py-2 px-4 rounded-lg transition-colors ${
                    isActivePage('/iletisim') 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  İletişim
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col bg-white dark:bg-slate-900">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 shadow-inner py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-slate-600 dark:text-slate-400">
                © {new Date().getFullYear()} Dinamik Göz
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500">
                Açık Kaynak Kodlu Eğitim Projesi
              </p>
            </div>
            <div className="flex gap-6 items-center">
              <a 
                href="https://github.com/MHBDMuhammed/dinamikGoz" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" clipRule="evenodd" />
                </svg>
                <span>GitHub</span>
              </a>
              <Link href="/iletisim" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                İletişim
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 