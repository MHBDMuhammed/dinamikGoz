import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Test soruları
const questionsData = {
  easy: [
    {
      q: "Göz merceğinin diğer adı nedir?",
      o: ["Kornea", "İris", "Lens", "Retina"],
      a: 2 // Lens (0-based index)
    },
    {
      q: "Gözün renkli kısmına ne ad verilir?",
      o: ["Pupil", "İris", "Kornea", "Lens"],
      a: 1 // İris
    },
    {
      q: "Akomodasyon nedir?",
      o: [
        "Gözün farklı mesafelere odaklanma yeteneği",
        "Gözün ışık miktarını ayarlama yeteneği",
        "Gözün renkleri algılama yeteneği",
        "Gözün hareketi"
      ],
      a: 0 // Gözün farklı mesafelere odaklanma yeteneği
    },
    {
      q: "Yakın nesnelere bakarken göz merceği nasıl değişir?",
      o: ["İncelir", "Kalınlaşır", "Değişmez", "Küçülür"],
      a: 1 // Kalınlaşır
    },
    {
      q: "Uzak nesnelere bakarken siliyer kaslar nasıl hareket eder?",
      o: ["Kasılır", "Gevşer", "Hareket etmez", "Büzülür"],
      a: 1 // Gevşer
    },
    {
      q: "Göz bebeğinin (pupil) diğer adı nedir?",
      o: ["İris", "Konjunktiva", "Sklera", "Lens"],
      a: 0 // İris
    },
    {
      q: "Göz kaç tabakadan oluşur?",
      o: ["2", "3", "4", "5"],
      a: 1 // 3
    }
  ],
  medium: [
    {
      q: "Göz merceğinin şeklini değiştiren kas yapısı hangisidir?",
      o: ["Orbicular kaslar", "Siliyer kaslar", "Ekstraoküler kaslar", "Tarsal kaslar"],
      a: 1 // Siliyer kaslar
    },
    {
      q: "Presbiyopi hangi durumu ifade eder?",
      o: [
        "Yaşla birlikte uzağı görme sorunu",
        "Yaşla birlikte yakını görme sorunu",
        "Astigmatizm",
        "Renk körlüğü"
      ],
      a: 1 // Yaşla birlikte yakını görme sorunu
    },
    {
      q: "Aşağıdakilerden hangisi merceği siliyer kaslara bağlar?",
      o: ["Zonül lifleri", "Koroid tabaka", "Sclera", "Vitreus", "Optik sinir"],
      a: 0 // Zonül lifleri
    },
    {
      q: "Yakına bakıldığında zonül liflerinde ne olur?",
      o: ["Gerilir", "Gevşer", "Elastikiyetini kaybeder", "Hiçbir değişiklik olmaz"],
      a: 1 // Gevşer
    },
    {
      q: "Miyopi (yakıngörürlük) hangi durumda ortaya çıkar?",
      o: [
        "Göz küresinin normalden uzun olması",
        "Göz küresinin normalden kısa olması",
        "Korneanın çok düz olması",
        "Lensin esnekliğini kaybetmesi"
      ],
      a: 0 // Göz küresinin normalden uzun olması
    },
    {
      q: "Göz odaklanması sırasında gözlerde meydana gelen içe dönme hareketine ne ad verilir?",
      o: ["Akomodasyon", "Konverjans", "Diverjans", "Retraksiyon"],
      a: 1 // Konverjans
    },
    {
      q: "Aşağıdakilerden hangisi görme kusuru değildir?",
      o: ["Miyopi", "Hipermetropi", "Konjunktivit", "Astigmatizm"],
      a: 2 // Konjunktivit (göz iltihabı)
    }
  ],
  hard: [
    {
      q: "Hipermetropide ışık ışınları retinaya göre nerede odaklanır?",
      o: ["Retina önünde", "Retina üzerinde", "Retina arkasında", "Kornea üzerinde"],
      a: 2 // Retina arkasında
    },
    {
      q: "Yaş ilerledikçe göz merceğinde meydana gelen ve akomodasyonu etkileyen değişiklik nedir?",
      o: [
        "Mercek saydamlığını kaybeder",
        "Mercek esnekliğini kaybeder",
        "Mercek küçülür",
        "Mercek rengi değişir"
      ],
      a: 1 // Mercek esnekliğini kaybeder
    },
    {
      q: "Astigmatizmde korneanın şekli nasıldır?",
      o: [
        "Düzenli küresel",
        "Düzenli silindirik",
        "Düzensiz eğrilik gösterir",
        "Tamamen düz"
      ],
      a: 2 // Düzensiz eğrilik gösterir
    },
    {
      q: "Parasempatik sinir sistemi aktivasyonu sırasında siliyer kaslarda ne olur?",
      o: [
        "Kasılır ve yakına odaklanma olur",
        "Gevşer ve uzağa odaklanma olur",
        "Kasılır ve uzağa odaklanma olur",
        "Gevşer ve yakına odaklanma olur"
      ],
      a: 0 // Kasılır ve yakına odaklanma olur
    },
    {
      q: "Akomodasyon refleksinin üç bileşeni nelerdir?",
      o: [
        "Konverjans, pupil büyümesi, lens kalınlaşması",
        "Konverjans, pupil küçülmesi, lens kalınlaşması",
        "Diverjans, pupil büyümesi, lens incelmesi",
        "Diverjans, pupil küçülmesi, lens kalınlaşması"
      ],
      a: 1 // Konverjans, pupil küçülmesi, lens kalınlaşması
    },
    {
      q: "Aşağıdakilerden hangisi, presbiyopi gelişimini en çok hızlandıran faktördür?",
      o: ["Yüksek tansiyon", "Glokom", "Diyabet", "Sigara kullanımı"],
      a: 2 // Diyabet
    },
    {
      q: "Akomodasyon sürecinde, uzaktan yakına odaklanırken aşağıdaki olaylardan hangisi gerçekleşmez?",
      o: [
        "Pupil daralır",
        "Siliyer kaslar kasılır",
        "Mercek kalınlaşır",
        "Zonül lifleri gerilir"
      ],
      a: 3 // Zonül lifleri gerilir (aksine gevşer)
    }
  ]
};

