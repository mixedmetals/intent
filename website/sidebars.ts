import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/what-is-intent',
        'getting-started/installation',
        'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'Components',
      items: [
        'components/index',
        {
          type: 'category',
          label: 'Foundation',
          items: [
            'components/button',
            'components/badge',
            'components/card',
            'components/text',
            'components/avatar',
            'components/divider',
          ],
        },
        {
          type: 'category',
          label: 'Layout',
          items: [
            'components/stack',
            'components/grid',
            'components/flex',
            'components/box',
            'components/spacer',
            'components/container',
          ],
        },
        {
          type: 'category',
          label: 'Forms',
          items: [
            'components/field',
            'components/input',
            'components/textarea',
            'components/select',
            'components/checkbox',
            'components/radio',
            'components/switch',
          ],
        },
        {
          type: 'category',
          label: 'Feedback',
          items: [
            'components/alert',
            'components/banner',
            'components/spinner',
            'components/progress',
            'components/skeleton',
            'components/toast',
          ],
        },
        {
          type: 'category',
          label: 'Overlay',
          items: [
            'components/modal',
            'components/dialog',
            'components/drawer',
            'components/sheet',
            'components/popover',
            'components/tooltip',
            'components/dropdown',
            'components/menu',
          ],
        },
        {
          type: 'category',
          label: 'Navigation',
          items: [
            'components/navbar',
            'components/sidebar',
            'components/tabs',
            'components/breadcrumbs',
            'components/pagination',
            'components/stepper',
            'components/command',
          ],
        },
        {
          type: 'category',
          label: 'Data Display',
          items: [
            'components/accordion',
            'components/table',
            'components/timeline',
            'components/list',
            'components/tree',
            'components/stat',
            'components/calendar',
          ],
        },
        {
          type: 'category',
          label: 'Media',
          items: [
            'components/icon',
            'components/image',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/schema',
        'api/theme',
      ],
    },
  ],
};

export default sidebars;
