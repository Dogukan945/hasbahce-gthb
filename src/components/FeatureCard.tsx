import React from 'react';
import Link from 'next/link';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
  phoneNumber?: string;
  locationLink?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = React.memo(({ 
  icon, 
  title, 
  description, 
  linkText, 
  linkHref,
  phoneNumber,
  locationLink
}) => {
  const cardContent = (
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
      <div className="flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4 mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center mb-6 flex-grow leading-relaxed">{description}</p>
      
      {/* Ek bilgiler */}
      <div className="space-y-4 mt-auto">
        {/* Telefon numarası */}
        {phoneNumber && (
          <div className="text-center">
            <a 
              href={`tel:${phoneNumber}`}
              className="inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm w-full"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {phoneNumber}
            </a>
          </div>
        )}
        
        {/* Konum linki */}
        {locationLink && (
          <div className="text-center">
            <a 
              href={locationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm w-full"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Konumu Görüntüle
            </a>
          </div>
        )}
        
        {/* Ana link butonu */}
        {linkText && linkHref && (
          <div className="text-center">
            <Link 
              href={linkHref}
              className="inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm w-full"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {linkText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  return <div className="h-full transition-transform duration-200 hover:-translate-y-1">{cardContent}</div>;
});

FeatureCard.displayName = 'FeatureCard';

export default FeatureCard; 