"use client";
import { useEffect, useRef } from 'react';
import ImageLightbox from './ImageLightbox';

const aboutText = `2010 yılından bu yana Amasya’da hizmet veren restoranımız, Yeşilırmak kenarındaki konumuyla doğayla iç içe, ferah ve huzurlu bir ortam sunmaktadır. Şehrin kalabalığından uzak, sakin bir atmosfer arayanlar için ideal bir buluşma noktasıyız.

Aile dostu restoran anlayışımızla, her yaştan misafirimizin kendini rahat hissedebileceği bir düzen oluşturduk. Yanımızda yer alan çocuk oyun parkı, özellikle aileler için önemli bir avantaj sağlıyor; ebeveynler yemeğin tadını çıkarırken çocuklar güvenli bir şekilde vakit geçirebiliyor.

15 yılı aşkın deneyimimizle, Amasya’daki yeme-içme sektörünün öncülerinden biri konumundayız. Geniş ürün yelpazemiz sayesinde farklı damak zevklerine hitap ediyor, her misafirimize uygun bir alternatif sunabiliyoruz.

Hijyen ve kalite konusundaki hassasiyetimiz, restoranımızın Mavi Bayraklı Toplu Gıda Tüketim Yeri olarak belgelendirilmesiyle resmî olarak da tescillenmiştir. Bu unvan, güvenilirliğimizi ve yüksek standartlarda hizmet sunduğumuzu ortaya koymaktadır.

Bugün, hem yerel halkın hem de Amasya’yı ziyaret eden misafirlerin güvenle tercih ettiği restoranlardan biri olmanın gururunu yaşıyoruz. Irmak kenarında huzurlu bir yemek, temiz ve güvenilir bir ortam, aileler için uygun bir atmosfer arayan herkesi restoranımıza bekliyoruz.`;

const aboutImages = [
  '/about/amasya-restoran.1.png',
  '/about/amasya-yemek-bahce.2.png',
  '/about/amasya-restorant.3.png',
  '/about/amasya-guvenilir.4.png',
  '/about/amasya.cafe.5.png',
  '/about/amasya-restorant.aile.6.png',
  '/about/amasya-restorant.ailecek.7..png',
];

const aboutImageAltTexts = [
  'Hasbahçe restoran dış görünümü',
  'Hasbahçe bahçe alanı',
  'Hasbahçe iç mekan',
  'Hasbahçe güvenilir hizmet',
  'Hasbahçe cafe alanı',
  'Hasbahçe aile ortamı',
  'Hasbahçe ailecek keyifli vakit'
];

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer ile animasyon
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadein-slideup');
          }
        });
      },
      { threshold: 0.1 }
    );

    const images = containerRef.current?.querySelectorAll('.about-img');
    images?.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-16 bg-white bg-pattern">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="heading-2 text-red-700 mb-4 tracking-tight drop-shadow-sm">Hakkımızda</h2>
          <div className="body-text-large text-gray-700 max-w-3xl mx-auto leading-relaxed whitespace-pre-line bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
            {aboutText}
          </div>
        </div>

        {/* Aileler İçin Neden Uygun? */}
        <div className="mb-10 text-center">
          <h3 className="heading-3 text-green-700 mb-3 drop-shadow-sm">Aileler İçin Neden Uygun?</h3>
          <p className="body-text text-gray-700 max-w-2xl mx-auto">
            Yanı başımızdaki çocuk oyun parkı, ailelerin rahatça vakit geçirmesini sağlıyor. Gözünüz arkada kalmadan rahatça vakit geçirebilirsiniz.
          </p>
        </div>

        {/* Mavi Bayrak Sertifikası */}
        <div className="mb-10 text-center">
          <h3 className="heading-3 text-blue-700 mb-3 drop-shadow-sm">&quot;Mavi Bayrak&quot; Sertifikası</h3>
          <p className="body-text text-gray-700 max-w-2xl mx-auto">
            Restoranımız, toplu gıda tüketiminde hijyen, kalite ve güvenilirliği simgeleyen ‘Mavi Bayrak’ sertifikasına sahiptir.
          </p>
        </div>
        
        <div ref={containerRef} className="mt-12">
          <ImageLightbox 
            images={aboutImages}
            altTexts={aboutImageAltTexts}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            aspectRatio="aspect-[4/3]"
          />
        </div>
      </div>
      
      <style jsx global>{`
        .animate-fadein-slideup {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .about-img {
          opacity: 0;
          transform: translateY(32px);
        }
        @media (max-width: 768px) {
          .about-img { height: 36vw !important; min-height: 120px; }
        }
      `}</style>
    </section>
  );
} 