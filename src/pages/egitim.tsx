import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// TypeScript için tip tanımlamaları
type ListItem = {
  title: string;
  desc: string;
};

type EyeDefectItem = ListItem & {
  solution: string;
};

type EducationStep = {
  id: number;
  title: string;
  content: string;
  image: string;
  listItems?: Array<ListItem | EyeDefectItem>;
  description?: string;
  summary?: string; // Yeni: Her adımın kısa özeti
};

// Eğitim adımları verileri
const educationSteps: EducationStep[] = [
  {
    id: 1,
    title: "Göz Yapısı ve Temel Bileşenler",
    summary: "Gözün temel yapısını ve görme sürecindeki önemli bileşenleri öğrenin.",
    content: "Göz, vücudumuzun en karmaşık organlarından biridir. Görme sürecinde birçok yapı birlikte çalışır:\n\nKornea: Işığın göze ilk girdiği şeffaf tabaka\nGöz bebeği (pupil): Işık miktarını ayarlayan açıklık\nİris: Göz bebeğini çevreleyen renkli kısım\nMercek: Işığı odaklayan esnek yapı\nRetina: Görüntünün oluştuğu ışığa duyarlı tabaka",
    image: "/res.png",
    description: "Gözün yapısını anlamak, akomodasyon mekanizmasını kavramak için temel oluşturur."
  },
  {
    id: 2,
    title: "Akomodasyon Mekanizması",
    summary: "Gözün farklı mesafelerdeki nesneleri net görebilmek için nasıl uyum sağladığını keşfedin.",
    content: "Akomodasyon, gözün farklı uzaklıktaki nesneleri net görebilmek için odak uzaklığını değiştirme yeteneğidir.\n\nBu süreçte:\n\n• Siliyer kaslar kasılır veya gevşer\n• Mercek kalınlaşır veya incelir\n• Odak uzaklığı değişir\n\nYakındaki nesneler için mercek kalınlaşır, uzaktaki nesneler için incelir.",
    image: "/res.png",
    description: "Akomodasyon, günlük hayatımızda sürekli gerçekleşen dinamik bir süreçtir."
  },
  {
    id: 3,
    title: "Yakını ve Uzağı Görme Mekanizması",
    summary: "Gözün yakın ve uzak nesnelere odaklanma sürecini anlayın.",
    content: "Göz, yakın ve uzak nesneleri görmek için farklı mekanizmalar kullanır:\n\nYakını Görme:\n• Siliyer kaslar kasılır\n• Mercek bombeleşir\n• Odak uzaklığı kısalır\n\nUzağı Görme:\n• Siliyer kaslar gevşer\n• Mercek düzleşir\n• Odak uzaklığı artar",
    image: "/res.png",
    description: "Bu mekanizmaların düzgün çalışması, net görme için hayati önem taşır."
  },
  {
    id: 4,
    title: "Göz Kusurları ve Çözümleri",
    summary: "Yaygın göz kusurlarını ve bunların modern çözümlerini öğrenin.",
    content: "Göz kusurları, görme kalitesini etkileyen yaygın sorunlardır. Her kusur için özel çözümler mevcuttur.",
    image: "/res.png",
    listItems: [
      {
        title: "Miyopi (Yakını görme)",
        desc: "Uzaktaki nesneler net görülemez. Görüntü retinanın önünde oluşur.",
        solution: "Kalın kenarlı (dağıtıcı) mercek kullanımı"
      },
      {
        title: "Hipermetropi (Uzağı görme)",
        desc: "Yakındaki nesneler net görülemez. Görüntü retinanın arkasında oluşur.",
        solution: "İnce kenarlı (toplayıcı) mercek kullanımı"
      },
      {
        title: "Astigmatizm",
        desc: "Korneanın düzensiz eğriliği nedeniyle görüntü bulanık olur.",
        solution: "Silindirik mercek kullanımı"
      },
      {
        title: "Presbiyopi (Yaşa bağlı)",
        desc: "Yaşla birlikte merceğin esnekliğini kaybetmesi sonucu yakını görememe.",
        solution: "Yakın okuma gözlüğü veya progresif lens kullanımı"
      }
    ],
    description: "Modern teknoloji sayesinde göz kusurları başarıyla tedavi edilebilmektedir."
  }
];

