// ============================================================
// admin-announcement.js - 双状态版 (active / inactive)
// localStorage 主存储 + Supabase 备份同步
// ============================================================

(function() {
    'use strict';

    console.log('✅ admin-announcement.js loading...');

    var SUPABASE_URL = 'https://jkbpbjhrgbnzexvjvxgt.supabase.co';
    var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprYnBiamhyZ2JuemV4dmp2eGd0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mzc3MDcyMSwiZXhwIjoyMDk5MzQ2NzIxfQ.cZumC1R8_pGEfQv-BBfqJXAExCYOC7mdDj4OmkfdjRw';

    var currentItems = [];
    var editingItemId = null;
    var sb = null;

    // 初始化 Supabase 客户端
    try {
        if (typeof supabase !== 'undefined') {
            sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            console.log('✅ Supabase 客户端已初始化');
        }
    } catch (e) {
        console.warn('⚠️ Supabase 不可用:', e);
    }

    // ============================================================
    // 渲染公告列表
    // ============================================================
    function renderAnnouncementPage() {
        var container = document.getElementById('panel_announcement');
        if (!container) {
            console.warn('⚠️ #panel_announcement not found');
            return;
        }

        var itemsHTML = '';
        if (currentItems && currentItems.length > 0) {
            currentItems.forEach(function(item) {
                var statusClass = item.status || 'active';
                var statusText = statusClass === 'active' ? 'Active' : 'Hidden';

                itemsHTML += `
                    <div class="announcement-item" style="margin-bottom:8px;">
                        <div style="flex:1;min-width:0;">
                            <div style="font-weight:600;color:#e5e9f0;font-size:0.9rem;">
                                ${escapeHtml(item.text || 'Untitled')}
                            </div>
                            <div style="display:flex;align-items:center;gap:12px;margin-top:2px;">
                                <span class="badge-status ${statusClass}">${statusText}</span>
                                <span style="font-size:0.65rem;color:#4a5a7a;">
                                    <i class="far fa-clock"></i> ${item.time || 'Today'}
                                </span>
                                ${item.link ? `<span style="font-size:0.65rem;color:#2a3560;"><i class="fas fa-link"></i> ${escapeHtml(item.link)}</span>` : ''}
                            </div>
                        </div>
                        <div style="display:flex;gap:6px;flex-shrink:0;">
                            <button onclick="window._adminAnnouncement.openEditModal('${item.id}')" style="
                                background:rgba(74,124,255,0.1);
                                border:1px solid rgba(74,124,255,0.15);
                                color:#4a7cff;
                                padding:5px 12px;
                                border-radius:6px;
                                cursor:pointer;
                                font-size:0.65rem;
                                font-weight:600;
                                transition:0.3s;
                            " onmouseover="this.style.background='rgba(74,124,255,0.2)'" onmouseout="this.style.background='rgba(74,124,255,0.1)'">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button onclick="window._adminAnnouncement.deleteItem('${item.id}')" style="
                                background:rgba(255,107,107,0.08);
                                border:1px solid rgba(255,107,107,0.1);
                                color:#ff6b6b;
                                padding:5px 12px;
                                border-radius:6px;
                                cursor:pointer;
                                font-size:0.65rem;
                                font-weight:600;
                                transition:0.3s;
                            " onmouseover="this.style.background='rgba(255,107,107,0.2)'" onmouseout="this.style.background='rgba(255,107,107,0.08)'">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                            <button onclick="window._adminAnnouncement.toggleStatus('${item.id}')" style="
                                background:rgba(255,255,255,0.03);
                                border:1px solid rgba(255,255,255,0.05);
                                color:#5a6388;
                                padding:5px 10px;
                                border-radius:6px;
                                cursor:pointer;
                                font-size:0.65rem;
                                transition:0.3s;
                            " onmouseover="this.style.color='#8a9abb'" onmouseout="this.style.color='#5a6388'">
                                <i class="fas fa-${item.status === 'active' ? 'eye' : 'eye-slash'}"></i>
                                ${item.status === 'active' ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                `;
            });
        } else {
            itemsHTML = `
                <div style="text-align:center;padding:40px 20px;color:#4a5a7a;font-size:0.85rem;">
                    <i class="fas fa-bullhorn" style="font-size:2.5rem;display:block;margin-bottom:12px;color:#2a3560;"></i>
                    No announcements yet. Click "Add Announcement" to create one.
                </div>
            `;
        }

        var html = `
            <div style="margin-bottom: 16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                    <div>
                        <div style="font-size:18px; font-weight:600; color:#fff;">
                            <i class="fas fa-bullhorn" style="color:#4dc8ff;"></i> Announcements
                        </div>
                        <div style="font-size:12px; color:#5a6388;">Manage homepage scrolling announcements</div>
                    </div>
                    <button onclick="window._adminAnnouncement.openAddModal()" style="
                        background: linear-gradient(135deg, #4a7cff, #2f3e7a);
                        border: none;
                        padding: 10px 24px;
                        border-radius: 40px;
                        color: #fff;
                        font-weight: 600;
                        font-size: 13px;
                        cursor: pointer;
                        transition: 0.3s;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    ">
                        <i class="fas fa-plus"></i> Add Announcement
                    </button>
                </div>
            </div>
            <div style="background: rgba(10, 14, 26, 0.4); border-radius: 16px; border: 1px solid rgba(255,255,255,0.04); padding: 16px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;font-size:11px;color:#5a6388;font-weight:600;">
                    <span><i class="fas fa-list"></i> ${currentItems.length} announcement(s)</span>
                    <span style="color:#2a3560;">💾 Local</span>
                </div>
                <div style="display:flex;flex-direction:column;gap:8px;">${itemsHTML}</div>
            </div>
        `;
        container.innerHTML = html;
    }

    // ============================================================
    // 工具：防止 XSS
    // ============================================================
    function escapeHtml(text) {
        if (!text) return '';
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ============================================================
    // 加载数据 (从 localStorage)
    // ============================================================
    function loadData() {
        console.log('📥 Loading announcements from localStorage...');

        var saved = localStorage.getItem('announcements');
        if (saved) {
            try {
                currentItems = JSON.parse(saved);
                console.log('✅ 从 localStorage 加载:', currentItems.length, '条');
            } catch (e) {
                console.warn('⚠️ 解析失败，使用空数据');
                currentItems = [];
            }
        } else {
            // 首次使用，空数据
            currentItems = [];
            localStorage.setItem('announcements', JSON.stringify(currentItems));
            console.log('📝 初始化空数据');
        }

        renderAnnouncementPage();

        // 后台静默同步 Supabase
        syncFromSupabase();
    }

    // ============================================================
    // 从 Supabase 同步数据 (后台静默)
    // ============================================================
    function syncFromSupabase() {
        if (!sb) return;

        console.log('🔄 后台同步 Supabase...');

        sb.from('announcements')
            .select('*')
            .order('created_at', { ascending: false })
            .then(function(res) {
                if (res.error) {
                    console.warn('⚠️ Supabase 同步失败:', res.error.message);
                    return;
                }
                if (res.data && res.data.length > 0) {
                    // 合并数据：Supabase 数据覆盖本地
                    var localIds = currentItems.map(function(item) { return item.id; });
                    var hasNew = false;

                    res.data.forEach(function(item) {
                        if (!localIds.includes(item.id)) {
                            currentItems.push(item);
                            hasNew = true;
                        }
                    });

                    if (hasNew) {
                        localStorage.setItem('announcements', JSON.stringify(currentItems));
                        renderAnnouncementPage();
                        console.log('✅ 从 Supabase 同步了', res.data.length, '条数据');
                    }
                }
            })
            .catch(function(err) {
                console.warn('⚠️ Supabase 同步异常:', err.message);
            });
    }

    // ============================================================
    // 保存到 localStorage + 同步到 Supabase
    // ============================================================
    function saveData(callback) {
        // 1. 保存到 localStorage (立即生效)
        localStorage.setItem('announcements', JSON.stringify(currentItems));
        console.log('💾 已保存到 localStorage');

        // 2. 渲染界面
        renderAnnouncementPage();

        // 3. 后台同步到 Supabase (不阻塞)
        if (sb) {
            syncToSupabase(callback);
        } else {
            if (callback) callback();
        }
    }

    // ============================================================
    // 同步到 Supabase (后台)
    // ============================================================
    function syncToSupabase(callback) {
        if (!sb) {
            if (callback) callback();
            return;
        }

        if (currentItems.length === 0) {
            sb.from('announcements')
                .delete()
                .neq('id', '')
                .then(function() {
                    console.log('✅ 已清空 Supabase');
                    if (callback) callback();
                })
                .catch(function() {
                    if (callback) callback();
                });
            return;
        }

        // 逐条 upsert
        var promises = [];
        currentItems.forEach(function(item) {
            var p = sb.from('announcements')
                .upsert(item, { onConflict: 'id' })
                .then(function(res) {
                    if (res.error) {
                        console.warn('⚠️ 单条同步失败:', res.error.message);
                    }
                    return res;
                });
            promises.push(p);
        });

        Promise.all(promises)
            .then(function() {
                console.log('✅ 已同步到 Supabase');
                if (callback) callback();
            })
            .catch(function(err) {
                console.warn('⚠️ 同步 Supabase 失败:', err.message);
                if (callback) callback();
            });
    }

    // ============================================================
    // CRUD 操作
    // ============================================================
    function addItem(data) {
        var newItem = {
            id: 'ann_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            text: data.text || '',
            time: data.time || 'Today',
            badge: data.badge || 'HOT',
            link: data.link || '',
            status: data.status || 'active',
            created_at: new Date().toISOString()
        };
        currentItems.unshift(newItem);
        saveData(function() {
            showSaveResult(true, 'Announcement added successfully!');
        });
    }

    function updateItem(id, data) {
        var index = currentItems.findIndex(function(item) { return item.id === id; });
        if (index === -1) {
            showSaveResult(false, 'Item not found');
            return;
        }
        currentItems[index] = {
            ...currentItems[index],
            text: data.text || currentItems[index].text,
            time: data.time || currentItems[index].time,
            badge: data.badge || currentItems[index].badge,
            link: data.link || currentItems[index].link,
            status: data.status || currentItems[index].status
        };
        saveData(function() {
            showSaveResult(true, 'Announcement updated successfully!');
        });
    }

    function deleteItem(id) {
        if (!confirm('Delete this announcement?')) return;
        currentItems = currentItems.filter(function(item) { return item.id !== id; });
        saveData(function() {
            showSaveResult(true, 'Announcement deleted successfully!');
        });
    }

    // ============================================================
    // 切换状态 (active ↔ inactive)
    // ============================================================
    function toggleStatus(id) {
        var index = currentItems.findIndex(function(item) { return item.id === id; });
        if (index === -1) return;
        
        // 切换状态：active → inactive, inactive → active
        currentItems[index].status = currentItems[index].status === 'active' ? 'inactive' : 'active';
        
        saveData(function() {
            var statusText = currentItems[index].status === 'active' ? 'shown' : 'hidden';
            showSaveResult(true, 'Announcement ' + statusText + '!');
        });
    }

    function showSaveResult(success, message) {
        var container = document.getElementById('panel_announcement');
        if (!container) return;
        var existing = container.querySelector('.save-result');
        if (existing) existing.remove();

        var div = document.createElement('div');
        div.className = 'save-result';
        div.style.cssText = `
            margin-top: 12px;
            padding: 10px 18px;
            border-radius: 12px;
            font-size: 13px;
            font-weight: 500;
            ${success ? 'background: rgba(76, 217, 160, 0.1); border: 1px solid rgba(76, 217, 160, 0.2); color: #4cd9a0;' : 'background: rgba(255, 107, 107, 0.1); border: 1px solid rgba(255, 107, 107, 0.2); color: #ff6b6b;'}
        `;
        div.textContent = success ? '✅ ' + message : '❌ ' + (message || 'Operation failed');

        var firstChild = container.firstChild.nextSibling;
        if (firstChild) {
            container.insertBefore(div, firstChild);
        } else {
            container.appendChild(div);
        }

        setTimeout(function() {
            if (div.parentNode) {
                div.style.opacity = '0';
                div.style.transition = 'opacity 0.5s';
                setTimeout(function() { if (div.parentNode) div.remove(); }, 500);
            }
        }, 3000);
    }

    // ============================================================
    // Modal 操作
    // ============================================================
    function openAddModal() {
        editingItemId = null;
        openFormModal('Add Announcement', 'Create a new scrolling announcement', null);
    }

    function openEditModal(id) {
        var item = currentItems.find(function(i) { return i.id === id; });
        if (!item) {
            showSaveResult(false, 'Item not found');
            return;
        }
        editingItemId = id;
        openFormModal('Edit Announcement', 'Update announcement', item);
    }

    function openFormModal(title, subtitle, item) {
        var isEdit = !!item;
        var bodyHTML = `
            <div class="form-group">
                <label><i class="fas fa-text"></i> Announcement Text *</label>
                <textarea id="formText" placeholder="Enter announcement text...">${isEdit ? escapeHtml(item.text || '') : ''}</textarea>
            </div>
            <div class="form-group">
                <label><i class="far fa-clock"></i> Time Tag</label>
                <input type="text" id="formTime" placeholder="e.g. 10:30, Today, Yesterday" value="${isEdit ? escapeHtml(item.time || '') : 'Today'}">
            </div>
            <div class="form-group">
                <label><i class="fas fa-tag"></i> Badge</label>
                <select id="formBadge">
                    <option value="HOT" ${isEdit && item.badge === 'HOT' ? 'selected' : ''}>🔥 HOT</option>
                    <option value="NEW" ${isEdit && item.badge === 'NEW' ? 'selected' : ''}>🆕 NEW</option>
                    <option value="VIP" ${isEdit && item.badge === 'VIP' ? 'selected' : ''}>👑 VIP</option>
                    <option value="INFO" ${isEdit && item.badge === 'INFO' ? 'selected' : ''}>ℹ️ INFO</option>
                    <option value="URGENT" ${isEdit && item.badge === 'URGENT' ? 'selected' : ''}>⚠️ URGENT</option>
                </select>
            </div>
            <div class="form-group">
                <label><i class="fas fa-link"></i> Link (optional)</label>
                <input type="text" id="formLink" placeholder="e.g. /deposit, https://example.com" value="${isEdit ? escapeHtml(item.link || '') : ''}">
            </div>
            <div class="form-group">
                <label><i class="fas fa-toggle-on"></i> Status</label>
                <select id="formStatus">
                    <option value="active" ${isEdit && item.status === 'active' ? 'selected' : ''}>Active (显示)</option>
                    <option value="inactive" ${isEdit && item.status === 'inactive' ? 'selected' : ''}>Inactive (隐藏)</option>
                </select>
            </div>
        `;

        if (typeof openModal === 'function') {
            openModal(
                '<i class="fas fa-' + (isEdit ? 'edit' : 'plus') + '"></i> ' + title,
                subtitle,
                bodyHTML,
                function() { saveFormData(); }
            );
        } else {
            console.warn('⚠️ openModal not available');
        }
    }

    function saveFormData() {
        var text = document.getElementById('formText').value.trim();
        if (!text) {
            alert('Announcement text is required!');
            return;
        }
        var data = {
            text: text,
            time: document.getElementById('formTime').value.trim() || 'Today',
            badge: document.getElementById('formBadge').value,
            link: document.getElementById('formLink').value.trim() || '',
            status: document.getElementById('formStatus').value
        };

        if (editingItemId) {
            updateItem(editingItemId, data);
        } else {
            addItem(data);
        }

        if (typeof closeModal === 'function') {
            closeModal();
        }
        editingItemId = null;
    }

    // ============================================================
    // 暴露全局接口
    // ============================================================
    window._adminAnnouncement = {
        render: renderAnnouncementPage,
        load: loadData,
        addItem: addItem,
        updateItem: updateItem,
        deleteItem: deleteItem,
        toggleStatus: toggleStatus,
        openAddModal: openAddModal,
        openEditModal: openEditModal,
        getItems: function() { return currentItems; },
        sync: syncFromSupabase
    };

    console.log('✅ admin-announcement.js loaded (双状态版)');

    // 自动加载
    loadData();
})();