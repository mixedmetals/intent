import { h } from 'vue'
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    const { frontmatter } = useData()
    const route = useRoute()
    
    return h(DefaultTheme.Layout, null, {
      // Add custom slots here if needed
    })
  },
  enhanceApp({ app, router, siteData }) {
    // Register global components
    // app.component('ComponentShowcase', ComponentShowcase)
  }
}
