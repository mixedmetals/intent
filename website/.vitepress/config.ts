import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Intent Framework',
  description: 'The Schema-First, AI-Native CSS Framework',
  
  base: '/intent/',
  
  ignoreDeadLinks: true,
  
  head: [
    ['link', { rel: 'icon', href: '/intent/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: 'Intent Framework' }],
    ['meta', { name: 'og:image', content: '/intent/og-image.png' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Docs', link: '/docs/getting-started/what-is-intent' },
      { text: 'Components', link: '/docs/components/button' },
      { text: 'GitHub', link: 'https://github.com/mixedmetals/intent' }
    ],

    sidebar: {
      '/docs/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'What is Intent?', link: '/docs/getting-started/what-is-intent' },
            { text: 'Installation', link: '/docs/getting-started/installation' },
            { text: 'Quick Start', link: '/docs/getting-started/quick-start' },
          ]
        },
        {
          text: 'Components',
          items: [
            { text: 'Button', link: '/docs/components/button' },
            { text: 'Input', link: '/docs/components/input' },
            { text: 'Card', link: '/docs/components/card' },
            { text: 'Alert', link: '/docs/components/alert' },
            { text: 'Modal', link: '/docs/components/modal' },
            { text: 'See All →', link: '/docs/components/' },
          ]
        },
        {
          text: 'API Reference',
          items: [
            { text: 'Schema Definition', link: '/docs/api/schema' },
            { text: 'Theming', link: '/docs/api/theme' },
            { text: 'CLI', link: '/docs/api/cli' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mixedmetals/intent' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/intent-core' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Intent Framework Contributors'
    },

    search: {
      provider: 'local'
    }
  }
})
