import type {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
  icon: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Schema-First',
    icon: '📐',
    description: (
      <>
        Define components with schemas that specify properties, constraints, and 
        mappings. Intent validates props, generates TypeScript types, and creates 
        optimized CSS automatically.
      </>
    ),
  },
  {
    title: 'AI-Native',
    icon: '🤖',
    description: (
      <>
        Intent's schema format is designed for LLMs. Structured, constrained, 
        and semantic - making it easy for AI assistants to generate correct, 
        consistent UI code.
      </>
    ),
  },
  {
    title: 'Type-Safe',
    icon: '🔒',
    description: (
      <>
        Full TypeScript support with autocomplete for all component props. 
        Catch errors at build time, not runtime. No more guessing at class names 
        or prop values.
      </>
    ),
  },
  {
    title: 'Zero Runtime',
    icon: '⚡',
    description: (
      <>
        Intent generates static CSS at build time. No runtime overhead, 
        no JavaScript in the browser for styling. Just pure, optimized CSS.
      </>
    ),
  },
  {
    title: '72 Components',
    icon: '🧩',
    description: (
      <>
        Production-ready components covering everything from basic buttons to 
        complex data grids. All follow the same schema-first philosophy with 
        full accessibility support.
      </>
    ),
  },
  {
    title: 'Themeable',
    icon: '🎨',
    description: (
      <>
        Customize every aspect of your design system with theme tokens. 
        Colors, spacing, typography, shadows - all controlled from a single 
        configuration file.
      </>
    ),
  },
];

function Feature({title, description, icon}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
