<template>
  <div class="settings">
    <header class="page-header">
      <h1 class="page-title">Settings</h1>
    </header>

    <div class="settings-content">
      <!-- 设置导航 -->
      <nav class="settings-nav">
        <button 
          v-for="section in sections" 
          :key="section.id"
          class="nav-item"
          :class="{ active: activeSection === section.id }"
          @click="activeSection = section.id"
        >
          <div class="nav-icon" v-html="section.icon"></div>
          <span class="nav-label">{{ section.label }}</span>
        </button>
      </nav>

      <!-- 设置内容 -->
      <main class="settings-main">
        <!-- 通用设置 -->
        <div v-if="activeSection === 'general'" class="settings-section">
          <h2 class="section-title">General</h2>
          
          <div class="setting-group">
            <h3 class="group-title">Appearance</h3>
            <div class="setting-item">
              <div class="setting-info">
                <label class="setting-label">Theme</label>
                <p class="setting-desc">Choose your preferred theme</p>
              </div>
              <select v-model="settings.theme" class="setting-select">
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <label class="setting-label">Accent Color</label>
                <p class="setting-desc">Primary color for the interface</p>
              </div>
              <div class="color-options">
                <button 
                  v-for="color in accentColors" 
                  :key="color"
                  class="color-option"
                  :class="{ active: settings.accentColor === color }"
                  :style="{ background: color }"
                  @click="settings.accentColor = color"
                ></button>
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <label class="setting-label">Font Size</label>
                <p class="setting-desc">Adjust the interface font size</p>
              </div>
              <div class="font-size-options">
                <button 
                  v-for="size in fontSizes" 
                  :key="size.value"
                  class="size-option"
                  :class="{ active: settings.fontSize === size.value }"
                  @click="settings.fontSize = size.value"
                >
                  {{ size.label }}
                </button>
              </div>
            </div>
          </div>

          <div class="setting-group">
            <h3 class="group-title">Language</h3>
            <div class="setting-item">
              <div class="setting-info">
                <label class="setting-label">Language</label>
                <p class="setting-desc">Select your preferred language</p>
              </div>
              <select v-model="settings.language" class="setting-select">
                <option value="en">English</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
                <option value="ko">한국어</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 编辑器设置 -->
        <div v-if="activeSection === 'editor'" class="settings-section">
          <h2 class="section-title">Editor</h2>
          
          <div class="setting-group">
            <h3 class="group-title">Canvas</h3>
            <div class="setting-item">
              <div class="setting-info">
                <label class="setting-label">Show Grid</label>
                <p class="setting-desc">Display grid on canvas</p>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="settings.showGrid" />
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <label class="setting-label">Snap to Grid</label>
                <p class="setting-desc">Align objects to grid</p>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="settings.snapToGrid" />
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <label class="setting-label">Grid Size</label>
                <p class="setting-desc">Distance between grid lines</p>
              </div>
              <select v-model="settings.gridSize" class="setting-select">
                <option value="8">8px</option>
                <option value="16">16px</option>
                <option value="24">24px</option>
                <option value="32">32px</option>
              </select>
            </div>
          </div>

          <div class="setting-group">
            <h3 class="group-title">Performance</h3>
            <div class="setting-item">
              <div class="setting-info">
                <label class="setting-label">Hardware Acceleration</label>
                <p class="setting-desc">Use GPU for rendering</p>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="settings.hardwareAcceleration" />
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <label class="setting-label">Auto Save</label>
                <p class="setting-desc">Automatically save changes</p>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="settings.autoSave" />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- AI 设置 -->
        <div v-if="activeSection === 'ai'" class="settings-section">
          <h2 class="section-title">AI</h2>
          
          <div class="setting-group">
            <h3 class="group-title">Model</h3>
            <div class="setting-item">
              <div class="setting-info">
                <label class="setting-label">AI Provider</label>
                <p class="setting-desc">Select your AI service provider</p>
              </div>
              <select v-model="settings.aiProvider" class="setting-select">
                <option value="openai">OpenAI</option>
                <option value="anthropic">Anthropic</option>
                <option value="google">Google</option>
                <option value="local">Local Model</option>
              </select>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <label class="setting-label">API Key</label>
                <p class="setting-desc">Your API key for the selected provider</p>
              </div>
              <input 
                type="password" 
                v-model="settings.apiKey" 
                class="setting-input"
                placeholder="Enter your API key"
              />
            </div>
          </div>

          <div class="setting-group">
            <h3 class="group-title">Generation</h3>
            <div class="setting-item">
              <div class="setting-info">
                <label class="setting-label">Default Style</label>
                <p class="setting-desc">Default style for AI generation</p>
              </div>
              <select v-model="settings.defaultStyle" class="setting-select">
                <option value="modern">Modern</option>
                <option value="minimal">Minimal</option>
                <option value="playful">Playful</option>
                <option value="professional">Professional</option>
              </select>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <label class="setting-label">Creativity Level</label>
                <p class="setting-desc">How creative should AI be</p>
              </div>
              <input 
                type="range" 
                v-model="settings.creativity" 
                min="0" 
                max="100" 
                class="setting-range"
              />
              <span class="range-value">{{ settings.creativity }}%</span>
            </div>
          </div>
        </div>

        <!-- 快捷键设置 -->
        <div v-if="activeSection === 'shortcuts'" class="settings-section">
          <h2 class="section-title">Keyboard Shortcuts</h2>
          
          <div class="shortcuts-list">
            <div 
              v-for="shortcut in shortcuts" 
              :key="shortcut.action"
              class="shortcut-item"
            >
              <span class="shortcut-action">{{ shortcut.action }}</span>
              <div class="shortcut-keys">
                <kbd v-for="key in shortcut.keys" :key="key">{{ key }}</kbd>
              </div>
            </div>
          </div>
        </div>

        <!-- 存储设置 -->
        <div v-if="activeSection === 'storage'" class="settings-section">
          <h2 class="section-title">Storage</h2>
          
          <div class="setting-group">
            <h3 class="group-title">Local Storage</h3>
            <div class="storage-info">
              <div class="storage-bar">
                <div class="storage-used" :style="{ width: '45%' }"></div>
              </div>
              <div class="storage-details">
                <span>4.5 GB used of 10 GB</span>
                <button class="btn btn-ghost" @click="clearStorage">Clear Cache</button>
              </div>
            </div>
          </div>

          <div class="setting-group">
            <h3 class="group-title">Backup</h3>
            <div class="setting-item">
              <div class="setting-info">
                <label class="setting-label">Auto Backup</label>
                <p class="setting-desc">Automatically backup your projects</p>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="settings.autoBackup" />
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <label class="setting-label">Backup Location</label>
                <p class="setting-desc">Where to store backups</p>
              </div>
              <button class="btn btn-secondary" @click="selectBackupLocation">
                Choose Location
              </button>
            </div>
          </div>
        </div>

        <!-- 关于 -->
        <div v-if="activeSection === 'about'" class="settings-section">
          <h2 class="section-title">About DesignCraft</h2>
          
          <div class="about-content">
            <div class="about-logo">
              <div class="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>DesignCraft</h3>
              <p class="version">Version 1.0.0</p>
            </div>
            <div class="about-links">
              <a href="#" class="about-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                GitHub
              </a>
              <a href="#" class="about-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
                Twitter
              </a>
              <a href="#" class="about-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                Discord
              </a>
            </div>
            <p class="about-copyright">© 2024 DesignCraft. All rights reserved.</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const activeSection = ref('general')

