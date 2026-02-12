import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Intent Framework',
  tagline: 'The Schema-first, AI-Native CSS Framework',
  favicon: 'img/favicon.ico',

  url: 'https://mixedmetals.github.io',
  baseUrl: '/intent/',

  organizationName: 'mixedmetals',
  projectName: 'intent',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/mixedmetals/intent/tree/main/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  
  plugins: [
    function resolveJsExtensionPlugin(context, options) {
      return {
        name: 'resolve-js-extension',
        configureWebpack(config, isServer) {
          return {
            resolve: {
              fullySpecified: false,
            },
            module: {
              rules: [
                {
                  test: /\.m?js/,
                  resolve: {
                    fullySpecified: false,
                  },
                },
              ],
            },
          };
        },
      };
    },
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    image: 'img/intent-social-card.jpg',
    navbar: {
      title: 'Intent',
      logo: {
        alt: 'Intent Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/mixedmetals/intent',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: '/docs/getting-started/what-is-intent' },
            { label: 'Components', to: '/docs/components' },
            { label: 'API Reference', to: '/docs/api/schema' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'GitHub Discussions', href: 'https://github.com/mixedmetals/intent/discussions' },
            { label: 'Issues', href: 'https://github.com/mixedmetals/intent/issues' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'GitHub', href: 'https://github.com/mixedmetals/intent' },
            { label: 'npm', href: 'https://www.npmjs.com/package/intent-core' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Intent Framework. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
