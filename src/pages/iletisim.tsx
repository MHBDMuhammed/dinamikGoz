import React, { useState } from "react";
import Head from "next/head";

export default function Iletisim() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "submitted" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const response = await fetch("https://formspree.io/f/your-formspree-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("submitted");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <>
      <Head>
        <title>İletişim - Dinamik Göz</title>
        <meta
          name="description"
          content="Dinamik Göz projesi hakkında bilgi alın ve bizimle iletişime geçin."
        />
      </Head>

      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              İletişim
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Dinamik Göz projesi ile ilgili sorularınız, önerileriniz veya
              işbirliği talepleriniz için bizimle iletişime geçebilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* İletişim Formu */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-slate-700">
              <h2 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-blue-400 flex items-center">
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
                Bize Ulaşın
              </h2>

              {formStatus === "submitted" ? (
                <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-green-500 dark:text-green-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">
                    Mesajınız İletildi!
                  </h3>
                  <p className="text-green-600 dark:text-green-300 mb-4">
                    Teşekkür ederiz. En kısa sürede size dönüş yapacağız.
                  </p>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="px-4 py-2 bg-white dark:bg-slate-700 text-green-600 dark:text-green-400 rounded-lg border border-green-300 dark:border-green-600 hover:bg-green-50 dark:hover:bg-slate-600 transition-colors"
                  >
                    Yeni Mesaj Gönder
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formStatus === "error" && (
                    <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 p-4 rounded-lg mb-4">
                      <p>
                        Mesajınız gönderilirken bir hata oluştu. Lütfen daha
                        sonra tekrar deneyin.
                      </p>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Adınız Soyadınız
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      E-posta Adresiniz
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Mesajınız
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-medium shadow transition-all ${
                      formStatus === "submitting"
                        ? "opacity-70 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {formStatus === "submitting" ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Gönderiliyor...
                      </div>
                    ) : (
                      "Gönder"
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* İletişim Bilgileri */}
            <div className="space-y-8">
              {/* Proje Hakkında Kart */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-slate-700">
                <h2 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-blue-400 flex items-center">
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Proje Hakkında
                </h2>
                <div className="prose prose-blue dark:prose-invert max-w-none">
                  <p>
                    Dinamik Göz, göz uyumu (akomodasyon) mekanizmasını
                    interaktif bir şekilde öğretmeyi amaçlayan açık kaynaklı bir
                    eğitim projesidir.
                  </p>
                  <p>
                    Bu proje, biyoloji eğitiminde öğrencilerin göz yapısını ve
                    işleyişini daha kolay anlamalarını sağlamak amacıyla
                    geliştirilmiştir.
                  </p>
                </div>
              </div>

              {/* İletişim Bilgileri Kart */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-slate-700">
                <h2 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-blue-400 flex items-center">
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
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                  İletişim Bilgileri
                </h2>

                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-400 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
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
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        E-posta
                      </h3>
                      <a
                        href="mailto:iletisim@dinamikgoz.com"
                        className="text-base text-blue-600 dark:text-blue-400 mt-1 hover:underline"
                      >
                        iletisim@dinamikgoz.com
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-400 mr-3">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        GitHub
                      </h3>
                      <a
                        href="https://github.com/MHBDMuhammed/dinamikGoz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base text-blue-600 dark:text-blue-400 mt-1 hover:underline"
                      >
                        github.com/MHBDMuhammed/dinamikGoz
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-400 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Katkıda Bulunun
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Projeyi GitHub üzerinden fork edebilir ve pull request
                        gönderebilirsiniz.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
