// ============================================================
// admin-announcement.js - Announcement 管理模块
// 支持公告的增删改查，存储到 Supabase
// ============================================================

(function() {
    'use strict';

    console.log('✅ admin-announcement.js loading...');

    var SUPABASE_URL = 'https://jkbpbjhrgbnzexvjvxgt.supabase.co';
    var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprYnBiamhyZ2JuemV4dmp2eGd0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mzc3MDcyMSwiZXhwIjoyMDk5MzQ2NzIxfQ.cZumC1R8_pGEfQv-BBfqJXAExCYOC7mdDj4OmkfdjRw';

    var currentItems = [];
    var isSupabaseAvailable = false;
    var editingItemId = null;

    try {
        if (typeof supabase !== 'undefined') {
            isSupabaseAvailable = true;
            console.log('✅ Supabase available');
        }
    } catch (e) {}

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
                var statusMap = { 'active': 'Active', 'inactive': 'Inactive', 'draft': 'Draft' };
                var statusText = statusMap[statusClass] || statusClass;

                itemsHTML += `
                    <div class="announcement-item" style="margin-bottom:8px;">
                        <div style="flex:1;min-width:0;">
                            <div style="font-weight:600;color:#e5e9f0;font-size:0.9rem;">
                                ${item.text || 'Untitled'}
                            </div>
                            <div style="display:flex;align-items:center;gap:12px;margin-top:2px;">
                                <span class="badge-status ${statusClass}">${statusText}</span>
                                <span style="font-size:0.65rem;color:#4a5a7a;">
                                    <i class="far fa-clock"></i> ${item.time || 'Today'}
                                </span>
                                ${item.link ? `<span style="font-size:0.65rem;color:#2a3560;"><i class="fas fa-link"></i> ${item.link}</span>` : ''}
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
                                <i class="fas fa-${item.status === 'active' ? 'eye' : item.status === 'draft' ? 'file' : 'eye-slash'}"></i>
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
                    <span style="color:#2a3560;">${isSupabaseAvailable ? '✅ Supabase' : '💾 Local'}</span>
                </div>
                <div style="display:flex;flex-direction:column;gap:8px;">${itemsHTML}</div>
            </div>
        `;
        container.innerHTML = html;
    }

    function loadData() {
        console.log('📥 Loading announcements...');
        if (!isSupabaseAvailable) { loadFromLocalStorage(); return; }
        try {
            var sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            sb.from('announcements').select('*').order('created_at', { ascending: false })
                .then(function(res) {
                    if (res.error) { console.error('加载失败:', res.error); loadFromLocalStorage(); return; }
                    currentItems = res.data || [];
                    console.log('✅ 加载成功:', currentItems.length, 'announcements');
                    renderAnnouncementPage();
                })
                .catch(function(err) { console.error('异常:', err); loadFromLocalStorage(); });
        } catch (e) { console.error('错误:', e); loadFromLocalStorage(); }
    }

    function loadFromLocalStorage() {
        var saved = localStorage.getItem('announcements');
        if (saved) { try { currentItems = JSON.parse(saved); renderAnnouncementPage(); return; } catch (e) {} }
        currentItems = [];
        renderAnnouncementPage();
    }

    function saveToSupabase(callback) {
        if (!isSupabaseAvailable) { saveToLocalStorage(); if (callback) callback(); return; }
        try {
            var sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            sb.from('announcements').upsert(currentItems, { onConflict: 'id' })
                .then(function(res) { console.log('✅ 保存成功:', res); if (callback) callback(); })
                .catch(function(err) {
                    console.error('保存失败:', err);
                    sb.from('announcements').delete().neq('id', '').then(function() {
                        if (currentItems.length === 0) { if (callback) callback(); return; }
                        sb.from('announcements').insert(currentItems).then(function() {
                            console.log('✅ 插入成功'); if (callback) callback();
                        }).catch(function(err2) { console.error('插入失败:', err2); if (callback) callback(); });
                    }).catch(function(err2) { console.error('删除失败:', err2); if (callback) callback(); });
                });
        } catch (e) { console.error('保存异常:', e); if (callback) callback(); }
    }

    function saveToLocalStorage() { localStorage.setItem('announcements', JSON.stringify(currentItems)); }

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
        saveToSupabase(function() { renderAnnouncementPage(); showSaveResult(true, 'Announcement added successfully!'); });
    }

    function updateItem(id, data) {
        var index = currentItems.findIndex(function(item) { return item.id === id; });
        if (index === -1) { showSaveResult(false, 'Item not found'); return; }
        currentItems[index] = { ...currentItems[index],
            text: data.text || currentItems[index].text,
            time: data.time || currentItems[index].time,
            badge: data.badge || currentItems[index].badge,
            link: data.link || currentItems[index].link,
            status: data.status || currentItems[index].status
        };
        saveToSupabase(function() { renderAnnouncementPage(); showSaveResult(true, 'Announcement updated successfully!'); });
    }

    function deleteItem(id) {
        if (!confirm('Delete this announcement?')) return;
        currentItems = currentItems.filter(function(item) { return item.id !== id; });
        saveToSupabase(function() { renderAnnouncementPage(); showSaveResult(true, 'Announcement deleted successfully!'); });
    }

    function toggleStatus(id) {
        var index = currentItems.findIndex(function(item) { return item.id === id; });
        if (index === -1) return;
        var statusMap = { 'active': 'inactive', 'inactive': 'draft', 'draft': 'active' };
        currentItems[index].status = statusMap[currentItems[index].status] || 'active';
        saveToSupabase(function() { renderAnnouncementPage(); showSaveResult(true, 'Status toggled!'); });
    }

    function showSaveResult(success, message) {
        var container = document.getElementById('panel_announcement');
        if (!container) return;
        var existing = container.querySelector('.save-result');
        if (existing) existing.remove();
        var div = document.createElement('div');
        div.className = 'save-result';
        div.style.cssText = `
            margin-top: 12px; padding: 10px 18px; border-radius: 12px; font-size: 13px; font-weight: 500;
            ${success ? 'background: rgba(76, 217, 160, 0.1); border: 1px solid rgba(76, 217, 160, 0.2); color: #4cd9a0;' : 'background: rgba(255, 107, 107, 0.1); border: 1px solid rgba(255, 107, 107, 0.2); color: #ff6b6b;'}
        `;
        div.textContent = success ? '✅ ' + message : '❌ ' + (message || 'Operation failed');
        container.insertBefore(div, container.firstChild.nextSibling);
        setTimeout(function() { if (div.parentNode) { div.style.opacity = '0'; div.style.transition = 'opacity 0.5s'; setTimeout(function() { if (div.parentNode) div.remove(); }, 500); } }, 3000);
    }

    function openAddModal() { editingItemId = null; openFormModal('Add Announcement', 'Create a new scrolling announcement', null); }

    function openEditModal(id) {
        var item = currentItems.find(function(i) { return i.id === id; });
        if (!item) { showSaveResult(false, 'Item not found'); return; }
        editingItemId = id;
        openFormModal('Edit Announcement', 'Update announcement', item);
    }

    function openFormModal(title, subtitle, item) {
        var isEdit = !!item;
        var bodyHTML = `
            <div class="form-group">
                <label><i class="fas fa-text"></i> Announcement Text *</label>
                <textarea id="formText" placeholder="Enter announcement text...">${isEdit ? (item.text || '') : ''}</textarea>
            </div>
            <div class="form-group">
                <label><i class="far fa-clock"></i> Time Tag</label>
                <input type="text" id="formTime" placeholder="e.g. 10:30, Today, Yesterday" value="${isEdit ? (item.time || '') : 'Today'}">
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
                <input type="text" id="formLink" placeholder="e.g. /deposit, https://example.com" value="${isEdit ? (item.link || '') : ''}">
            </div>
            <div class="form-group">
                <label><i class="fas fa-toggle-on"></i> Status</label>
                <select id="formStatus">
                    <option value="active" ${isEdit && item.status === 'active' ? 'selected' : ''}>Active (显示)</option>
                    <option value="draft" ${isEdit && item.status === 'draft' ? 'selected' : ''}>Draft (草稿)</option>
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
        } else { console.warn('openModal function not available'); }
    }

    function saveFormData() {
        var text = document.getElementById('formText').value.trim();
        if (!text) { alert('Announcement text is required!'); return; }
        var data = {
            text: text,
            time: document.getElementById('formTime').value.trim() || 'Today',
            badge: document.getElementById('formBadge').value,
            link: document.getElementById('formLink').value.trim() || '',
            status: document.getElementById('formStatus').value
        };
        if (editingItemId) { updateItem(editingItemId, data); } else { addItem(data); }
        if (typeof closeModal === 'function') closeModal();
        editingItemId = null;
    }

    window._adminAnnouncement = {
        render: renderAnnouncementPage,
        load: loadData,
        addItem: addItem,
        updateItem: updateItem,
        deleteItem: deleteItem,
        toggleStatus: toggleStatus,
        openAddModal: openAddModal,
        openEditModal: openEditModal,
        getItems: function() { return currentItems; }
    };

    console.log('✅ admin-announcement.js loaded successfully');
})();