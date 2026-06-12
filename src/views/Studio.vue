<template>
  <div class="studio">
    <!-- 左侧工具面板 -->
    <aside class="tools-panel">
      <div class="panel-header">
        <h3 class="panel-title">Tools</h3>
      </div>
      <div class="tools-list">
        <button 
          v-for="tool in tools" 
          :key="tool.id"
          class="tool-btn"
          :class="{ active: activeTool === tool.id }"
          @click="activeTool = tool.id"
          :data-tooltip="tool.name"
        >
          <div v-html="tool.icon"></div>
        </button>
      </div>
      <div class="panel-section">
        <h4 class="section-label">Layers</h4>
        <div class="layers-list">
          <div 
            v-for="layer in layers" 
            :key="layer.id"
            class="layer-item"
            :class="{ selected: selectedLayer === layer.id }"
            @click="selectedLayer = layer.id"
          >
            <div class="layer-icon" v-html="layer.icon"></div>
            <span class="layer-name">{{ layer.name }}</span>
            <div class="layer-actions">
              <button class="layer-action" @click.stop="toggleVisibility(layer)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path v-if="layer.visible" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <path v-else d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- 画布区域 -->
    <div class="canvas-area">
      <!-- 画布工具栏 -->
      <div class="canvas-toolbar">
        <div class="toolbar-left">
          <button class="canvas-btn" @click="zoomOut">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
          <span class="zoom-level">{{ zoomLevel }}%</span>
          <button class="canvas-btn" @click="zoomIn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
          <button class="canvas-btn" @click="fitToScreen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          </button>
        </div>
        <div class="toolbar-center">
          <span class="canvas-info">{{ canvasWidth }} × {{ canvasHeight }}</span>
        </div>
        <div class="toolbar-right">
          <button class="canvas-btn" :class="{ active: showGrid }" @click="showGrid = !showGrid">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="3" y1="15" x2="21" y2="15" />
              <line x1="9" y1="3" x2="9" y2="21" />
              <line x1="15" y1="3" x2="15" y2="21" />
            </svg>
          </button>
          <button class="canvas-btn" @click="togglePreview">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 画布 -->
      <div class="canvas-container" @wheel="handleWheel">
        <div 
          class="canvas" 
          :style="{ 
            transform: `scale(${zoomLevel / 100})`,
            width: canvasWidth + 'px',
            height: canvasHeight + 'px'
          }"
        >
          <div class="canvas-content">
            <!-- 网格 -->
            <div v-if="showGrid" class="grid-overlay"></div>
            
            <!-- 设计内容 -->
            <div class="design-preview">
              <div class="preview-header">
                <div class="preview-logo">DC</div>
                <div class="preview-nav">
                  <span>Home</span>
                  <span>Features</span>
                  <span>Pricing</span>
                  <span>About</span>
                </div>
                <button class="preview-cta">Get Started</button>
              </div>
              <div class="preview-hero">
                <h1>Build Beautiful UIs</h1>
                <p>DesignCraft helps you create stunning interfaces with AI</p>
                <div class="preview-buttons">
                  <button class="preview-btn-primary">Start Designing</button>
                  <button class="preview-btn-secondary">Learn More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧属性面板 -->
    <aside class="properties-panel">
      <div class="panel-header">
        <h3 class="panel-title">Properties</h3>
        <button class="panel-close" @click="showProperties = false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      
      <div class="panel-content">
        <!-- 设计属性 -->
        <div class="property-section">
          <h4 class="section-title">Design</h4>
          <div class="property-group">
            <div class="property-row">
              <label>X</label>
              <input type="number" v-model="properties.x" />
            </div>
            <div class="property-row">
              <label>Y</label>
              <input type="number" v-model="properties.y" />
            </div>
            <div class="property-row">
              <label>W</label>
              <input type="number" v-model="properties.width" />
            </div>
            <div class="property-row">
              <label>H</label>
              <input type="number" v-model="properties.height" />
            </div>
          </div>
        </div>

        <!-- 填充 -->
        <div class="property-section">
          <h4 class="section-title">Fill</h4>
          <div class="color-picker">
            <div class="color-preview" :style="{ background: fillColor }"></div>
            <input type="text" v-model="fillColor" />
          </div>
        </div>

        <!-- 描边 -->
        <div class="property-section">
          <h4 class="section-title">Stroke</h4>
          <div class="color-picker">
            <div class="color-preview" :style="{ background: strokeColor }"></div>
            <input type="text" v-model="strokeColor" />
          </div>
          <div class="property-row">
            <label>Width</label>
            <input type="number" v-model="strokeWidth" />
          </div>
        </div>

        <!-- 圆角 -->
        <div class="property-section">
          <h4 class="section-title">Corner Radius</h4>
          <div class="property-row">
            <input type="range" v-model="cornerRadius" min="0" max="100" />
            <span>{{ cornerRadius }}px</span>
          </div>
        </div>

        <!-- 阴影 -->
        <div class="property-section">
          <h4 class="section-title">Shadow</h4>
          <div class="property-row">
            <label>X</label>
            <input type="number" v-model="shadow.x" />
          </div>
          <div class="property-row">
            <label>Y</label>
            <input type="number" v-model="shadow.y" />
          </div>
          <div class="property-row">
            <label>Blur</label>
            <input type="number" v-model="shadow.blur" />
          </div>
          <div class="color-picker">
            <div class="color-preview" :style="{ background: shadow.color }"></div>
            <input type="text" v-model="shadow.color" />
          </div>
        </div>

        <!-- 不透明度 -->
        <div class="property-section">
          <h4 class="section-title">Opacity</h4>
          <div class="property-row">
            <input type="range" v-model="opacity" min="0" max="100" />
            <span>{{ opacity }}%</span>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const activeTool = ref('select')
