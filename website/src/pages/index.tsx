import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.versionBadge}>
          v2.0.0 <span>•</span> Now with Tactility v2
        </div>
        <h1>{siteConfig.title}</h1>
        <p>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className={styles.buttonPrimary}
            to="/docs/getting-started/what-is-intent">
            Get Started
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
