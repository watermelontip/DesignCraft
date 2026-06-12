<template>
  <div class="automation">
    <header class="page-header">
      <div class="header-left">
        <h1 class="page-title">Automation</h1>
        <p class="page-desc">Create and manage design workflows</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary" @click="createAutomation">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Automation
        </button>
      </div>
    </header>

    <div class="automation-content">
      <!-- 自动化列表 -->
      <div class="automations-list">
        <div 
          v-for="automation in automations" 
          :key="automation.id"
          class="automation-card"
          :class="{ active: selectedAutomation?.id === automation.id }"
          @click="selectAutomation(automation)"
        >
          <div class="automation-header">
            <div class="automation-icon" :style="{ background: automation.color }">
              <div v-html="automation.icon"></div>
            </div>
            <div class="automation-status" :class="automation.status">
              {{ automation.status }}
            </div>
          </div>
          <div class="automation-info">
            <h3 class="automation-name">{{ automation.name }}</h3>
            <p class="automation-desc">{{ automation.description }}</p>
          </div>
          <div class="automation-meta">
            <span class="meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              {{ automation.lastRun }}
            </span>
            <span class="meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
              </svg>
              {{ automation.runs }} runs
            </span>
          </div>
          <div class="automation-actions">
            <button class="action-btn" @click.stop="runAutomation(automation)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </button>
            <button class="action-btn" @click.stop="editAutomation(automation)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button class="action-btn" @click.stop="deleteAutomation(automation)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3,6 5,6 21,6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- 详情面板 -->
      <aside class="detail-panel" v-if="selectedAutomation">
        <div class="panel-header">
          <h2 class="panel-title">{{ selectedAutomation.name }}</h2>
          <button class="panel-close" @click="selectedAutomation = null">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        
        <div class="panel-content">
          <!-- 工作流步骤 -->
          <div class="section">
            <h3 class="section-title">Workflow Steps</h3>
            <div class="steps-list">
              <div 
                v-for="(step, index) in selectedAutomation.steps" 
                :key="index"
                class="step-item"
              >
                <div class="step-number">{{ index + 1 }}</div>
                <div class="step-content">
                  <h4 class="step-title">{{ step.title }}</h4>
                  <p class="step-desc">{{ step.description }}</p>
                </div>
                <div class="step-status" :class="step.status">
                  {{ step.status }}
                </div>
              </div>
            </div>
          </div>

          <!-- 触发器 -->
          <div class="section">
            <h3 class="section-title">Trigger</h3>
            <div class="trigger-card">
              <div class="trigger-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
                </svg>
              </div>
              <div class="trigger-info">
                <h4>{{ selectedAutomation.trigger.type }}</h4>
                <p>{{ selectedAutomation.trigger.description }}</p>
              </div>
            </div>
          </div>

          <!-- 运行历史 -->
          <div class="section">
            <h3 class="section-title">Run History</h3>
            <div class="history-list">
              <div 
                v-for="run in selectedAutomation.history" 
                :key="run.id"
                class="history-item"
              >
                <div class="history-status" :class="run.status"></div>
                <div class="history-info">
                  <span class="history-time">{{ run.time }}</span>
                  <span class="history-duration">{{ run.duration }}</span>
                </div>
                <span class="history-result">{{ run.result }}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedAutomation = ref(null)

