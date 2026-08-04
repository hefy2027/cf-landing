export default {
  nav: {
    coreFeatures: 'Core Capabilities',
    features: 'Features',
    scenarios: 'Use Cases',
    deploy: 'Deployment',
    docs: 'Docs',
    demo: 'Live Demo',
    menu: 'Menu'
  },
  hero: {
    eyebrow: 'Full-Stack Cloudflare Operations',
    desc: 'Stop switching between Cloudflare dashboards. One panel to manage DNS, Workers, storage, and AI inference across all your accounts — all visual, no CLI required.',
    readDocs: 'Read Docs',
    demo: 'Live Demo',
    alt: 'CF Manager Dashboard',
    statsModules: 'Modules',
    statsDeploy: 'Deploy Options',
    statsArch: 'Backends',
    statsOpenSource: 'Open Source',
    tunnelCard: 'Tunnel Management',
    rulesCard: 'Rule Engine'
  },
  pillars: {
    sectionTitle: 'One Platform, Three Core Powers',
    sectionLead:
      'CF Manager consolidates operations scattered across multiple Cloudflare dashboards into a single panel, covering accounts, resources, and AI inference end-to-end.'
  },
  features: {
    sectionTitle: 'Full-Stack Cloudflare Management',
    sectionLead:
      'From DNS to edge computing, from object storage to AI inference — 13 modules in one place, with structured forms replacing raw JSON and CLI commands.'
  },
  scenarios: {
    sectionTitle: 'Who Uses CF Manager',
    sectionLead:
      'Whether you are an indie developer or a DevOps team, CF Manager fits your Cloudflare workflow.'
  },
  deploy: {
    sectionTitle: 'Two Deployment Options',
    sectionLead: 'Same business logic, dual backend architecture. Go serverless at zero cost or self-host with full control — both work out of the box.',
    stackLabel: 'Tech Stack'
  },
  cta: {
    eyebrow: 'Open Source \u00B7 MIT License',
    title: 'Start Managing Your Cloudflare Today',
    desc: 'Fork the repo and deploy to Cloudflare Pages in one click, or self-host with Docker. Get a unified multi-account operations panel in minutes.',
    demo: 'Live Demo',
    demoNote: 'Demo Password',
    demoNoteSuffix: '\u00B7 Demo only, not for production use'
  },
  footer: {
    groupProduct: 'Product',
    groupDocs: 'Docs',
    groupResources: 'Resources',
    linkCoreFeatures: 'Core Capabilities',
    linkFeatures: 'Features',
    linkScenarios: 'Use Cases',
    linkDeploy: 'Deployment',
    linkIntro: 'What is CF Manager',
    linkQuickStart: 'Quick Start',
    linkDeployDoc: 'Deployment Guide',
    linkAuth: 'Account Auth',
    linkApi: 'External API',
    linkGitHub: 'GitHub Repo',
    linkDemo: 'Live Demo',
    linkStore: 'App Store Templates (cf-store)',
    warn: 'This tool is intended solely for learning, technical research, and self-management of authorized accounts. Please comply with Cloudflare Terms of Service. Do not use for public AI/rendering relay or resale.',
    copyright: 'Contributors \u00B7 MIT License'
  },
  doc: {
    home: 'Docs Home',
    breadcrumb: 'Docs',
    notFound: 'Document not found.',
    backToDocs: 'Back to Docs',
    prev: 'Previous',
    next: 'Next',
    titleSuffix: '\u00B7 CF Manager Docs',
    groups: {
      intro: 'Getting Started',
      account: 'Account',
      features: 'Features',
      store: 'Store',
      api: 'API',
      security: 'Security',
      troubleshooting: 'Troubleshooting',
      reference: 'Reference'
    }
  },
  lang: {
    switchTo: '中文'
  },
  site: {
    name: 'CF Manager',
    slogan: 'One Panel, All Your Cloudflare',
    tagline: 'All-in-One Multi-Account Cloudflare Operations Platform',
    version: '1.5.0'
  },
  data: {
    pillars: [
      {
        title: 'Multi-Account Management',
        desc: 'API Token & Global API Key dual authentication with AES-encrypted credentials. One-click account switching and unified scheduling — no more logging into different dashboards.',
        points: ['Dual auth methods', 'AES credential encryption', 'Multi-account rotation', 'Audit logs']
      },
      {
        title: 'Full-Stack Resource Ops',
        desc: 'Visual management for DNS, Workers, Pages, KV/D1/R2, Tunnels & rule engines. Cross-account batch deployment with structured forms instead of raw JSON.',
        points: ['DNS \u00B7 Workers \u00B7 Pages', 'KV / D1 / R2 storage', 'Tunnel + Rule Engine', 'Cross-account batch ops']
      },
      {
        title: 'OpenAI-Compatible AI Gateway',
        desc: 'Full Workers AI model inference, Prompt Caching-aware billing, multi-account quota scheduling with OpenAI-compatible /v1 endpoints for local debugging.',
        points: ['Full model inference', 'Cache-aware billing', 'Auto quota scheduling', '/v1 compatible API']
      }
    ],
    features: [
      { title: 'Real-time Dashboard', desc: 'Live usage display for Workers, AI, and rendering quotas across accounts with visual progress bars and audit trails.' },
      { title: 'DNS Management', desc: 'Full A/AAAA/CNAME/MX/TXT record management, one-click proxy toggle, batch operations.' },
      { title: 'Workers / Pages', desc: 'Script & project CRUD, single/cross-account batch deployment, bindings, env vars, routes, custom domains, Pages rollback support.' },
      { title: 'Tunnel Management', desc: 'Tunnel creation & deletion, visual Ingress editor, one-click origin wizard with automatic DNS CNAME + ingress setup.' },
      { title: 'Rule Engine', desc: '8 rule types (origin/rewrite/header/cache/firewall/rate-limit/redirect), structured forms + expression builder.' },
      { title: 'Storage Management', desc: 'KV key-value CRUD, D1 database SQL queries & schema changes, R2 file upload/download/preview.' },
      { title: 'AI Inference', desc: 'Full Workers AI models, streaming chat + Reasoning visualization, conversation history, smart multi-account scheduling.' },
      { title: 'Browser Rendering', desc: '5 modes: screenshot/HTML/Markdown/PDF/link extraction, rate limiting + quota management + SSRF protection.' },
      { title: 'OpenAI Compatible API', desc: '/v1/chat/completions, /v1/models & browser rendering endpoints, streaming & non-streaming, local-only by design.' },
      { title: 'App Store', desc: 'Built-in Catalog template marketplace with third-party source support, one-click Workers/Pages deployment.' },
      { title: 'Security', desc: 'API Token AES encryption, optional login password, Worker edition /admin/ path hiding + nginx root masking (Docker edition serves the panel at root /), full audit logs.' },
      { title: 'Dual Backend Architecture', desc: 'Same business logic, dual deployment: Docker (Express 5 + SQLite single All-in-One container) or Cloudflare Pages (Hono + D1) — your choice.' },
      { title: 'Resin Proxy Pool', desc: 'Native Resin proxy pool integration binds a stable egress IP per Cloudflare account (sticky session) to avoid risk-control triggers from IP churn; proxy priority chain is per-account > Resin > global > none.' }
    ],
    scenarios: [
      { title: 'Indie Developers', desc: 'Aggregate multiple Cloudflare accounts into one panel, debug AI inference & browser rendering locally, integrate with your toolchain via OpenAI-compatible API.', points: ['No more multi-account logins', 'Local AI/rendering debugging', 'OpenAI API toolchain integration'] },
      { title: 'DevOps Teams', desc: 'Centralized domain, Workers, DNS & storage management for your team, cross-account batch deploy, unified quota & usage visibility.', points: ['Centralized permission management', 'Cross-account batch deployment', 'Quota visibility at a glance'] },
      { title: 'Tunneling & Networking', desc: 'One-click origin wizard auto-configures Tunnel + DNS CNAME, structured Ingress editing — zero CLI.', points: ['Visual Ingress editor', 'Auto CNAME discovery', 'Wizard-driven, zero CLI'] },
      { title: 'Self-Hosted Private Deploy', desc: 'One-click Docker Compose setup, HTTP/SOCKS5 & Resin proxy pool (per-account sticky IP) support, encrypted credentials never leak, fully self-owned data.', points: ['Full data sovereignty', 'AES encrypted credentials', 'Proxy environment support'] }
    ],
    deploys: [
      { title: 'Cloudflare Pages', badge: 'Free \u00B7 Recommended', desc: 'Fork & deploy via GitHub Actions, or download pre-built package for manual upload. Powered by D1 + KV, no server needed.', steps: ['Fork repo & configure Secrets', 'Actions triggers Deploy to Cloudflare Pages', 'Create D1 database & bind DB/KV', 'Visit https://<project>.pages.dev/admin/'] },
      { title: 'Docker Compose', badge: 'Self-Hosted', desc: 'Recommended: pull the prebuilt GHCR image (no clone needed), or build from source. Single Express 5 + SQLite All-in-One container, fully self-owned data.', steps: ['docker pull ghcr.io/hefy2027/cf-manager:latest', 'docker run -d -p 3000:3000 -v ./data:/app/data', '  set ENCRYPTION_KEY / API_SECRET', 'Visit http://localhost:3000'] }
    ],
    stack: [
      { k: 'Frontend', v: 'Vue 3 \u00B7 Naive UI \u00B7 Pinia' },
      { k: 'Backend A', v: 'Express 5 \u00B7 Cloudflare SDK \u00B7 SQLite' },
      { k: 'Backend B', v: 'Hono \u00B7 Cloudflare REST API \u00B7 D1' },
      { k: 'Deployment', v: 'Docker Compose \u00B7 Cloudflare Pages' }
    ],
    docs: [
      { slug: 'intro', title: 'What is CF Manager', desc: 'Project overview, three core capabilities, dual backend architecture & security features.', group: 'Getting Started' },
      { slug: 'quick-start', title: 'Quick Start', desc: 'Three deployment methods — own a unified ops panel in 3 minutes.', group: 'Getting Started' },
      { slug: 'deploy', title: 'Deployment Guide', desc: 'Complete details for fork-based deploy, manual Cloudflare Pages deploy, and Docker setup.', group: 'Getting Started' },
      { slug: 'account-auth', title: 'Account Authentication', desc: 'Differences and configuration for API Token vs Global API Key auth methods.', group: 'Account' },
      { slug: 'account-management', title: 'Account Management', desc: 'Guide for adding, editing, switching, CSV import/export, and batch testing accounts.', group: 'Account' },
      { slug: 'dns', title: 'DNS Management', desc: 'CRUD for A/AAAA/CNAME/MX/TXT records, proxy toggle, batch ops & cross-zone management.', group: 'Features' },
      { slug: 'workers-pages', title: 'Workers & Pages', desc: 'Workers scripts & Pages project management, cross-account batch deploy, bindings & route config.', group: 'Features' },
      { slug: 'tunnel', title: 'Tunnels & Origins', desc: 'Cloudflare Tunnel creation, visual Ingress editing, one-click origin wizard.', group: 'Features' },
      { slug: 'storage', title: 'Storage Management', desc: 'Unified visual operations for KV key-value stores, D1 SQL queries, and R2 object storage.', group: 'Features' },
      { slug: 'ai-rendering', title: 'AI Inference & Rendering', desc: 'Workers AI multi-model chat, Prompt Caching billing, five browser rendering modes.', group: 'Features' },
      { slug: 'app-store', title: 'App Store', desc: 'Built-in Catalog marketplace, third-party source integration, one-click deploy & template development guide.', group: 'Store' },
      { slug: 'api-v1', title: 'External API Docs', desc: 'OpenAI-compatible /v1 endpoint auth, invocation & streaming responses.', group: 'API' },
      { slug: 'security', title: 'Security Best Practices', desc: 'Complete guide on credential encryption, access control, route hiding, proxy security & audit logging.', group: 'Security' },
      { slug: 'troubleshooting', title: 'Troubleshooting', desc: 'Diagnosis and resolution of common deployment & runtime issues, including logs & audit notes.', group: 'Troubleshooting' },
      { slug: 'architecture', title: 'Architecture', desc: 'Dual backend architecture design, project structure, key design decisions & extension points.', group: 'Reference' },
      { slug: 'changelog', title: 'Changelog', desc: 'Summary of changes across CF Manager versions with full changelog links.', group: 'Reference' }
    ],
    docGroups: ['Getting Started', 'Account', 'Features', 'Store', 'API', 'Security', 'Troubleshooting', 'Reference'],
    siteFeatures: ['12+', '2', '2', '100%'],
    badges: {
      tunnel: 'NEW',
      rules: 'NEW',
      resin: 'NEW',
      cf: 'Free \u00B7 Recommended',
      docker: 'Self-Hosted'
    }
  }
}
