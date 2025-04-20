/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from 'next-themes';
import { Sun, Moon, ArrowRight, Check, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  return (
    <>
      <Head>
        <title>Dinamik Göz - Ana Sayfa</title>
        <meta name="description" content="Göz uyumu (akomodasyon) konusunu açıklayan ve simüle eden interaktif bir web sitesi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Ana Başlık Bölümü */}
      <section className="py-16 md:py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Dinamik Göz: Akomodasyon Simülasyonu
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-slate-700 dark:text-slate-300">
            Göz uyumu (akomodasyon) konusunu interaktif olarak keşfedin ve öğrenin. Bu açık kaynak projesi ile göz yapısı 
            ve akomodasyon mekanizmasının daha kolay anlaşılması amacı ile tasarlanmıştır. Farklı mesafelerdeki nesnelere odaklanırken
            gözümüzün nasıl çalıştığını simülasyon ve animasyonlarla keşfedin.
          </p>
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-12 relative">
            <div className="absolute inset-0 rounded-full border-8 border-blue-500 dark:border-blue-400 animate-pulse-slow"></div>
            <div className="absolute inset-6 sm:inset-8 rounded-full bg-teal-500 dark:bg-teal-400"></div>
            <div className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl">👁️</div>
            
            {/* Dekoratif elemanlar */}
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-blue-400/20 dark:bg-blue-600/20 animate-float"></div>
            <div className="absolute -bottom-6 -right-6 w-10 h-10 rounded-full bg-teal-400/20 dark:bg-teal-600/20 animate-float-delay"></div>
          </div>
        </div>
      </section>
      
      {/* Yönlendirme Kartları */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* Eğitim Kartı */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-slate-700 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-xl mb-6 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-white">Eğitim</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 h-24">
                Göz yapısı, akomodasyon mekanizması ve görme kusurları hakkında adım adım detaylı bilgiler edinmek için eğitim bölümünü keşfedin.
              </p>
              <Link href="/egitim" className="block text-center w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform group-hover:scale-[1.02]">
                Eğitime Başla
              </Link>
            </div>
            
            {/* İnteraktif Demo Kartı */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-slate-700 group">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900 dark:to-teal-800 rounded-xl mb-6 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-white">İnteraktif Demo</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 h-24">
                Göz uyumunu gerçek zamanlı olarak simüle eden interaktif demo ile göz merceğinin farklı mesafelere nasıl uyum sağladığını keşfedin.
              </p>
              <Link href="/demo" className="block text-center w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform group-hover:scale-[1.02]">
                Demoya Git
              </Link>
            </div>
            
            {/* Test Kartı */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-slate-700 group">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 rounded-xl mb-6 flex items-center justify-center text-yellow-600 dark:text-yellow-400 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-white">Test</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 h-24">
                Öğrendiklerinizi sınamak için farklı zorluk seviyelerindeki testlerle bilginizi ölçün ve kavramlarınızı pekiştirin.
              </p>
              <Link href="/test" className="block text-center w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform group-hover:scale-[1.02]">
                Teste Başla
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Proje Hakkında Bölümü */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700 transform transition-transform hover:scale-[1.01]">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white">Proje Hakkında</h2>
                <p className="mb-4 text-slate-700 dark:text-slate-300">
                  Dinamik Göz, göz uyumu (akomodasyon) konusunu interaktif bir şekilde anlatmak
                  ve simüle etmek amacıyla geliştirilmiş açık kaynak bir eğitim platformudur.
                </p>
                <p className="mb-6 text-slate-700 dark:text-slate-300">
                  Web sitemiz, öğrencilerin ve göz sağlığına ilgi duyan herkesin göz yapısını ve 
                  akomodasyon mekanizmasını anlamasına yardımcı olmak için tasarlanmıştır.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="https://github.com/MHBDMuhammed/dinamikGoz" target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-blue-200 dark:border-slate-600 rounded-full text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors hover:border-blue-300 dark:hover:border-blue-500 transform hover:scale-105">
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                      GitHub Kodları
                    </span>
                  </Link>
                  <Link href="/iletisim" className="px-6 py-2 border border-blue-200 dark:border-slate-600 rounded-full text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors hover:border-blue-300 dark:hover:border-blue-500 transform hover:scale-105">
                    <span className="flex items-center gap-2">
                    <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                      İletişim
                    </span>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center p-12 relative overflow-hidden group">
                {/* Animasyonlu arka plan desenleri */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full filter blur-3xl animate-blob"></div>
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
                </div>
                
                <div className="relative text-white text-center z-10">
                  <h3 className="text-2xl font-bold mb-4">Açık Kaynak</h3>
                  <p className="mb-6 max-w-xs mx-auto">
                    Bu proje GitHub'da açık kaynak olarak geliştirilmektedir. 
                    Siz de katkıda bulunabilirsiniz.
                  </p>
                  <div className="inline-block p-4 bg-white bg-opacity-20 rounded-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CSS Keyframes ve Animasyonlar için */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        
        @keyframes pulse-slow {
          0% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 0.6; transform: scale(1); }
        }
        
        @keyframes blob {
          0% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.1) translate(20px, -20px); }
          66% { transform: scale(0.9) translate(-20px, 20px); }
          100% { transform: scale(1) translate(0, 0); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float 3s ease-in-out 1.5s infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </>
  );
}
