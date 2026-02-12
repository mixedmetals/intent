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
          ],
        },
        {
          type: 'category',
          label: 'Layout',
          items: [
            'components/stack',
            'components/container',
          ],
        },
        {
          type: 'category',
          label: 'Forms',
          items: [
            'components/input',
            'components/textarea',
            'components/select',
            'components/checkbox',
            'components/switch',
          ],
        },
        {
          type: 'category',
          label: 'Feedback',
          items: [
            'components/alert',
            'components/spinner',
            'components/progress',
          ],
        },
        {
          type: 'category',
          label: 'Overlay',
          items: [
            'components/modal',
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
