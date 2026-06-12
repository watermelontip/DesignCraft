<template>
  <div class="plugins">
    <header class="page-header">
      <div class="header-left">
        <h1 class="page-title">Plugins</h1>
        <p class="page-desc">Extend DesignCraft with powerful plugins</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-secondary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16,6 12,2 8,6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          Publish Plugin
        </button>
      </div>
    </header>

    <!-- 筛选栏 -->
    <div class="filter-bar">
      <div class="filter-tabs">
        <button 
          v-for="tab in filterTabs" 
          :key="tab.id"
          class="filter-tab"
          :class="{ active: activeFilter === tab.id }"
          @click="activeFilter = tab.id"
        >
          {{ tab.label }}
          <span v-if="tab.count" class="tab-count">{{ tab.count }}</span>
        </button>
      </div>
      <div class="filter-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input type="text" placeholder="Search plugins..." v-model="searchQuery" />
      </div>
    </div>

    <!-- 插件网格 -->
    <div class="plugins-grid">
      <div 
        v-for="plugin in filteredPlugins" 
        :key="plugin.id"
        class="plugin-card"
        :class="{ installed: plugin.installed }"
      >
        <div class="plugin-header">
          <div class="plugin-icon" :style="{ background: plugin.color }">
            <div v-html="plugin.icon"></div>
          </div>
          <div class="plugin-actions">
            <button 
              v-if="!plugin.installed"
              class="btn btn-primary btn-sm"
              @click="installPlugin(plugin)"
            >
              Install
            </button>
            <button 
              v-else
              class="btn btn-secondary btn-sm"
              @click="uninstallPlugin(plugin)"
            >
              Installed
            </button>
          </div>
        </div>
        <div class="plugin-info">
          <h3 class="plugin-name">{{ plugin.name }}</h3>
          <p class="plugin-desc">{{ plugin.description }}</p>
        </div>
        <div class="plugin-meta">
          <div class="plugin-stats">
            <span class="stat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {{ plugin.downloads }}
            </span>
            <span class="stat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
              {{ plugin.rating }}
            </span>
          </div>
          <span class="plugin-version">{{ plugin.version }}</span>
        </div>
        <div class="plugin-tags">
          <span v-for="tag in plugin.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const activeFilter = ref('all')

const filterTabs = [
  { id: 'all', label: 'All', count: 12 },
  { id: 'installed', label: 'Installed', count: 5 },
  { id: 'ai', label: 'AI', count: 4 },
  { id: 'export', label: 'Export', count: 3 }
]

const plugins = ref([
  {
    id: 1,
    name: 'AI Image Generator',
    description: 'Generate images from text descriptions using AI',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>',
    color: 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
    installed: true,
    downloads: '12.5k',
    rating: '4.8',
    version: 'v2.1.0',
    tags: ['AI', 'Image', 'Generation']
  },
  {
    id: 2,
    name: 'Code Export',
    description: 'Export designs to React, Vue, or HTML code',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>',
    color: 'linear-gradient(135deg, #10B981, #34D399)',
    installed: true,
    downloads: '8.2k',
    rating: '4.6',
    version: 'v1.5.0',
    tags: ['Export', 'Code', 'React']
  },
  {
    id: 3,
    name: 'Color Palette AI',
    description: 'AI-powered color palette generation',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
    color: 'linear-gradient(135deg, #EC4899, #F472B6)',
    installed: false,
    downloads: '6.8k',
    rating: '4.5',
    version: 'v1.2.0',
    tags: ['AI', 'Color', 'Design']
  },
  {
    id: 4,
    name: 'Animation Studio',
    description: 'Create complex animations and transitions',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polygon points="5,3 19,12 5,21"/></svg>',
    color: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
    installed: true,
    downloads: '5.4k',
    rating: '4.7',
    version: 'v3.0.0',
    tags: ['Animation', 'Motion', 'Transition']
  },
  {
    id: 5,
    name: 'SVG Optimizer',
    description: 'Optimize and clean SVG exports',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    color: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
    installed: false,
    downloads: '4.2k',
    rating: '4.4',
    version: 'v1.1.0',
    tags: ['SVG', 'Optimization', 'Export']
  },
  {
    id: 6,
    name: 'Design Tokens',
    description: 'Sync design tokens across platforms',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    color: 'linear-gradient(135deg, #6366F1, #818CF8)',
    installed: true,
    downloads: '7.1k',
    rating: '4.9',
    version: 'v2.3.0',
    tags: ['Tokens', 'Sync', 'Design System']
  },
  {
    id: 7,
    name: 'Accessibility Checker',
    description: 'Check designs for accessibility issues',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>',
    color: 'linear-gradient(135deg, #14B8A6, #2DD4BF)',
    installed: false,
    downloads: '3.8k',
    rating: '4.3',
    version: 'v1.0.0',
    tags: ['Accessibility', 'A11y', 'Check']
  },
  {
    id: 8,
    name: 'Figma Import',
    description: 'Import designs directly from Figma',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/></svg>',
    color: 'linear-gradient(135deg, #A855F7, #C084FC)',
    installed: false,
    downloads: '9.5k',
    rating: '4.7',
    version: 'v2.0.0',
    tags: ['Figma', 'Import', 'Migration']
  },
  {
    id: 9,
    name: 'PDF Export Pro',
    description: 'Export high-quality PDF documents',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    color: 'linear-gradient(135deg, #EF4444, #F87171)',
    installed: true,
    downloads: '11.2k',
    rating: '4.8',
    version: 'v3.1.0',
    tags: ['PDF', 'Export', 'Document']
  }
])

