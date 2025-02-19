const fs = require('fs')
const path = require('path')

// Set the public folder path and your website's base URL
const publicFolder = path.join(__dirname.replace('/scripts', ''), 'public')  // Adjust this to your actual public folder
const baseUrl = 'https://siphoxhealth.com/hub'  // Replace with your actual domain

// Function to recursively get all files in a directory
function getFiles(dir, files = []) {
  const items = fs.readdirSync(dir)  // Read the directory content

  items.forEach(item => {
    const fullPath = path.join(dir, item)
    const stats = fs.statSync(fullPath)

    if (stats.isDirectory()) {
      getFiles(fullPath, files)  // Recursively get files from subdirectories
    } else if (item.endsWith('.html')) {  // Only include .html files
      files.push(fullPath)
    }
  })

  return files
}

// Function to generate the sitemap
function generateSitemap() {
  const files = getFiles(publicFolder)  // Get all HTML files in the public folder
  const sitemapPath = path.join(publicFolder, 'sitemap.xml')  // Output file

  let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n'
  sitemapContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  files.forEach(file => {
    const relativePath = path.relative(publicFolder, file)
    const url = `${baseUrl}/${relativePath.replace(/\\/g, '/')}`  // Replace backslashes with forward slashes

    // Get last modified time
    const lastMod = fs.statSync(file).mtime.toISOString()

    // Add the URL entry to the sitemap
    sitemapContent += '  <url>\n'
    sitemapContent += `    <loc>${url.replace('/index.html', '')}</loc>\n`
    sitemapContent += `    <lastmod>${lastMod}</lastmod>\n`
    sitemapContent += '    <changefreq>daily</changefreq>\n'  // Change as needed
    sitemapContent += '    <priority>0.8</priority>\n'  // Change as needed
    sitemapContent += '  </url>\n'
  })

  sitemapContent += '</urlset>'

  // Write the sitemap to the file
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8')
  console.log('Sitemap has been generated:', sitemapPath)
}

// Run the sitemap generation
generateSitemap()
