<template>
  <div class="home">
    <!-- 欢迎区域 -->
    <section class="welcome-section">
      <div class="welcome-content">
        <h1 class="welcome-title">
          Good {{ timeOfDay }}, <span class="highlight">Ren</span>
        </h1>
        <p class="welcome-subtitle">What would you like to design today?</p>
      </div>
      <div class="welcome-actions">
        <button class="btn btn-primary" @click="startNewProject">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Project
        </button>
        <button class="btn btn-secondary" @click="openTemplate">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
          Use Template
        </button>
      </div>
    </section>

    <!-- 快速开始 -->
    <section class="quick-start">
      <h2 class="section-title">Quick Start</h2>
      <div class="quick-grid">
        <div 
          v-for="item in quickStartItems" 
          :key="item.id"
          class="quick-card"
          @click="handleQuickStart(item)"
        >
          <div class="quick-icon" :style="{ background: item.gradient }">
            <div v-html="item.icon"></div>
          </div>
          <div class="quick-info">
            <h3 class="quick-title">{{ item.title }}</h3>
            <p class="quick-desc">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 最近项目 -->
    <section class="recent-projects">
      <div class="section-header">
        <h2 class="section-title">Recent Projects</h2>
        <button class="btn btn-ghost">View All</button>
      </div>
      <div class="projects-grid">
        <div 
          v-for="project in recentProjects" 
          :key="project.id"
          class="project-card"
          @click="openProject(project)"
        >
          <div class="project-preview" :style="{ background: project.color }">
            <div class="project-type">{{ project.type }}</div>
          </div>
          <div class="project-info">
            <h3 class="project-name">{{ project.name }}</h3>
            <div class="project-meta">
              <span class="project-time">{{ project.time }}</span>
              <span class="project-size">{{ project.size }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- AI 助手 -->
    <section class="ai-assistant">
      <div class="ai-card">
        <div class="ai-header">
          <div class="ai-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 22" />
              <path d="M12 2a4 4 0 0 0-4 4c0 1.95 1.4 3.58 3.25 3.93" />
              <circle cx="12" cy="14" r="4" />
            </svg>
          </div>
          <div>
            <h3 class="ai-title">DesignCraft AI</h3>
            <p class="ai-status">Ready to help</p>
          </div>
        </div>
        <div class="ai-input-area">
          <input 
            type="text" 
            placeholder="Describe what you want to design..."
            v-model="aiPrompt"
            @keyup.enter="generateDesign"
          />
          <button class="btn btn-primary" @click="generateDesign">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22,2 15,22 11,13 2,9" />
            </svg>
            Generate
          </button>
        </div>
        <div class="ai-suggestions">
          <span class="suggestion-label">Try:</span>
          <button 
            v-for="suggestion in suggestions" 
            :key="suggestion"
            class="suggestion-chip"
            @click="aiPrompt = suggestion"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>
    </section>

    <!-- 设计系统 -->
    <section class="design-systems">
      <div class="section-header">
        <h2 class="section-title">Design Systems</h2>
        <button class="btn btn-ghost">Browse All</button>
      </div>
      <div class="systems-scroll">
        <div 
          v-for="system in designSystems" 
          :key="system.id"
          class="system-card"
          @click="selectSystem(system)"
        >
          <div class="system-colors">
            <div 
              v-for="(color, i) in system.colors" 
              :key="i"
              class="color-dot"
              :style="{ background: color }"
            ></div>
          </div>
          <h3 class="system-name">{{ system.name }}</h3>
          <p class="system-desc">{{ system.description }}</p>
          <div class="system-stats">
            <span>{{ system.components }} components</span>
            <span>{{ system.tokens }} tokens</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const aiPrompt = ref('')

const timeOfDay = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  return 'evening'
})

const quickStartItems = [
  {
    id: 1,
    title: 'Web App',
    description: 'Create responsive web applications',
    gradient: 'linear-gradient(135deg, #6366F1, #818CF8)',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>'
  },
  {
    id: 2,
    title: 'Mobile App',
    description: 'Design native mobile experiences',
    gradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>'
  },
  {
    id: 3,
    title: 'Dashboard',
    description: 'Build data visualization dashboards',
    gradient: 'linear-gradient(135deg, #EC4899, #F472B6)',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>'
  },
  {
    id: 4,
    title: 'Landing Page',
    description: 'Create stunning landing pages',
    gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>'
  },
  {
    id: 5,
    title: 'Presentation',
    description: 'Design pitch decks and slides',
    gradient: 'linear-gradient(135deg, #10B981, #34D399)',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/></svg>'
  },
  {
    id: 6,
    title: 'Component Library',
    description: 'Build reusable UI components',
    gradient: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>'
  }
]

const recentProjects = [
  {
    id: 1,
    name: 'E-commerce Redesign',
    type: 'Web App',
    time: '2 hours ago',
    size: '12.4 MB',
    color: 'linear-gradient(135deg, #1a1a2e, #16213e)'
  },
  {
    id: 2,
    name: 'Fitness Tracker UI',
    type: 'Mobile App',
    time: '5 hours ago',
    size: '8.2 MB',
    color: 'linear-gradient(135deg, #2d1b69, #11998e)'
  },
  {
    id: 3,
    name: 'Analytics Dashboard',
    type: 'Dashboard',
    time: '1 day ago',
    size: '15.7 MB',
    color: 'linear-gradient(135deg, #0f0c29, #302b63)'
  },
  {
    id: 4,
    name: 'SaaS Landing Page',
    type: 'Landing Page',
    time: '2 days ago',
    size: '5.1 MB',
    color: 'linear-gradient(135deg, #1a1a2e, #e94560)'
  }
]

