export default function FAQSection() {
  const faqs = [
    {
      q: 'Çalışma saatleriniz nedir?',
      a: 'Her gün 07:00 - 23:00 arası hizmet veriyoruz.'
    },
    {
      q: 'Rezervasyon gerekiyor mu?',
      a: 'Yoğun saatlerde önerilir. Telefonla hızlıca rezervasyon yapabilirsiniz: +90 358 213 05 93.'
    },
    {
      q: 'Konumunuz nerede?',
      a: 'Amasya, Yeşilırmak kenarında, pazar yerinin hemen yanındayız. Harita bağlantısı menüde mevcut.'
    }
  ];
  return (
    <section className="py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="heading-2 text-green-700 mb-6">Sık Sorulan Sorular</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details key={i} className="group border border-gray-200 rounded-xl p-4">
              <summary className="cursor-pointer font-semibold text-gray-900 group-open:text-red-700">
                {f.q}
              </summary>
              <p className="mt-2 text-gray-700">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}