const selectedLayer = ref(1)
const zoomLevel = ref(100)
const showGrid = ref(true)
const showProperties = ref(true)

const canvasWidth = ref(1440)
const canvasHeight = ref(900)

const fillColor = ref('#6366F1')
const strokeColor = ref('#2A2A2E')
const strokeWidth = ref(1)
const cornerRadius = ref(8)
const opacity = ref(100)

const shadow = reactive({
  x: 0,
  y: 4,
  blur: 12,
  color: 'rgba(0,0,0,0.4)'
})

const properties = reactive({
  x: 0,
  y: 0,
  width: 1440,
  height: 900
})

const tools = [
  {
    id: 'select',
    name: 'Select',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>'
  },
  {
    id: 'frame',
    name: 'Frame',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>'
  },
  {
    id: 'rectangle',
    name: 'Rectangle',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>'
  },
  {
    id: 'ellipse',
    name: 'Ellipse',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>'
  },
  {
    id: 'line',
    name: 'Line',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="19" x2="19" y2="5"/></svg>'
  },
  {
    id: 'pen',
    name: 'Pen',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>'
  },
  {
    id: 'text',
    name: 'Text',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4,7 4,4 20,4 20,7"/><line x1="9.5" y1="20" x2="14.5" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>'
  },
  {
    id: 'hand',
    name: 'Hand',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 11V6a2 2 0 0 0-4 0v1M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 0 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>'
  }
]

const layers = [
  {
    id: 1,
    name: 'Header',
    visible: true,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>'
  },
  {
    id: 2,
    name: 'Hero Section',
    visible: true,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>'
  },
  {
    id: 3,
    name: 'Features',
    visible: true,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>'
  },
  {
    id: 4,
    name: 'Footer',
    visible: true,
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>'
  }
]

const toggleVisibility = (layer) => {
  layer.visible = !layer.visible
}

const zoomIn = () => {
  zoomLevel.value = Math.min(zoomLevel.value + 10, 200)
}

const zoomOut = () => {
  zoomLevel.value = Math.max(zoomLevel.value - 10, 10)
}

const fitToScreen = () => {
  zoomLevel.value = 100
}

const togglePreview = () => {
  // 切换预览模式
}

const handleWheel = (e) => {
  if (e.ctrlKey) {
    e.preventDefault()
    if (e.deltaY < 0) {
      zoomIn()
    } else {
      zoomOut()
    }
  }
}
</script>

<style scoped>
.studio {
  display: flex;
  height: 100%;
  overflow: hidden;
}

/* 工具面板 */
.tools-panel {
  width: 240px;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-primary);
  display: flex;
  flex-direction: column;
}

.panel-header {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-4);
  border-bottom: 1px solid var(--border-primary);
}

.panel-title {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-primary);
}

