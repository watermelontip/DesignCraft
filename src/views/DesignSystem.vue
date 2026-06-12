<template>
  <div class="design-system">
    <header class="page-header">
      <div class="header-left">
        <h1 class="page-title">Design System</h1>
        <p class="page-desc">Manage your brand's design tokens and components</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-secondary" @click="importSystem">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Import
        </button>
        <button class="btn btn-primary" @click="createSystem">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New System
        </button>
      </div>
    </header>

    <div class="system-content">
      <!-- 左侧系统列表 -->
      <aside class="system-sidebar">
        <div class="sidebar-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input type="text" placeholder="Search systems..." v-model="searchQuery" />
        </div>
        
        <div class="system-list">
          <div 
            v-for="system in filteredSystems" 
            :key="system.id"
            class="system-item"
            :class="{ active: selectedSystem?.id === system.id }"
            @click="selectSystem(system)"
          >
            <div class="system-colors">
              <div 
                v-for="(color, i) in system.colors.slice(0, 3)" 
                :key="i"
                class="color-dot"
                :style="{ background: color }"
              ></div>
            </div>
            <div class="system-info">
              <h3 class="system-name">{{ system.name }}</h3>
              <span class="system-meta">{{ system.version }} · {{ system.components }} components</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- 右侧详情 -->
      <main class="system-detail">
        <div v-if="selectedSystem" class="detail-content">
          <!-- 标签页 -->
          <div class="detail-tabs">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              class="tab-btn"
              :class="{ active: activeTab === tab.id }"
              @click="activeTab = tab.id"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- 颜色 -->
          <div v-if="activeTab === 'colors'" class="tab-content">
            <div class="section-header">
              <h2 class="section-title">Colors</h2>
              <button class="btn btn-ghost" @click="addColor">+ Add Color</button>
            </div>
            <div class="colors-grid">
              <div 
                v-for="color in selectedSystem.colorPalette" 
                :key="color.name"
                class="color-card"
              >
                <div class="color-swatch" :style="{ background: color.value }"></div>
                <div class="color-info">
                  <span class="color-name">{{ color.name }}</span>
                  <span class="color-value">{{ color.value }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 字体 -->
          <div v-if="activeTab === 'typography'" class="tab-content">
            <div class="section-header">
              <h2 class="section-title">Typography</h2>
              <button class="btn btn-ghost" @click="addFont">+ Add Font</button>
            </div>
            <div class="typography-list">
              <div 
                v-for="font in selectedSystem.typography" 
                :key="font.name"
                class="typography-item"
              >
                <div class="font-preview" :style="{ fontFamily: font.family, fontSize: font.size }">
                  {{ font.preview }}
                </div>
                <div class="font-info">
                  <span class="font-name">{{ font.name }}</span>
                  <span class="font-details">{{ font.family }} · {{ font.size }} · {{ font.weight }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 组件 -->
          <div v-if="activeTab === 'components'" class="tab-content">
            <div class="section-header">
              <h2 class="section-title">Components</h2>
              <button class="btn btn-ghost" @click="addComponent">+ Add Component</button>
            </div>
            <div class="components-grid">
              <div 
                v-for="component in selectedSystem.componentsList" 
                :key="component.name"
                class="component-card"
              >
                <div class="component-preview">
                  <div v-html="component.preview"></div>
                </div>
                <div class="component-info">
                  <span class="component-name">{{ component.name }}</span>
                  <span class="component-category">{{ component.category }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 间距 -->
          <div v-if="activeTab === 'spacing'" class="tab-content">
            <div class="section-header">
              <h2 class="section-title">Spacing</h2>
            </div>
            <div class="spacing-list">
              <div 
                v-for="space in selectedSystem.spacing" 
                :key="space.name"
                class="spacing-item"
              >
                <div class="spacing-visual">
                  <div class="spacing-bar" :style="{ width: space.value }"></div>
                </div>
                <div class="spacing-info">
                  <span class="spacing-name">{{ space.name }}</span>
                  <span class="spacing-value">{{ space.value }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 圆角 -->
          <div v-if="activeTab === 'radius'" class="tab-content">
            <div class="section-header">
              <h2 class="section-title">Border Radius</h2>
            </div>
            <div class="radius-grid">
              <div 
                v-for="radius in selectedSystem.borderRadius" 
                :key="radius.name"
                class="radius-card"
              >
                <div class="radius-preview" :style="{ borderRadius: radius.value }"></div>
                <div class="radius-info">
                  <span class="radius-name">{{ radius.name }}</span>
                  <span class="radius-value">{{ radius.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <div class="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h3>Select a Design System</h3>
          <p>Choose a design system from the sidebar to view and edit its tokens</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedSystem = ref(null)
const activeTab = ref('colors')

const tabs = [
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'components', label: 'Components' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'radius', label: 'Radius' }
]

const systems = ref([
  {
    id: 1,
    name: 'Material Design 3',
    version: 'v3.0',
    components: 45,
    colors: ['#6750A4', '#625B71', '#7D5260', '#B3261E'],
    colorPalette: [
      { name: 'Primary', value: '#6750A4' },
      { name: 'On Primary', value: '#FFFFFF' },
      { name: 'Primary Container', value: '#EADDFF' },
      { name: 'Secondary', value: '#625B71' },
      { name: 'Tertiary', value: '#7D5260' },
      { name: 'Error', value: '#B3261E' },
      { name: 'Background', value: '#FFFBFE' },
      { name: 'Surface', value: '#FFFBFE' }
    ],
    typography: [
      { name: 'Display Large', family: 'Roboto', size: '57px', weight: '400', preview: 'Display' },
      { name: 'Headline Large', family: 'Roboto', size: '32px', weight: '400', preview: 'Headline' },
      { name: 'Title Large', family: 'Roboto', size: '22px', weight: '500', preview: 'Title' },
      { name: 'Body Large', family: 'Roboto', size: '16px', weight: '400', preview: 'Body text' },
      { name: 'Label Large', family: 'Roboto', size: '14px', weight: '500', preview: 'Label' }
    ],
    componentsList: [
      { name: 'Button', category: 'Actions', preview: '<button style="padding:8px 16px;background:#6750A4;color:white;border:none;border-radius:20px">Button</button>' },
      { name: 'Card', category: 'Containment', preview: '<div style="padding:16px;background:white;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.1)">Card</div>' },
      { name: 'Chip', category: 'Selection', preview: '<span style="padding:4px 12px;background:#E8DEF8;border-radius:8px;font-size:14px">Chip</span>' },
      { name: 'FAB', category: 'Actions', preview: '<button style="width:56px;height:56px;background:#EADDFF;border-radius:16px;border:none">+</button>' }
    ],
    spacing: [
      { name: 'Extra Small', value: '4px' },
      { name: 'Small', value: '8px' },
      { name: 'Medium', value: '16px' },
      { name: 'Large', value: '24px' },
      { name: 'Extra Large', value: '32px' }
    ],
    borderRadius: [
      { name: 'None', value: '0' },
      { name: 'Extra Small', value: '4px' },
      { name: 'Small', value: '8px' },
      { name: 'Medium', value: '12px' },
      { name: 'Large', value: '16px' },
      { name: 'Full', value: '9999px' }
    ]
  },
  {
    id: 2,
    name: 'Apple HIG',
    version: 'v2.0',
    components: 38,
    colors: ['#007AFF', '#5856D6', '#FF2D55', '#FF9500'],
    colorPalette: [
      { name: 'Blue', value: '#007AFF' },
      { name: 'Purple', value: '#5856D6' },
      { name: 'Pink', value: '#FF2D55' },
      { name: 'Orange', value: '#FF9500' },
      { name: 'Green', value: '#34C759' },
      { name: 'Red', value: '#FF3B30' }
    ],
    typography: [
      { name: 'Large Title', family: 'SF Pro Display', size: '34px', weight: '700', preview: 'Large Title' },
      { name: 'Title 1', family: 'SF Pro Display', size: '28px', weight: '700', preview: 'Title' },
      { name: 'Headline', family: 'SF Pro Text', size: '17px', weight: '600', preview: 'Headline' },
      { name: 'Body', family: 'SF Pro Text', size: '17px', weight: '400', preview: 'Body text' }
    ],
    componentsList: [
      { name: 'Button', category: 'Controls', preview: '<button style="padding:8px 16px;background:#007AFF;color:white;border:none;border-radius:8px">Button</button>' },
      { name: 'Card', category: 'Views', preview: '<div style="padding:16px;background:#F2F2F7;border-radius:10px">Card</div>' }
    ],
    spacing: [
      { name: 'Small', value: '8px' },
      { name: 'Medium', value: '16px' },
      { name: 'Large', value: '24px' }
    ],
    borderRadius: [
      { name: 'Small', value: '8px' },
      { name: 'Medium', value: '10px' },
      { name: 'Large', value: '12px' },
      { name: 'Full', value: '9999px' }
    ]
  },
  {
    id: 3,
    name: 'Tailwind UI',
    version: 'v3.4',
    components: 52,
    colors: ['#0EA5E9', '#8B5CF6', '#EC4899', '#10B981'],
    colorPalette: [
      { name: 'Sky 500', value: '#0EA5E9' },
      { name: 'Violet 500', value: '#8B5CF6' },
      { name: 'Pink 500', value: '#EC4899' },
      { name: 'Emerald 500', value: '#10B981' },
      { name: 'Slate 900', value: '#0F172A' },
      { name: 'White', value: '#FFFFFF' }
    ],
    typography: [
      { name: 'text-4xl', family: 'Inter', size: '36px', weight: '800', preview: 'Heading' },
      { name: 'text-xl', family: 'Inter', size: '20px', weight: '600', preview: 'Subheading' },
      { name: 'text-base', family: 'Inter', size: '16px', weight: '400', preview: 'Body' }
    ],
    componentsList: [
      { name: 'Button', category: 'Forms', preview: '<button style="padding:8px 16px;background:#0EA5E9;color:white;border:none;border-radius:6px">Button</button>' },
      { name: 'Card', category: 'Layout', preview: '<div style="padding:16px;background:white;border:1px solid #E2E8F0;border-radius:8px">Card</div>' }
    ],
    spacing: [
      { name: '1', value: '4px' },
      { name: '2', value: '8px' },
      { name: '4', value: '16px' },
      { name: '8', value: '32px' }
    ],
    borderRadius: [
      { name: 'none', value: '0' },
      { name: 'sm', value: '2px' },
      { name: 'md', value: '6px' },
      { name: 'lg', value: '8px' },
      { name: 'xl', value: '12px' },
      { name: 'full', value: '9999px' }
    ]
  },
  {
    id: 4,
    name: 'Ant Design',
    version: 'v5.0',
    components: 60,
    colors: ['#1890FF', '#52C41A', '#FAAD14', '#FF4D4F'],
    colorPalette: [
      { name: 'Primary', value: '#1890FF' },
      { name: 'Success', value: '#52C41A' },
      { name: 'Warning', value: '#FAAD14' },
      { name: 'Error', value: '#FF4D4F' },
      { name: 'Text', value: '#262626' },
      { name: 'Background', value: '#F5F5F5' }
    ],
    typography: [
      { name: 'Heading 1', family: '-apple-system', size: '38px', weight: '600', preview: 'Heading' },
      { name: 'Heading 2', family: '-apple-system', size: '30px', weight: '600', preview: 'Heading' },
      { name: 'Body', family: '-apple-system', size: '14px', weight: '400', preview: 'Body text' }
    ],
    componentsList: [
      { name: 'Button', category: 'General', preview: '<button style="padding:4px 15px;background:#1890FF;color:white;border:none;border-radius:2px">Button</button>' },
      { name: 'Card', category: 'Data Display', preview: '<div style="padding:16px;background:white;border:1px solid #f0f0f0;border-radius:2px">Card</div>' }
    ],
    spacing: [
      { name: 'xs', value: '4px' },
      { name: 'sm', value: '8px' },
      { name: 'md', value: '16px' },
      { name: 'lg', value: '24px' }
    ],
    borderRadius: [
      { name: 'Small', value: '2px' },
      { name: 'Default', value: '4px' },
      { name: 'Large', value: '8px' }
    ]
  }
])

const filteredSystems = computed(() => {
  if (!searchQuery.value) return systems.value
  return systems.value.filter(s => 
    s.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectSystem = (system) => {
  selectedSystem.value = system
}

const importSystem = () => {
  // 导入设计系统
}

const createSystem = () => {
  // 创建新系统
}

const addColor = () => {
  // 添加颜色
}

const addFont = () => {
  // 添加字体
}

const addComponent = () => {
  // 添加组件
}
</script>

<style scoped>
.design-system {
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

.header-actions {
  display: flex;
  gap: var(--space-3);
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

.btn-ghost {
  color: var(--text-secondary);
}

.btn-ghost:hover {
  color: var(--text-primary);
  background: var(--bg-tertiary);
}

.system-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.system-sidebar {
  width: 300px;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-primary);
  display: flex;
  flex-direction: column;
}

.sidebar-search {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--border-primary);
}

.sidebar-search svg {
  width: 16px;
  height: 16px;
  color: var(--text-tertiary);
}

.sidebar-search input {
  flex: 1;
  font-size: var(--text-sm);
  color: var(--text-primary);
}

.sidebar-search input::placeholder {
  color: var(--text-tertiary);
}

.system-list {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-2);
}

.system-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.system-item:hover {
  background: var(--bg-tertiary);
}

.system-item.active {
  background: var(--accent-muted);
}

.system-colors {
  display: flex;
  gap: var(--space-1);
}

.color-dot {
  width: 12px;
  height: 12px;
  border-radius: var(--radius-full);
}

.system-info {
  flex: 1;
  min-width: 0;
}

.system-name {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-primary);
}

.system-meta {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.system-detail {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.detail-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.detail-tabs {
  display: flex;
  gap: var(--space-1);
  padding: var(--space-3) var(--space-6);
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-primary);
}

.tab-btn {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-secondary);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.tab-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.tab-btn.active {
  background: var(--accent-muted);
  color: var(--accent-primary);
}

.tab-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-6);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-5);
}

.section-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.colors-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}

.color-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.color-swatch {
  height: 80px;
}

.color-info {
  padding: var(--space-3);
}

.color-name {
  display: block;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.color-value {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  font-family: var(--font-mono);
}

.typography-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.typography-item {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.font-preview {
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.font-info {
  display: flex;
  justify-content: space-between;
}

.font-name {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
}

.font-details {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.components-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.component-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.component-preview {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  padding: var(--space-4);
}

.component-info {
  padding: var(--space-3);
}

.component-name {
  display: block;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.component-category {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.spacing-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.spacing-item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.spacing-visual {
  flex: 1;
}

.spacing-bar {
  height: 24px;
  background: var(--accent-primary);
  border-radius: var(--radius-sm);
}

.spacing-info {
  min-width: 120px;
}

.spacing-name {
  display: block;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.spacing-value {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  font-family: var(--font-mono);
}

.radius-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}

.radius-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  text-align: center;
}

.radius-preview {
  width: 80px;
  height: 80px;
  background: var(--accent-primary);
  margin: 0 auto var(--space-3);
}

.radius-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.radius-name {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
}

.radius-value {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  font-family: var(--font-mono);
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-8);
}

.empty-icon {
  width: 64px;
  height: 64px;
  color: var(--text-tertiary);
  margin-bottom: var(--space-4);
}

.empty-icon svg {
  width: 100%;
  height: 100%;
}

.empty-state h3 {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.empty-state p {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  text-align: center;
}

@media (max-width: 1024px) {
  .system-sidebar {
    width: 240px;
  }
  
  .colors-grid,
  .components-grid,
  .radius-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