const automations = ref([
  {
    id: 1,
    name: 'Daily Design Report',
    description: 'Generate daily design metrics and insights',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    color: 'linear-gradient(135deg, #6366F1, #818CF8)',
    status: 'active',
    lastRun: '2 hours ago',
    runs: 45,
    trigger: {
      type: 'Schedule',
      description: 'Runs every day at 9:00 AM'
    },
    steps: [
      { title: 'Collect Metrics', description: 'Gather design system usage data', status: 'completed' },
      { title: 'Analyze Trends', description: 'Identify patterns and improvements', status: 'completed' },
      { title: 'Generate Report', description: 'Create visual report with insights', status: 'running' },
      { title: 'Send Notification', description: 'Email report to team', status: 'pending' }
    ],
    history: [
      { id: 1, time: 'Today, 9:00 AM', duration: '2m 30s', status: 'success', result: 'Report sent' },
      { id: 2, time: 'Yesterday, 9:00 AM', duration: '2m 15s', status: 'success', result: 'Report sent' },
      { id: 3, time: '2 days ago, 9:00 AM', duration: '3m 10s', status: 'error', result: 'API timeout' }
    ]
  },
  {
    id: 2,
    name: 'Component Sync',
    description: 'Sync components across design systems',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="23,4 23,10 17,10" /><polyline points="1,20 1,14 7,14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>',
    color: 'linear-gradient(135deg, #10B981, #34D399)',
    status: 'active',
    lastRun: '5 hours ago',
    runs: 128,
    trigger: {
      type: 'Event',
      description: 'Triggered when component is updated'
    },
    steps: [
      { title: 'Detect Changes', description: 'Monitor component updates', status: 'completed' },
      { title: 'Validate', description: 'Check for breaking changes', status: 'completed' },
      { title: 'Sync', description: 'Push updates to all systems', status: 'completed' }
    ],
    history: [
      { id: 1, time: '5 hours ago', duration: '45s', status: 'success', result: '3 components synced' },
      { id: 2, time: '1 day ago', duration: '30s', status: 'success', result: '1 component synced' }
    ]
  },
  {
    id: 3,
    name: 'Accessibility Audit',
    description: 'Run automated accessibility checks',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    color: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
    status: 'paused',
    lastRun: '1 day ago',
    runs: 23,
    trigger: {
      type: 'Manual',
      description: 'Run manually or on PR creation'
    },
    steps: [
      { title: 'Scan', description: 'Analyze all design files', status: 'completed' },
      { title: 'Check WCAG', description: 'Validate against WCAG 2.1', status: 'completed' },
      { title: 'Report', description: 'Generate accessibility report', status: 'completed' }
    ],
    history: [
      { id: 1, time: '1 day ago', duration: '5m 20s', status: 'success', result: '12 issues found' }
    ]
  },
  {
    id: 4,
    name: 'Image Optimization',
    description: 'Automatically optimize exported images',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>',
    color: 'linear-gradient(135deg, #EC4899, #F472B6)',
    status: 'active',
    lastRun: '30 minutes ago',
    runs: 567,
    trigger: {
      type: 'Event',
      description: 'Triggered on image export'
    },
    steps: [
      { title: 'Detect', description: 'Monitor image exports', status: 'completed' },
      { title: 'Optimize', description: 'Compress without quality loss', status: 'running' },
      { title: 'Replace', description: 'Replace original with optimized', status: 'pending' }
    ],
    history: [
      { id: 1, time: '30 min ago', duration: '3s', status: 'success', result: '45% smaller' },
      { id: 2, time: '1 hour ago', duration: '2s', status: 'success', result: '38% smaller' }
    ]
  }
])

const selectAutomation = (automation) => {
  selectedAutomation.value = automation
}

const createAutomation = () => {
  // 创建新自动化
}

const runAutomation = (automation) => {
  // 运行自动化
}

const editAutomation = (automation) => {
  // 编辑自动化
}

const deleteAutomation = (automation) => {
  // 删除自动化
}
</script>

<style scoped>
.automation {
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

.automation-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.automations-list {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.automation-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.automation-card:hover {
  border-color: var(--border-hover);
  transform: translateX(4px);
}

.automation-card.active {
  border-color: var(--accent-primary);
  background: var(--accent-muted);
}

.automation-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-4);
}

.automation-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.automation-icon :deep(svg) {
  width: 24px;
  height: 24px;
}

.automation-status {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 500;
  text-transform: capitalize;
}

.automation-status.active {
  background: rgba(52, 211, 153, 0.15);
  color: var(--accent-success);
}

.automation-status.paused {
  background: rgba(251, 191, 36, 0.15);
  color: var(--accent-warning);
}

.automation-status.error {
  background: rgba(248, 113, 113, 0.15);
  color: var(--accent-error);
}

.automation-info {
  margin-bottom: var(--space-4);
}

.automation-name {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.automation-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.automation-meta {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.meta-item svg {
  width: 14px;
  height: 14px;
}

.automation-actions {
  display: flex;
  gap: var(--space-2);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.automation-card:hover .automation-actions {
  opacity: 1;
}

.action-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.action-btn:hover {
  background: var(--bg-elevated);
  color: var(--text-primary);
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

/* 详情面板 */
.detail-panel {
  width: 400px;
  background: var(--bg-secondary);
  border-left: 1px solid var(--border-primary);
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--border-primary);
}

.panel-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.panel-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-tertiary);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.panel-close:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.panel-close svg {
  width: 18px;
  height: 18px;
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-5);
}

.section {
  margin-bottom: var(--space-6);
}

.section-title {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--space-4);
}

/* 步骤 */
.steps-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
}

.step-number {
  width: 24px;
  height: 24px;
  background: var(--accent-primary);
  color: white;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xs);
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.step-desc {
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

.step-status {
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: 500;
  text-transform: capitalize;
}

.step-status.completed {
  background: rgba(52, 211, 153, 0.15);
  color: var(--accent-success);
}

.step-status.running {
  background: rgba(96, 165, 250, 0.15);
  color: var(--accent-info);
}

.step-status.pending {
  background: rgba(139, 139, 147, 0.15);
  color: var(--text-tertiary);
}

/* 触发器 */
.trigger-card {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
}

.trigger-icon {
  width: 40px;
  height: 40px;
  background: var(--accent-muted);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-primary);
}

.trigger-icon svg {
  width: 20px;
  height: 20px;
}

.trigger-info h4 {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.trigger-info p {
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

/* 历史 */
.history-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.history-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2);
  border-radius: var(--radius-md);
}

.history-status {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.history-status.success {
  background: var(--accent-success);
}

.history-status.error {
  background: var(--accent-error);
}

.history-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.history-time {
  font-size: var(--text-sm);
  color: var(--text-primary);
}

.history-duration {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.history-result {
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

@media (max-width: 1024px) {
  .detail-panel {
    width: 320px;
  }
}
</style>