const sections = [
  {
    id: 'general',
    label: 'General',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
  },
  {
    id: 'editor',
    label: 'Editor',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>'
  },
  {
    id: 'ai',
    label: 'AI',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 22"/><path d="M12 2a4 4 0 0 0-4 4c0 1.95 1.4 3.58 3.25 3.93"/><circle cx="12" cy="14" r="4"/></svg>'
  },
  {
    id: 'shortcuts',
    label: 'Shortcuts',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.001M10 8h.001M14 8h.001M18 8h.001M8 12h.001M12 12h.001M16 12h.001M7 16h10"/></svg>'
  },
  {
    id: 'storage',
    label: 'Storage',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>'
  },
  {
    id: 'about',
    label: 'About',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>'
  }
]

const accentColors = ['#6366F1', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#3B82F6']

const fontSizes = [
  { value: 'small', label: 'S' },
  { value: 'medium', label: 'M' },
  { value: 'large', label: 'L' }
]

const shortcuts = [
  { action: 'Select All', keys: ['⌘', 'A'] },
  { action: 'Copy', keys: ['⌘', 'C'] },
  { action: 'Paste', keys: ['⌘', 'V'] },
  { action: 'Undo', keys: ['⌘', 'Z'] },
  { action: 'Redo', keys: ['⌘', '⇧', 'Z'] },
  { action: 'Delete', keys: ['⌫'] },
  { action: 'Zoom In', keys: ['⌘', '+'] },
  { action: 'Zoom Out', keys: ['⌘', '-'] },
  { action: 'Fit to Screen', keys: ['⌘', '1'] },
  { action: 'Toggle Grid', keys: ['⌘', 'G'] },
  { action: 'Toggle Rulers', keys: ['⌘', 'R'] },
  { action: 'Save', keys: ['⌘', 'S'] }
]

const settings = reactive({
  theme: 'dark',
  accentColor: '#6366F1',
  fontSize: 'medium',
  language: 'en',
  showGrid: true,
  snapToGrid: true,
  gridSize: '16',
  hardwareAcceleration: true,
  autoSave: true,
  aiProvider: 'openai',
  apiKey: '',
  defaultStyle: 'modern',
  creativity: 75,
  autoBackup: true
})

const clearStorage = () => {
  // 清除缓存
}

const selectBackupLocation = () => {
  // 选择备份位置
}
</script>

<style scoped>
.settings {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.page-header {
  padding: var(--space-6) var(--space-8);
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-primary);
}

.page-title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--text-primary);
}