// Yanlış cevaplar için tip tanımı
interface IncorrectAnswer {
  question: string;
  userAnswer: string;
  correctAnswer: string;
}

// Skor için tip tanımı
interface ScoreType {
  correct: number;
  total: number;
  percentage: number;
  incorrectAnswers: IncorrectAnswer[];
}

export default function Test() {
  // State değişkenleri
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | null>(null);
  const [questions, setQuestions] = useState<Array<{q: string, o: string[], a: number}>>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState<ScoreType>({
    correct: 0,
    total: 0,
    percentage: 0,
    incorrectAnswers: []
  });
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');

  // Test başlatma fonksiyonu
  const startTest = (selectedDifficulty: "easy" | "medium" | "hard") => {
    const testQuestions = questionsData[selectedDifficulty];
    setDifficulty(selectedDifficulty);
    setQuestions(testQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    // Kullanıcı cevapları için her soru için null olan bir dizi oluştur
    setUserAnswers(Array(testQuestions.length).fill(null));
    setScore({
      correct: 0,
      total: 0,
      percentage: 0,
      incorrectAnswers: []
    });
    setShowResults(false);
    setError('');
  };
  
  // Cevap seçme
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    // Geçerli soruya verilen cevabı kaydet
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(updatedAnswers);
    setError('');
  };
  
  // Sonraki soru veya testi bitirme
  const handleNextQuestion = () => {
    // Cevap seçilmemişse hata göster
    if (selectedAnswer === null) {
      setError('Lütfen bir cevap seçin');
      return;
    }
    
    // Son soru değilse sonraki soruya geç
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Sonraki soru için önceden verilmiş cevap varsa, onu göster
      setSelectedAnswer(userAnswers[currentQuestionIndex + 1]);
    } else {
      // Test bitti, sonuçları hesapla
      calculateResults();
    }
  };
  
  // Önceki soruya dön
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Önceki sorunun cevabını göster
      setSelectedAnswer(userAnswers[currentQuestionIndex - 1]);
    }
  };
  
  // Testi yeniden başlat
  const restartTest = () => {
    setDifficulty(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setScore({
      correct: 0,
      total: 0,
      percentage: 0,
      incorrectAnswers: []
    });
    setShowResults(false);
    setError('');
  };

  // Test tamamlandığında sonuçları hesapla
  const calculateResults = () => {
    let correctCount = 0;
    let incorrectAnswers: IncorrectAnswer[] = [];

    questions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      
      // Cevap doğruysa doğru sayısını artır, değilse yanlış listesine ekle
      if (userAnswer === question.a) {
        correctCount++;
      } else if (userAnswer !== null) {
        incorrectAnswers.push({
          question: question.q,
          userAnswer: question.o[userAnswer],
          correctAnswer: question.o[question.a]
        });
      }
    });

    // Doğru yüzdesini hesapla
    const percentage = Math.round((correctCount / questions.length) * 100);
    
    setScore({
      correct: correctCount,
      total: questions.length,
      percentage: percentage,
      incorrectAnswers: incorrectAnswers
    });
    
    setShowResults(true);
  };

  // Sonuç ekranının render edilmesi
  const renderResults = () => {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800 dark:text-white">
          Test Sonuçlarınız
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
          {/* Skor grafiği */}
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="currentColor" 
                  className="text-gray-200 dark:text-slate-700"
                  strokeWidth="8"
                />
                
                {/* Progress circle with variable stroke-dasharray */}
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="currentColor" 
                  className={`${
                    score.percentage >= 80 ? 'text-green-500 dark:text-green-400' :
                    score.percentage >= 60 ? 'text-yellow-500 dark:text-yellow-400' :
                    'text-red-500 dark:text-red-400'
                  }`}
                  strokeWidth="8"
                  strokeDasharray={`${score.percentage * 2.83} 283`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-3xl font-bold text-slate-700 dark:text-white">
                  {score.percentage}%
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {score.correct}/{score.total} Doğru
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <div className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">
              {score.percentage >= 80 ? 'Tebrikler! 🎉' : 
               score.percentage >= 60 ? 'İyi Çalışma! 👍' : 
               'Biraz Daha Çalışmalısın 📚'}
            </div>
            <div className="text-slate-700 dark:text-slate-300 max-w-md">
              {score.percentage >= 80 
                ? 'Göz uyumu konusunu çok iyi anlamışsınız!' 
                : score.percentage >= 60 
                ? 'Göz uyumu konusunda iyi bir bilgi seviyesine sahipsiniz, ancak bazı konuları tekrar gözden geçirmeniz faydalı olabilir.' 
                : 'Göz uyumu konusunu daha iyi anlamak için eğitim modülünü tekrar incelemenizi öneririz.'}
            </div>
          </div>
        </div>
        
        {/* Yanlış cevaplar listesi */}
        {score.incorrectAnswers.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-white">
              Yanlış Cevapladığınız Sorular:
            </h3>
            <ul className="space-y-3">
              {score.incorrectAnswers.map((item, idx) => (
                <li key={idx} className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-800">
                  <div className="font-medium text-slate-800 dark:text-white">{idx + 1}. {item.question}</div>
                  <div className="mt-1 text-sm text-red-600 dark:text-red-400">
                    Sizin cevabınız: {item.userAnswer}
                  </div>
                  <div className="mt-1 text-sm text-green-600 dark:text-green-400">
                    Doğru cevap: {item.correctAnswer}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={restartTest}
            className="px-6 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
          >
            Yeniden Dene
          </button>
          <Link href="/egitim" className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors">
            Eğitime Dön
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Bilgi Testi - Göz Uyumu</title>
        <meta name="description" content="Göz uyumu konusunda bilginizi test edin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Bilgi Testi
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            Göz yapısı ve akomodasyon mekanizması hakkında bilgilerinizi test edin.
          </p>
        </div>

        {/* Zorluk Seçimi */}
        {!difficulty && (
          <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Zorluk Seviyesi Seçin</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => startTest("easy")}
                className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/40 dark:to-green-800/40 text-green-800 dark:text-green-100 font-medium py-6 px-8 rounded-xl shadow-md hover:shadow-lg transition-all text-xl flex flex-col items-center gap-4 border border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-green-100 dark:bg-green-800/30 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 relative z-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>
                <span className="relative z-10">Kolay</span>
              </button>
              <button
                onClick={() => startTest("medium")}
                className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/40 dark:to-yellow-800/40 text-yellow-800 dark:text-yellow-100 font-medium py-6 px-8 rounded-xl shadow-md hover:shadow-lg transition-all text-xl flex flex-col items-center gap-4 border border-yellow-200 dark:border-yellow-800 hover:border-yellow-300 dark:hover:border-yellow-700 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-yellow-100 dark:bg-yellow-800/30 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 relative z-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>
                <span className="relative z-10">Orta</span>
              </button>
              <button
                onClick={() => startTest("hard")}
                className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/40 dark:to-red-800/40 text-red-800 dark:text-red-100 font-medium py-6 px-8 rounded-xl shadow-md hover:shadow-lg transition-all text-xl flex flex-col items-center gap-4 border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-red-100 dark:bg-red-800/30 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 relative z-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>
                <span className="relative z-10">Zor</span>
              </button>
            </div>
          </div>
        )}

        {/* Test Soruları */}
        {difficulty && !showResults && questions.length > 0 && (
          <div className="max-w-3xl mx-auto">
            {/* İlerleme Durumu */}
            <div className="mb-8">
              <div className="flex justify-between mb-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded-full shadow-sm">
                  {currentQuestionIndex + 1} / {questions.length} Soru
                </span>
                <span className={`px-3 py-1 rounded-full shadow-sm ${
                  difficulty === "easy" 
                    ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" 
                    : difficulty === "medium" 
                      ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300" 
                      : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                }`}>
                  {difficulty === "easy" && "Kolay Seviye"}
                  {difficulty === "medium" && "Orta Seviye"}
                  {difficulty === "hard" && "Zor Seviye"}
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ease-out ${
                    difficulty === "easy" ? "bg-gradient-to-r from-green-400 to-green-500" 
                    : difficulty === "medium" ? "bg-gradient-to-r from-yellow-400 to-yellow-500" 
                    : "bg-gradient-to-r from-red-400 to-red-500"
                  }`}
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Soru Kartı */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-100 dark:border-slate-700">
              <h2 className="text-xl sm:text-2xl font-bold mb-6">
                {currentQuestionIndex + 1}. {questions[currentQuestionIndex].q}
              </h2>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
              
              <div className="space-y-4">
                {questions[currentQuestionIndex].o.map((option, index) => (
                  <div 
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`p-4 rounded-lg cursor-pointer transition-all transform hover:scale-[1.02] active:scale-[0.98]
                      ${selectedAnswer === index 
                        ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 dark:border-blue-400 shadow-md' 
                        : 'bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:bg-gray-200 dark:hover:bg-slate-600 hover:shadow-md'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all
                        ${selectedAnswer === index 
                          ? 'border-blue-500 dark:border-blue-400 bg-blue-200 dark:bg-blue-800' 
                          : 'border-gray-400 dark:border-gray-500'
                        }`}
                      >
                        {selectedAnswer === index && (
                          <div className="w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse-slow"></div>
                        )}
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">{option}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigasyon Butonları */}
            <div className="flex justify-between">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`px-6 py-3 flex items-center gap-2 rounded-lg shadow-md font-medium transition-all
                  ${currentQuestionIndex === 0 
                    ? 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed' 
                    : 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:shadow-lg border border-blue-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span className="hidden sm:inline">Önceki Soru</span>
                <span className="sm:hidden">Önceki</span>
              </button>
              
              <button
                onClick={handleNextQuestion}
                className={`px-6 py-3 flex items-center gap-2 rounded-lg shadow-md font-medium transition-all
                  ${selectedAnswer === null
                    ? 'bg-blue-400 hover:bg-blue-500 text-white' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:shadow-lg transform transition hover:scale-105 active:scale-95'
                  }`}
              >
                <span className="hidden sm:inline">{currentQuestionIndex === questions.length - 1 ? 'Testi Bitir' : 'Sonraki Soru'}</span>
                <span className="sm:hidden">{currentQuestionIndex === questions.length - 1 ? 'Bitir' : 'Sonraki'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Test Sonuçları */}
        {showResults && renderResults()}
      </div>
    </>
  );
} 