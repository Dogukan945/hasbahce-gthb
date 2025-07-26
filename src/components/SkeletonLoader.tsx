interface SkeletonLoaderProps {
  type: 'menu-card' | 'tab' | 'category' | 'search';
  count?: number;
}

export default function SkeletonLoader({ type, count = 1 }: SkeletonLoaderProps) {
  const renderSkeleton = () => {
    switch (type) {
      case 'menu-card':
        return (
          <div className="skeleton-card">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="skeleton-title"></div>
                <div className="skeleton-text-short"></div>
                <div className="skeleton-text"></div>
              </div>
              <div className="skeleton-price ml-4"></div>
            </div>
          </div>
        );
      
      case 'tab':
        return <div className="skeleton-tab"></div>;
      
      case 'category':
        return (
          <div className="mb-12">
            <div className="text-center mb-8">
              <div className="skeleton-title mx-auto"></div>
              <div className="skeleton-text-short mx-auto mt-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="skeleton-card">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="skeleton-title"></div>
                      <div className="skeleton-text-short"></div>
                      <div className="skeleton-text"></div>
                    </div>
                    <div className="skeleton-price ml-4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'search':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="flex items-center bg-gray-100 rounded-full px-6 py-4">
                <div className="w-6 h-6 skeleton rounded mr-3"></div>
                <div className="flex-1 h-6 skeleton rounded"></div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
} 