.panel-close {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-tertiary);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.panel-close:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.panel-close svg {
  width: 14px;
  height: 14px;
}

.tools-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  padding: var(--space-3);
  border-bottom: 1px solid var(--border-primary);
}

.tool-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.tool-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.tool-btn.active {
  background: var(--accent-muted);
  color: var(--accent-primary);
}

.tool-btn :deep(svg) {
  width: 18px;
  height: 18px;
}

.panel-section {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-3);
}

.section-label {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--space-2);
}

.layers-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.layer-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.layer-item:hover {
  background: var(--bg-tertiary);
}

.layer-item.selected {
  background: var(--accent-muted);
}

.layer-icon {
  width: 16px;
  height: 16px;
  color: var(--text-tertiary);
}

.layer-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.layer-name {
  flex: 1;
  font-size: var(--text-sm);
  color: var(--text-primary);
}

.layer-actions {
  display: flex;
  gap: var(--space-1);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.layer-item:hover .layer-actions {
  opacity: 1;
}

.layer-action {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-tertiary);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.layer-action:hover {
  background: var(--bg-elevated);
  color: var(--text-primary);
}

.layer-action svg {
  width: 12px;
  height: 12px;
}

/* 画布区域 */
.canvas-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.canvas-toolbar {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-4);
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-primary);
}

.toolbar-left,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.toolbar-center {
  flex: 1;
  text-align: center;
}

.canvas-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.canvas-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.canvas-btn.active {
  background: var(--accent-muted);
  color: var(--accent-primary);
}

.canvas-btn svg {
  width: 18px;
  height: 18px;
}

.zoom-level {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  min-width: 40px;
  text-align: center;
}

.canvas-info {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

.canvas-container {
  flex: 1;
  overflow: auto;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8);
}

.canvas {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  position: relative;
  transform-origin: center center;
}

.canvas-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none;
}

/* 设计预览 */
.design-preview {
  width: 100%;
  height: 100%;
  background: #0f172a;
  color: white;
  overflow: hidden;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(8px);
}

.preview-logo {
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.preview-nav {
  display: flex;
  gap: 24px;
  font-size: 14px;
  color: rgba(255,255,255,0.7);
}

.preview-cta {
  padding: 8px 20px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.preview-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 64px);
  text-align: center;
  padding: 40px;
}

.preview-hero h1 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #fff, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.preview-hero p {
  font-size: 18px;
  color: rgba(255,255,255,0.6);
  margin-bottom: 32px;
}

.preview-buttons {
  display: flex;
  gap: 16px;
}

.preview-btn-primary {
  padding: 12px 32px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.preview-btn-secondary {
  padding: 12px 32px;
  background: transparent;
  color: white;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

/* 属性面板 */
.properties-panel {
  width: 280px;
  background: var(--bg-secondary);
  border-left: 1px solid var(--border-primary);
  display: flex;
  flex-direction: column;
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-3);
}

.property-section {
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-primary);
}

.property-section:last-child {
  border-bottom: none;
}

.section-title {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--space-3);
}

.property-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2);
}

.property-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.property-row label {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  min-width: 24px;
}

.property-row input[type="number"] {
  flex: 1;
  padding: var(--space-1) var(--space-2);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  color: var(--text-primary);
  transition: all var(--transition-fast);
}

.property-row input[type="number"]:focus {
  border-color: var(--accent-primary);
  background: var(--bg-elevated);
}

.property-row input[type="range"] {
  flex: 1;
  height: 4px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  appearance: none;
  -webkit-appearance: none;
}

.property-row input[type="range"]::-webkit-slider-thumb {
  width: 14px;
  height: 14px;
  background: var(--accent-primary);
  border-radius: var(--radius-full);
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
}

.property-row span {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  min-width: 40px;
  text-align: right;
}

.color-picker {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.color-preview {
  width: 24px;
  height: 24px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-primary);
}

.color-picker input {
  flex: 1;
  padding: var(--space-1) var(--space-2);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  color: var(--text-primary);
  font-family: var(--font-mono);
}

.color-picker input:focus {
  border-color: var(--accent-primary);
  background: var(--bg-elevated);
}

/* 响应式 */
@media (max-width: 1024px) {
  .tools-panel {
    width: 48px;
  }
  
  .panel-section {
    display: none;
  }
  
  .properties-panel {
    width: 240px;
  }
}
</style>