.settings-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.settings-nav {
  width: 240px;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-primary);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.nav-item:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.nav-item.active {
  background: var(--accent-muted);
  color: var(--accent-primary);
}

.nav-icon {
  width: 20px;
  height: 20px;
}

.nav-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.nav-label {
  font-size: var(--text-sm);
  font-weight: 500;
}

.settings-main {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-8);
}

.settings-section {
  max-width: 800px;
}

.section-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-6);
}

.setting-group {
  margin-bottom: var(--space-8);
}

.group-title {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--border-primary);
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) 0;
}

.setting-info {
  flex: 1;
}

.setting-label {
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--text-primary);
  display: block;
  margin-bottom: var(--space-1);
}

.setting-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.setting-select {
  padding: var(--space-2) var(--space-3);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--text-sm);
  min-width: 150px;
}

.setting-select:focus {
  border-color: var(--accent-primary);
  outline: none;
}

.setting-input {
  padding: var(--space-2) var(--space-3);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--text-sm);
  width: 300px;
}

.setting-input:focus {
  border-color: var(--accent-primary);
  outline: none;
}

.setting-input::placeholder {
  color: var(--text-tertiary);
}

.setting-range {
  width: 200px;
  height: 4px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  appearance: none;
  -webkit-appearance: none;
}

.setting-range::-webkit-slider-thumb {
  width: 16px;
  height: 16px;
  background: var(--accent-primary);
  border-radius: var(--radius-full);
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
}

.range-value {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  min-width: 40px;
  text-align: right;
}

.color-options {
  display: flex;
  gap: var(--space-2);
}

.color-option {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.active {
  border-color: white;
  box-shadow: 0 0 0 2px var(--accent-primary);
}

.font-size-options {
  display: flex;
  gap: var(--space-2);
}

.size-option {
  padding: var(--space-2) var(--space-4);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: var(--text-sm);
  transition: all var(--transition-fast);
}

.size-option:hover {
  background: var(--bg-elevated);
  color: var(--text-primary);
}

.size-option.active {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
  color: white;
}

.toggle {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  transition: var(--transition-fast);
}

.toggle-slider::before {
  content: '';
  position: absolute;
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background: white;
  border-radius: var(--radius-full);
  transition: var(--transition-fast);
}

.toggle input:checked + .toggle-slider {
  background: var(--accent-primary);
}

.toggle input:checked + .toggle-slider::before {
  transform: translateX(20px);
}

/* 快捷键 */
.shortcuts-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.shortcut-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
}

.shortcut-action {
  font-size: var(--text-sm);
  color: var(--text-primary);
}

.shortcut-keys {
  display: flex;
  gap: var(--space-1);
}

kbd {
  padding: var(--space-1) var(--space-2);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  color: var(--text-secondary);
  min-width: 24px;
  text-align: center;
}

/* 存储 */
.storage-info {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.storage-bar {
  height: 8px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-3);
  overflow: hidden;
}

.storage-used {
  height: 100%;
  background: var(--accent-primary);
  border-radius: var(--radius-full);
  transition: width var(--transition-slow);
}

.storage-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.storage-details span {
  font-size: var(--text-sm);
  color: var(--text-secondary);
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

.btn-ghost {
  color: var(--text-secondary);
}

.btn-ghost:hover {
  color: var(--text-primary);
  background: var(--bg-tertiary);
}

.btn-secondary {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}

.btn-secondary:hover {
  background: var(--bg-elevated);
}

/* 关于 */
.about-content {
  text-align: center;
  padding: var(--space-8);
}

.about-logo {
  margin-bottom: var(--space-8);
}

.logo-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-hover));
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-4);
  color: white;
}

.logo-icon svg {
  width: 32px;
  height: 32px;
}

.about-logo h3 {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.version {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

.about-links {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.about-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.about-link:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border-color: var(--border-hover);
}

.about-link svg {
  width: 18px;
  height: 18px;
}

.about-copyright {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

@media (max-width: 768px) {
  .settings-nav {
    width: 60px;
  }
  
  .nav-label {
    display: none;
  }
  
  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }
  
  .setting-select,
  .setting-input {
    width: 100%;
  }
}
</style>
