const withOptimizedImages = require('next-optimized-images')
const withPreact = require('next-plugin-preact')
const preact = require('preact')
const withPrefresh = require('@prefresh/next')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
module.exports = withBundleAnalyzer(
  withOptimizedImages(
    withPreact({
      pageExtensions: ['page.tsx', 'api.ts'],
      devIndicators: {
        autoPrerender: false
      },
      webpack: (config) => {
        config.module.rules.map((rule) => {
          if (rule.test !== undefined && rule.test.source.includes('|svg|')) {
            rule.test = new RegExp(rule.test.source.replace('|svg|', '|'))
          }
        })
        config.module.rules.push({
          test: /.svg$/,
          use: [{ loader: '@svgr/webpack' }]
        })
        return config
      }
    })
  )
)
