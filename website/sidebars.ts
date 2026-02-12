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
          ],
        },
        {
          type: 'category',
          label: 'Layout',
          items: [
            'components/stack',
          ],
        },
        {
          type: 'category',
          label: 'Forms',
          items: [
            'components/input',
          ],
        },
        {
          type: 'category',
          label: 'Feedback',
          items: [
            'components/spinner',
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
