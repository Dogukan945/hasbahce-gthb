import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 md:py-16 mt-auto">
      <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3 mb-6 md:mb-0">
          <Image src="/hasbahce-logo.png" alt="Hasbahçe Restoran Amasya - Geleneksel Türk Mutfağı" width={50} height={50} className="object-contain w-[50px] h-[50px]" />
          <span className="text-xl font-bold text-green-200 tracking-wide">HASBAHÇE</span>
        </div>
        <div className="text-center md:text-right">
          <p className="body-text text-gray-400">&copy; 2024 Hasbahçe. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
} 