const filteredPlugins = computed(() => {
  let filtered = plugins.value
  
  if (activeFilter.value === 'installed') {
    filtered = filtered.filter(p => p.installed)
  } else if (activeFilter.value === 'ai') {
    filtered = filtered.filter(p => p.tags.includes('AI'))
  } else if (activeFilter.value === 'export') {
    filtered = filtered.filter(p => p.tags.includes('Export') || p.tags.includes('PDF'))
  }
  
  if (searchQuery.value) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  return filtered
})

const installPlugin = (plugin) => {
  plugin.installed = true
}

const uninstallPlugin = (plugin) => {
  plugin.installed = false
}
</script>

<style scoped>
.plugins {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-6) var(--space-8);
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-primary);
}

.page-title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--text-primary);
}

.page-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-top: var(--space-1);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: 500;
  transition: all var(--transition-fast);
}

.btn svg {
  width: 16px;
  height: 16px;
}

.btn-primary {
  background: var(--accent-primary);
  color: white;
}

.btn-primary:hover {
  background: var(--accent-hover);
}

.btn-secondary {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}

.btn-secondary:hover {
  background: var(--bg-elevated);
}

.btn-sm {
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) var(--space-8);
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-primary);
}

.filter-tabs {
  display: flex;
  gap: var(--space-1);
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-secondary);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.filter-tab:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.filter-tab.active {
  background: var(--accent-muted);
  color: var(--accent-primary);
}

.tab-count {
  padding: 2px 6px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
}

.filter-tab.active .tab-count {
  background: var(--accent-primary);
  color: white;
}

.filter-search {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  width: 300px;
}

.filter-search svg {
  width: 16px;
  height: 16px;
  color: var(--text-tertiary);
}

.filter-search input {
  flex: 1;
  font-size: var(--text-sm);
  color: var(--text-primary);
}

.filter-search input::placeholder {
  color: var(--text-tertiary);
}

.plugins-grid {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-6);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5);
  align-content: start;
}

.plugin-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
  transition: all var(--transition-fast);
}

.plugin-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.plugin-card.installed {
  border-color: var(--accent-primary);
}

.plugin-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-4);
}

.plugin-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.plugin-icon :deep(svg) {
  width: 24px;
  height: 24px;
}

.plugin-info {
  margin-bottom: var(--space-4);
}

.plugin-name {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.plugin-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.5;
}

.plugin-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
}

.plugin-stats {
  display: flex;
  gap: var(--space-4);
}

.stat {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.stat svg {
  width: 14px;
  height: 14px;
}

.plugin-version {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  font-family: var(--font-mono);
}

.plugin-tags {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.tag {
  padding: var(--space-1) var(--space-2);
  background: var(--bg-tertiary);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

@media (max-width: 1200px) {
  .plugins-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .plugins-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-bar {
    flex-direction: column;
    gap: var(--space-3);
  }
  
  .filter-search {
    width: 100%;
  }
}
</style>
