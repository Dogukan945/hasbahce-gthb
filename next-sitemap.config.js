module.exports = {
  siteUrl: 'https://hasbahceamasya.com',
  generateRobotsTxt: true,
  exclude: ['/admin', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/*']
      }
    ]
  },
  changefreq: 'weekly',
  priority: 0.8,
  sitemapSize: 5000,
  generateIndexSitemap: false,
  outDir: 'public',
  // Manuel sitemap.xml dosyasını korumak için
  additionalPaths: async () => {
    return [];
  }
}; 