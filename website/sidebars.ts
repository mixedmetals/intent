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
            'components/kbd',
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
            'components/aspect',
            'components/center',
          ],
        },
        {
          type: 'category',
          label: 'Forms',
          items: [
            'components/field',
            'components/label',
            'components/form',
            'components/input',
            'components/textarea',
            'components/select',
            'components/combobox',
            'components/datepicker',
            'components/fileupload',
            'components/checkbox',
            'components/radio',
            'components/switch',
            'components/colorpicker',
            'components/rangeslider',
            'components/otpinput',
            'components/phoneinput',
          ],
        },
        {
          type: 'category',
          label: 'Feedback',
          items: [
            'components/alert',
            'components/banner',
            'components/notification',
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
            'components/portal',
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
            'components/datagrid',
            'components/timeline',
            'components/list',
            'components/tree',
            'components/stat',
            'components/badgegroup',
            'components/calendar',
            'components/chart',
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
        {
          type: 'category',
          label: 'Advanced',
          items: [
            'components/virtuallist',
            'components/resizable',
            'components/sortable',
            'components/infinitescroll',
            'components/search',
            'components/filter',
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
