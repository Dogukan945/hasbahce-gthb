import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactSection() {
  return (
    <>
      {/* İletişim Bölümü - Mobil odaklı */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="heading-2 text-gray-800 mb-4">
              Bize Ulaşın
            </h2>
            <p className="body-text-large text-gray-600 max-w-2xl mx-auto">
              Restoranımız hakkında bilgi almak için telefon edebilir veya adresimize gelebilirsiniz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Telefon */}
            <div className="group bg-white rounded-xl shadow-lg p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
              <div className="text-4xl md:text-5xl text-red-600 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                <FaPhone />
              </div>
              <h3 className="heading-3 text-gray-800 mb-2 group-hover:text-red-700 transition-colors duration-300">
                Telefon
              </h3>
              <a 
                href="tel:+903582130593" 
                className="text-2xl md:text-3xl font-bold text-red-600 hover:text-red-700 transition-all duration-300 hover:scale-105"
              >
                +90 358 213 05 93
              </a>
              <p className="body-text text-gray-600 mt-2 group-hover:text-gray-700 transition-colors duration-300">
                Bilgi almak için arayabilirsiniz
              </p>
            </div>

            {/* Adres */}
            <div className="group bg-white rounded-xl shadow-lg p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
              <div className="text-4xl md:text-5xl text-red-600 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                <FaMapMarkerAlt />
              </div>
              <h3 className="heading-3 text-gray-800 mb-2 group-hover:text-red-700 transition-colors duration-300">
                Adres
              </h3>
              <p className="body-text text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Örnek Mahallesi, Hasbahçe Sokak No:1, Amasya
              </p>
              <a 
                href="https://maps.app.goo.gl/iAEQMt22wNkRqKJ87" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 mt-4 hover:scale-105"
              >
                <FaMapMarkerAlt className="mr-2" />
                Haritada Göster
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 