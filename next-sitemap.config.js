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
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000
}; 