export default function Egitim() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < educationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
    window.scrollTo(0, 0);
  };

  // Aktif adım
  const currentStepData = educationSteps[currentStep];

  // İçeriğin "solution" özelliğine sahip olup olmadığını kontrol et
  const hasSolution = (item: ListItem | EyeDefectItem): item is EyeDefectItem => {
    return 'solution' in item;
  };

  return (
    <>
      <Head>
        <title>Eğitim - Dinamik Göz</title>
        <meta name="description" content="Göz uyumu (akomodasyon) mekanizmasını adım adım öğrenin." />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8">
        <div className="container mx-auto px-4">
          {/* İlerleme çubuğu */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                Eğitim İlerlemesi
              </h2>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {currentStep + 1} / {educationSteps.length}
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / educationSteps.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="lg:flex lg:gap-8">
            {/* Yan menü */}
            <div className="lg:w-1/4 mb-8 lg:mb-0">
              <div className="sticky top-8 space-y-6">
                {/* Adımlar listesi */}
                <nav className="bg-white dark:bg-slate-800 rounded-xl shadow border border-gray-100 dark:border-slate-700 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                    <h2 className="font-semibold text-slate-900 dark:text-white">Eğitim Adımları</h2>
                  </div>
                  <ul className="divide-y divide-gray-100 dark:divide-slate-700">
                    {educationSteps.map((step, index) => (
                      <li key={step.id}>
                        <button
                          onClick={() => goToStep(index)}
                          className={`w-full text-left p-4 flex items-start gap-4 transition-colors ${
                            currentStep === index
                              ? 'bg-blue-50 dark:bg-blue-900/20'
                              : 'hover:bg-gray-50 dark:hover:bg-slate-700/50'
                          }`}
                        >
                          <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                            currentStep === index
                              ? 'bg-blue-600 text-white'
                              : index < currentStep
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                          }`}>
                            {index < currentStep ? '✓' : index + 1}
                          </span>
                          <div>
                            <h3 className={`font-medium ${
                              currentStep === index
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-slate-900 dark:text-white'
                            }`}>
                              {step.title}
                            </h3>
                            {step.summary && (
                              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                {step.summary}
                              </p>
                            )}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Demo bağlantısı */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-xl shadow-sm border border-blue-100 dark:border-blue-800/50">
                  <h3 className="text-base font-semibold mb-2 text-blue-700 dark:text-blue-400">İnteraktif Demo</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                    Akomodasyon mekanizmasını canlı olarak görmek ister misiniz?
                  </p>
                  <Link 
                    href="/demo"
                    className="block w-full text-center py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    Demoya Git
                  </Link>
                </div>
              </div>
            </div>

            {/* Ana içerik alanı */}
            <div className="lg:w-3/4">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow border border-gray-100 dark:border-slate-700 overflow-hidden">
                {/* Resim Bölümü */}
                <div className="w-full h-64 md:h-96 relative bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-slate-700">
                  <Image 
                    src={currentStepData.image}
                    alt={currentStepData.title}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="p-4"
                    priority
                  />
                </div>

                {/* İçerik Başlığı */}
                <div className="p-6 md:p-8 border-b border-gray-100 dark:border-slate-700">
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {currentStepData.title}
                  </h2>
                  {currentStepData.summary && (
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                      {currentStepData.summary}
                    </p>
                  )}
                </div>

                {/* İçerik */}
                <div className="p-6 md:p-8">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {/* Metin içeriği */}
                    {currentStepData.content && (
                      <div className="mb-8 space-y-6">
                        {currentStepData.content.split('\n\n').map((paragraph, idx) => (
                          <div key={idx} className="space-y-4">
                            {paragraph.startsWith('•') ? (
                              <ul className="list-disc list-inside space-y-2">
                                {paragraph.split('\n').map((item, i) => (
                                  <li key={i} className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed pl-2">
                                    {item.replace('• ', '')}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                                {paragraph}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Liste ögeleri */}
                    {currentStepData.listItems && (
                      <div className="grid md:grid-cols-2 gap-4">
                        {currentStepData.listItems.map((item, idx) => (
                          <div key={idx} className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-6 border border-gray-100 dark:border-slate-700">
                            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">{item.title}</h3>
                            <p className="text-slate-700 dark:text-slate-300 mb-4 text-lg">{item.desc}</p>
                            {hasSolution(item) && (
                              <div className="flex items-start gap-2 text-green-600 dark:text-green-400">
                                <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="font-medium text-lg">
                                  Çözüm: {item.solution}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Ek açıklama */}
                    {currentStepData.description && (
                      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50">
                        <p className="text-slate-700 dark:text-slate-300 italic text-lg">
                          {currentStepData.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigasyon butonları */}
                <div className="p-6 md:p-8 border-t border-gray-100 dark:border-slate-700 flex justify-between">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`py-3 px-6 rounded-lg flex items-center gap-2 transition-colors ${
                      currentStep === 0 
                        ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500' 
                        : 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-medium">Önceki</span>
                  </button>
                  
                  {currentStep === educationSteps.length - 1 ? (
                    <Link 
                      href="/demo"
                      className="py-3 px-6 rounded-lg flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                    >
                      <span>İnteraktif Demo'ya Git</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  ) : (
                    <button
                      onClick={nextStep}
                      className="py-3 px-6 rounded-lg flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                    >
                      <span>Sonraki</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              
              {/* Son içerik */}
              {currentStep === educationSteps.length - 1 && (
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-xl shadow-sm border border-blue-100 dark:border-blue-800/50">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
                        Tebrikler, eğitimi tamamladınız!
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300">
                        Şimdi öğrendiklerinizi interaktif demo ile pekiştirebilirsiniz.
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <Link 
                        href="/demo"
                        className="block py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors text-center whitespace-nowrap"
                      >
                        İnteraktif Demo'ya Git
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}