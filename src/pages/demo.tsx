import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function Demo() {
  // Distance state (0 = yakın, 100 = uzak)
  const [distance, setDistance] = useState(50);
  
  // Referanslar
  const lensRef = useRef<HTMLDivElement>(null);
  const objectRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLDivElement>(null);
  
  // Mercek kalınlığı hesaplama (0-100 arası değeri yatay bombeleşme için dönüştürme)
  // Mesafe azaldıkça merceğin bombeliği artacak (yatay olarak)
  // Bombeleşme miktarı üçte birine düşürüldü
  const lensThickness = (100 - distance) * 0.01 + 1; // 1-2 arası değişim (bombeleşme azaltıldı)
  
  // Göz bebeği boyutu hesaplama (mesafe arttıkça göz bebeği küçülür)
  const pupilSize = distance * 0.5 + 20; // 20-70 arası değişim
  
  // Cisim pozisyonu hesaplama - hareket yönü değiştirildi
  // Mesafe arttıkça cisim sağa hareket edecek
  // Başlangıçta ortada olacak şekilde ayarlandı
  const objectPosition = distance * 6 - 300; // 50% için 0, 0% için -300, 100% için +300
  
  // Mesafe değiştiğinde stil güncelleme
  useEffect(() => {
    if (lensRef.current && objectRef.current && pupilRef.current) {
      // Mercek stil güncelleme - yatay bombeleşme
      lensRef.current.style.transform = `scaleX(${lensThickness})`;
      
      // Cisim stil güncelleme - ters yön
      objectRef.current.style.transform = `translateX(${objectPosition}px)`;
      
      // Göz bebeği stil güncelleme
      pupilRef.current.style.width = `${pupilSize}px`;
      pupilRef.current.style.height = `${pupilSize}px`;
    }
  }, [distance, lensThickness, objectPosition, pupilSize]);

  return (
    <>
      <Head>
        <title>İnteraktif Demo - Göz Uyumu</title>
        <meta name="description" content="Göz uyumunu interaktif olarak deneyimleyin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto py-12 max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            İnteraktif Akomodasyon Demosu
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            Cismin göze olan mesafesini değiştirerek göz merceğinin nasıl uyum sağladığını gözlemleyin.
          </p>
        </div>

        {/* Animasyon Alanı - Daha geniş kart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-10 mb-10 overflow-hidden">
          <div className="h-96 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-900 dark:to-blue-900/30 rounded-xl relative">
            
            {/* Göz ve Cisim Alanı */}
            <div className="absolute inset-0 flex items-center">
              
              {/* Göz Kesiti - Sol tarafa hizalandı, daha detaylı kesit */}
              <div className="relative h-80 w-80 ml-4 border-2 border-gray-300 dark:border-gray-600 rounded-full overflow-hidden" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'}}>
                {/* Göz dış çeperi - sklera */}
                <div className="absolute inset-0 border-8 border-black dark:border-gray-700 rounded-full"></div>
                
                {/* Göz içi - vitreus humor */}
                <div className="absolute inset-12 bg-blue-50/70 dark:bg-blue-900/40 rounded-full"></div>
                
                {/* Göz damarları */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute w-full h-full">
                    <div className="absolute top-1/4 right-1/3 w-28 h-1 bg-red-600 rounded-full" style={{transform: 'rotate(30deg)'}}></div>
                    <div className="absolute top-1/2 right-1/4 w-20 h-1 bg-red-600 rounded-full" style={{transform: 'rotate(-20deg)'}}></div>
                    <div className="absolute bottom-1/3 right-1/3 w-24 h-1 bg-red-600 rounded-full" style={{transform: 'rotate(15deg)'}}></div>
                  </div>
                </div>
                
                {/* Retina */}
                <div className="absolute right-20 inset-y-10 w-1 bg-red-400/60 dark:bg-red-600/60 rounded-full"></div>
                
                {/* İris ve Pupil Bölgesi */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center">
                  {/* İris */}
                  <div className="relative h-44 w-44 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800 opacity-60 rounded-full"></div>
                    
                    {/* Pupil */}
                    <div 
                      ref={pupilRef}
                      className="bg-black dark:bg-gray-900 rounded-full transition-all duration-300 ease-in-out"
                      style={{ width: `${pupilSize}px`, height: `${pupilSize}px` }}
                    ></div>
                  </div>
                </div>
                
                {/* Lens/Mercek - Gözün tam ortasına taşındı */}
                <div 
                  ref={lensRef}
                  className="absolute left-1/2 top-1 transform -translate-x-1/2 -translate-y-1/2 h-80 w-12 origin-center bg-yellow-100/80 dark:bg-yellow-700/60 rounded-full transition-transform duration-300 ease-in-out z-10"
                  style={{ transform: `scaleX(${lensThickness})` }}
                ></div>
                
                {/* Siliyer kaslar gösterimi */}
                <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2 h-48 flex flex-col justify-between">
                  <div className="w-8 h-1 bg-purple-400 dark:bg-purple-600 rounded-full"></div>
                  <div className="w-10 h-1 bg-purple-400 dark:bg-purple-600 rounded-full"></div>
                  <div className="w-8 h-1 bg-purple-400 dark:bg-purple-600 rounded-full"></div>
                </div>
                
                {/* Zonül lifleri */}
                <div className="absolute left-2/5 top-1/2 transform -translate-y-1/2 h-40 flex flex-col justify-between">
                  <div className="w-8 h-px bg-gray-400 dark:bg-gray-300"></div>
                  <div className="w-10 h-px bg-gray-400 dark:bg-gray-300"></div>
                  <div className="w-8 h-px bg-gray-400 dark:bg-gray-300"></div>
                </div>
                
                {/* Açıklayıcı etiketler */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Göz Kesiti
                </div>
                <div className="absolute top-1/3 left-1/2 transform -translate-y-full bg-yellow-600 dark:bg-yellow-700 text-white px-2 py-0.5 rounded text-xs">
                  Mercek
                </div>
                <div className="absolute top-1/2 right-16 transform -translate-y-full bg-red-600 dark:bg-red-700 text-white px-2 py-0.5 rounded text-xs">
                  Retina
                </div>
                <div className="absolute bottom-1/3 left-1/3 bg-purple-600 dark:bg-purple-700 text-white px-2 py-0.5 rounded text-xs">
                  Siliyer Kaslar
                </div>
                
                
              </div>
              
              {/* Cisim (ağaç) - Mesafe değiştiğinde hareket edecek */}
              <div 
                ref={objectRef}
                className="absolute right-1/3 transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(${objectPosition}px)` }}
              >
                <div className="relative transform hover:scale-110 transition-transform">
                  <span className="text-7xl filter drop-shadow-md" role="img" aria-label="ağaç">🌳</span>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-10 h-1.5 bg-black/20 dark:bg-black/40 rounded-full blur-sm"></div>
                </div>
                
                
                {/* Mesafe göstergesi */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-teal-600 dark:bg-teal-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {distance < 20 ? 'Çok Yakın' : distance < 40 ? 'Yakın' : distance < 60 ? 'Orta Mesafe' : distance < 80 ? 'Uzak' : 'Çok Uzak'}
                </div>
              </div>
            </div>
            
            {/* Mesafe çizgisi - alt tarafta */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gray-300 dark:bg-gray-600 flex items-center justify-between">
              <div className="absolute inset-0">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-300"
                  style={{ width: `${distance}%` }}
                ></div>
              </div>
              <div className="-mt-1 w-1 h-3 bg-gray-400 dark:bg-gray-500"></div>
              <div className="-mt-1 w-1 h-3 bg-gray-400 dark:bg-gray-500"></div>
              <div className="-mt-1 w-1 h-3 bg-gray-400 dark:bg-gray-500"></div>
              <div className="-mt-1 w-1 h-3 bg-gray-400 dark:bg-gray-500"></div>
              <div className="-mt-1 w-1 h-3 bg-gray-400 dark:bg-gray-500"></div>
            </div>
          </div>
          
          {/* Kontrol Alanı */}
          <div className="pt-4">
            <div className="mb-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-lg font-medium text-blue-600 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <span>Yakın</span>
              </div>
              <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/40 dark:to-teal-900/40 text-slate-700 dark:text-slate-300 font-medium shadow-sm border border-blue-100 dark:border-blue-800">
                Mesafe: {distance}%
              </div>
              <div className="flex items-center gap-2 text-lg font-medium text-teal-600 dark:text-teal-400">
                <span>Uzak</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
            </div>
            
            <div className="relative py-4">
              <input
                type="range"
                min="0"
                max="100"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-blue-200 to-teal-200 dark:from-blue-800 dark:to-teal-800 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-opacity-50"
              />
              
              {/* Tick marks */}
              <div className="absolute bottom-0 left-0 w-full flex justify-between px-1 text-xs text-slate-500 dark:text-slate-400">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bilgi Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
              <span>Yakın Mesafeye Bakış</span>
            </h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                </div>
                <div>Siliyer kaslar kasılır</div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                </div>
                <div>Zonül lifleri gevşer</div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                </div>
                <div>Mercek kalınlaşır</div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                </div>
                <div>Görüntü retina üzerinde odaklanır</div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-teal-700 dark:text-teal-400 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Uzak Mesafeye Bakış</span>
            </h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                </div>
                <div>Siliyer kaslar gevşer</div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                </div>
                <div>Zonül lifleri gerilir</div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                </div>
                <div>Mercek incelir</div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                </div>
                <div>Görüntü retina üzerinde odaklanır</div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Açıklama */}
        <div className="mt-10 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-slate-700">
          <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Akomodasyon Mekanizması</h2>
          <p className="mb-4 text-slate-700 dark:text-slate-300">
            Bu interaktif demo, göz merceğinin akomodasyon mekanizmasını basitleştirilmiş bir şekilde göstermektedir:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-100 dark:border-blue-800">
              <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3">Yakın Mesafeye Bakış</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Yakındaki bir nesneye odaklanırken, gözün siliyer kasları kasılır. Bu kasılma, merceği yerinde tutan zonül liflerinin gevşemesine neden olur. 
                Mercek kendi elastikiyeti sayesinde daha küresel (kalın) bir şekil alır ve kırıcılık gücü artar.
              </p>
            </div>
            
            <div className="bg-teal-50 dark:bg-teal-900/20 p-5 rounded-lg border border-teal-100 dark:border-teal-800">
              <h3 className="font-bold text-teal-800 dark:text-teal-300 mb-3">Uzak Mesafeye Bakış</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Uzaktaki bir nesneye odaklanırken, gözün siliyer kasları gevşer. Bu gevşeme, zonül liflerinin gerilmesine ve merceğe baskı uygulamasına neden olur. 
                Mercek düzleşir (incelir) ve kırıcılık gücü azalır.
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-yellow-800 dark:text-yellow-200">
            <div className="flex gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
              <p>
                <strong>Bilgi: </strong>
                Gerçekte bu mekanizma çok daha karmaşıktır ve görüntünün retina üzerinde odaklanması için kornea kırıcılığı, göz sıvıları 
                ve gözün anatomik özellikleri gibi birçok faktör rol oynar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 