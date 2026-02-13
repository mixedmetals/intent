import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function ArrowRight() {
  return (
    <svg 
      className={styles.buttonArrow}
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M3 8h10M9 4l4 4-4 4" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.versionBadge}>
          v2.0.0 <span>•</span> Tactility v2
        </div>
        <h1>{siteConfig.title}</h1>
        <p>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className={styles.buttonPrimary}
            to="/docs/getting-started/what-is-intent">
            Get Started
            <ArrowRight />
          </Link>
          <Link
            className={styles.buttonSecondary}
            to="/docs/components">
            View Components
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Schema-first, AI-native CSS framework for React. 72 production-ready components.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
