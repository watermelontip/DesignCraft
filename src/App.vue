<template>
  <div class="app-layout">
    <!-- 侧边栏 -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="logo" @click="goHome">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span v-if="!sidebarCollapsed" class="logo-text">DesignCraft</span>
        </div>
        <button class="toggle-btn" @click="toggleSidebar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path v-if="sidebarCollapsed" d="M9 18l6-6-6-6" />
            <path v-else d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>
      
      <nav class="sidebar-nav">
        <router-link 
          v-for="item in navItems" 
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: isActive(item.path) }"
        >
          <div class="nav-icon" v-html="item.icon"></div>
          <span v-if="!sidebarCollapsed" class="nav-label">{{ item.label }}</span>
          <span v-if="item.badge && !sidebarCollapsed" class="nav-badge">{{ item.badge }}</span>
        </router-link>
      </nav>
      
      <div class="sidebar-footer">
        <div class="user-info" v-if="!sidebarCollapsed">
          <div class="user-avatar">R</div>
          <div class="user-details">
            <div class="user-name">Ren Echo</div>
            <div class="user-plan">Pro Plan</div>
          </div>
        </div>
        <button class="settings-btn" @click="goSettings">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>
    </aside>
    
    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 顶部工具栏 -->
      <header class="toolbar">
        <div class="toolbar-left">
          <div class="breadcrumb">
            <span class="breadcrumb-item">{{ currentPageTitle }}</span>
          </div>
        </div>
        
        <div class="toolbar-center">
          <div class="search-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input 
              type="text" 
              placeholder="Search anything... (⌘K)" 
              v-model="searchQuery"
            />
          </div>
        </div>
        
        <div class="toolbar-right">
          <button class="toolbar-btn" data-tooltip="Notifications">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span class="notification-dot"></span>
          </button>
          <button class="toolbar-btn" data-tooltip="Help">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
            </svg>
          </button>
        </div>
      </header>
      
      <!-- 路由视图 -->
      <div class="content-area">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const sidebarCollapsed = ref(false)
const searchQuery = ref('')

const navItems = [
  {
    path: '/',
    label: 'Home',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>'
  },
  {
    path: '/studio',
    label: 'Studio',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>',
    badge: '3'
  },
  {
    path: '/design-system',
    label: 'Design System',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>'
  },
  {
    path: '/plugins',
    label: 'Plugins',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    badge: '12'
  },
  {
    path: '/automation',
    label: 'Automation',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>'
  }
]

const currentPageTitle = computed(() => {
  const titles = {
    '/': 'Home',
    '/studio': 'Studio',
    '/design-system': 'Design System',
    '/plugins': 'Plugins',
    '/automation': 'Automation',
    '/settings': 'Settings'
  }
  return titles[route.path] || 'Home'
})

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const isActive = (path) => {
  return route.path === path
}

const goHome = () => {
  router.push('/')
}

const goSettings = () => {
  router.push('/settings')
}
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* 侧边栏 */
.sidebar {
  width: var(--sidebar-width);
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-primary);
  display: flex;
  flex-direction: column;
  transition: width var(--transition-normal);
  z-index: 100;
}

.sidebar.collapsed {
  width: var(--sidebar-collapsed);
}

.sidebar-header {
  height: var(--toolbar-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-3);
  border-bottom: 1px solid var(--border-primary);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  padding: var(--space-1);
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);
}

.logo:hover {
  background: var(--bg-tertiary);
}

.logo-icon {
  width: 24px;
  height: 24px;
  color: var(--accent-primary);
}

.logo-icon svg {
  width: 100%;
  height: 100%;
}

.logo-text {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
}

.toggle-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.toggle-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.toggle-btn svg {
  width: 16px;
  height: 16px;
}

/* 导航 */
.sidebar-nav {
  flex: 1;
  padding: var(--space-2);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--transition-fast);
  position: relative;
}

.nav-item:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.nav-item.active {
  background: var(--accent-muted);
  color: var(--accent-primary);
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  background: var(--accent-primary);
  border-radius: 0 var(--radius-full) var(--radius-full) 0;
}

.nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.nav-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.nav-label {
  font-size: var(--text-base);
  white-space: nowrap;
}

.nav-badge {
  margin-left: auto;
  padding: 2px 6px;
  background: var(--accent-primary);
  color: white;
  font-size: var(--text-xs);
  font-weight: 600;
  border-radius: var(--radius-full);
}

/* 底部 */
.sidebar-footer {
  padding: var(--space-3);
  border-top: 1px solid var(--border-primary);
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background var(--transition-fast);
}

.user-info:hover {
  background: var(--bg-tertiary);
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-hover));
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: var(--text-sm);
  color: white;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-plan {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.settings-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2);
  color: var(--text-secondary);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.settings-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.settings-btn svg {
  width: 20px;
  height: 20px;
}

/* 主内容区 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* 工具栏 */
.toolbar {
  height: var(--toolbar-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-4);
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-primary);
}

.toolbar-left {
  flex: 1;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.breadcrumb-item {
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--text-primary);
}

.toolbar-center {
  flex: 2;
  display: flex;
  justify-content: center;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  width: 100%;
  max-width: 400px;
  transition: all var(--transition-fast);
}

.search-bar:focus-within {
  border-color: var(--accent-primary);
  background: var(--bg-elevated);
}

.search-bar svg {
  width: 16px;
  height: 16px;
  color: var(--text-tertiary);
  flex-shrink: 0;
}

.search-bar input {
  flex: 1;
  font-size: var(--text-sm);
  color: var(--text-primary);
}

.search-bar input::placeholder {
  color: var(--text-tertiary);
}

.toolbar-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-2);
}

.toolbar-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  position: relative;
}

.toolbar-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.toolbar-btn svg {
  width: 18px;
  height: 18px;
}

.notification-dot {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 6px;
  height: 6px;
  background: var(--accent-error);
  border-radius: var(--radius-full);
}

/* 内容区 */
.content-area {
  flex: 1;
  overflow: hidden;
  background: var(--bg-primary);
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-fast);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform var(--transition-normal);
  }
  
  .sidebar.open {
    transform: translateX(0);
  }
  
  .toolbar-center {
    display: none;
  }
}
</style>
