export default function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero-like loading with brand gradient */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-8 pb-16 loading-hero">
        {/* Logo placeholder */}
        <div className="w-24 h-24 rounded-full bg-white/15 border border-white/30 flex items-center justify-center shadow-md">
          <div className="w-16 h-16 skeleton-accent rounded-full" />
        </div>

        {/* Title & subtitle placeholders */}
        <div className="w-full max-w-xl px-6 mt-6">
          <div className="h-8 skeleton-accent mx-auto rounded-md w-3/4" />
          <div className="h-4 skeleton mx-auto w-2/3 mt-3 rounded" />
        </div>

        {/* CTA placeholder */}
        <div className="mt-6">
          <div className="h-11 w-48 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center">
            <div className="h-5 w-28 skeleton rounded" />
          </div>
        </div>

        {/* Progress */}
        <div className="mt-8 w-full max-w-sm px-6">
          <div className="loading-progress">
            <div className="loading-progress-bar" />
          </div>
          <div className="text-white/80 text-sm mt-2 loading-dots">
            Yükleniyor<span>.</span><span>.</span><span>.</span>
          </div>
        </div>
      </section>

      {/* Feature cards skeleton */}
      <section className="py-12 md:py-16 bg-gray-50 bg-pattern">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="feature-card">
              <div className="skeleton-accent rounded-full w-16 h-16 mx-auto mb-4" />
              <div className="skeleton-title mx-auto" />
              <div className="skeleton-text mx-auto" />
              <div className="skeleton-text mx-auto w-2/3" />
            </div>
          ))}
        </div>
      </section>

      {/* Menu preview skeleton */}
      <section className="py-12">
        <div className="container-custom">
          <div className="h-7 skeleton-accent mx-auto w-56 mb-6 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="menu-card">
                <div className="skeleton-title" />
                <div className="skeleton-text" />
                <div className="skeleton-text-short" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile bottom actions placeholder */}
      <div className="mobile-actions-skeleton">
        <div className="grid grid-cols-4 gap-2">
          <div className="skeleton h-10 rounded-lg" />
          <div className="skeleton h-10 rounded-lg" />
          <div className="skeleton h-10 rounded-lg" />
          <div className="skeleton h-10 rounded-lg" />
        </div>
      </div>
    </div>
  );
}