const suggestions = [
  'A modern dashboard with dark theme',
  'Minimalist e-commerce product page',
  'Social media app profile screen',
  'AI chat interface with sidebar'
]

const designSystems = [
  {
    id: 1,
    name: 'Material Design 3',
    description: 'Google\'s latest design system',
    components: 45,
    tokens: 120,
    colors: ['#6750A4', '#625B71', '#7D5260', '#B3261E']
  },
  {
    id: 2,
    name: 'Apple HIG',
    description: 'Human Interface Guidelines',
    components: 38,
    tokens: 95,
    colors: ['#007AFF', '#5856D6', '#FF2D55', '#FF9500']
  },
  {
    id: 3,
    name: 'Tailwind UI',
    description: 'Utility-first CSS framework',
    components: 52,
    tokens: 150,
    colors: ['#0EA5E9', '#8B5CF6', '#EC4899', '#10B981']
  },
  {
    id: 4,
    name: 'Ant Design',
    description: 'Enterprise-level UI design language',
    components: 60,
    tokens: 180,
    colors: ['#1890FF', '#52C41A', '#FAAD14', '#FF4D4F']
  }
]

const startNewProject = () => {
  router.push('/studio')
}

const openTemplate = () => {
  // 打开模板选择器
}

const handleQuickStart = (item) => {
  router.push('/studio')
}

const openProject = (project) => {
  router.push('/studio')
}

const generateDesign = () => {
  if (aiPrompt.value) {
    router.push('/studio')
  }
}

const selectSystem = (system) => {
  router.push('/design-system')
}
</script>

<style scoped>
.home {
  height: 100%;
  overflow-y: auto;
  padding: var(--space-8);
}

/* 欢迎区域 */
.welcome-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-10);
  padding: var(--space-8);
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-primary);
}

.welcome-title {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.highlight {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome-subtitle {
  font-size: var(--text-lg);
  color: var(--text-secondary);
}

.welcome-actions {
  display: flex;
  gap: var(--space-3);
}

/* 按钮 */
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
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.btn-secondary {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}

.btn-secondary:hover {
  background: var(--bg-elevated);
  border-color: var(--border-hover);
}

.btn-ghost {
  color: var(--text-secondary);
}

.btn-ghost:hover {
  color: var(--text-primary);
  background: var(--bg-tertiary);
}

/* 快速开始 */
.quick-start {
  margin-bottom: var(--space-10);
}

.section-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-5);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-5);
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.quick-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.quick-card:hover {
  background: var(--bg-tertiary);
  border-color: var(--border-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.quick-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.quick-icon :deep(svg) {
  width: 24px;
  height: 24px;
}

.quick-info {
  flex: 1;
  min-width: 0;
}

.quick-title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.quick-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

/* 最近项目 */
.recent-projects {
  margin-bottom: var(--space-10);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}

.project-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.project-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.project-preview {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.project-type {
  padding: var(--space-1) var(--space-3);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: var(--text-xs);
  font-weight: 500;
  border-radius: var(--radius-full);
  backdrop-filter: blur(8px);
}

.project-info {
  padding: var(--space-4);
}

.project-name {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.project-meta {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

/* AI 助手 */
.ai-assistant {
  margin-bottom: var(--space-10);
}

.ai-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
}

.ai-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}

.ai-avatar {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--accent-primary), #EC4899);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.ai-avatar svg {
  width: 24px;
  height: 24px;
}

.ai-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.ai-status {
  font-size: var(--text-sm);
  color: var(--accent-success);
}

.ai-input-area {
  display: flex;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.ai-input-area input {
  flex: 1;
  padding: var(--space-3) var(--space-4);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  color: var(--text-primary);
  transition: all var(--transition-fast);
}

.ai-input-area input:focus {
  border-color: var(--accent-primary);
  background: var(--bg-elevated);
}

.ai-input-area input::placeholder {
  color: var(--text-tertiary);
}

.ai-suggestions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.suggestion-label {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

.suggestion-chip {
  padding: var(--space-1) var(--space-3);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.suggestion-chip:hover {
  background: var(--accent-muted);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

/* 设计系统 */
.design-systems {
  margin-bottom: var(--space-10);
}

.systems-scroll {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}

.system-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.system-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.system-colors {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.color-dot {
  width: 24px;
  height: 24px;
  border-radius: var(--radius-full);
}

.system-name {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.system-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-3);
}

.system-stats {
  display: flex;
  gap: var(--space-4);
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

/* 响应式 */
@media (max-width: 1200px) {
  .quick-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .projects-grid,
  .systems-scroll {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .home {
    padding: var(--space-4);
  }
  
  .welcome-section {
    flex-direction: column;
    gap: var(--space-4);
    text-align: center;
  }
  
  .quick-grid,
  .projects-grid,
  .systems-scroll {
    grid-template-columns: 1fr;
  }
}
</style>
