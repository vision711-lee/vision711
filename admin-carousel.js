// ============================================================
// admin-carousel.js - 輪播圖管理模塊（支援 PC / 手機雙圖片）
// ============================================================

(function() {
    'use strict';

    console.log('✅ admin-carousel.js loading...');

    var SUPABASE_URL = 'https://jkbpbjhrgbnzexvjvxgt.supabase.co';
    var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprYnBiamhyZ2JuemV4dmp2eGd0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mzc3MDcyMSwiZXhwIjoyMDk5MzQ2NzIxfQ.cZumC1R8_pGEfQv-BBfqJXAExCYOC7mdDj4OmkfdjRw';

    var currentItems = [];
    var isSupabaseAvailable = false;
    var editingItemId = null;

    // 🔥 兩個檔案變數
    var selectedPcFile = null;
    var selectedPhoneFile = null;
    var uploadedPcUrl = '';
    var uploadedPhoneUrl = '';

    try {
        if (typeof supabase !== 'undefined') {
            isSupabaseAvailable = true;
            console.log('✅ Supabase available');
        }
    } catch (e) {}

    // ===== 渲染頁面 =====
    function renderCarouselPage() {
        var container = document.getElementById('panel_carousel');
        if (!container) {
            console.warn('⚠️ #panel_carousel not found');
            return;
        }

        var items = currentItems;
        var itemsHTML = '';
        if (items.length === 0) {
            itemsHTML = `
                <div style="text-align:center;padding:60px 20px;color:#4a5a7a;">
                    <i class="fas fa-images" style="font-size:3rem;color:#2a3560;display:block;margin-bottom:16px;"></i>
                    <div style="font-size:1rem;color:#5a6388;margin-bottom:8px;">No slides added yet</div>
                    <div style="font-size:0.85rem;color:#3a4a6a;">Click "Add Slide" to create your first carousel item</div>
                </div>
            `;
        } else {
            items.forEach(function(item, index) {
                // 🔥 PC 版圖片預覽
                var pcImageDisplay = item.image_url && item.image_url.startsWith('http')
                    ? `<img src="${item.image_url}" style="width:60px;height:34px;border-radius:6px;object-fit:cover;border:1px solid rgba(255,255,255,0.06);">`
                    : `<div style="width:60px;height:34px;border-radius:6px;background:rgba(0,180,255,0.08);display:flex;align-items:center;justify-content:center;color:#4a5a7a;font-size:0.5rem;">PC</div>`;

                // 🔥 手機版圖片預覽
                var phoneImageDisplay = item.image_url_mobile && item.image_url_mobile.startsWith('http')
                    ? `<img src="${item.image_url_mobile}" style="width:34px;height:60px;border-radius:6px;object-fit:cover;border:1px solid rgba(255,255,255,0.06);">`
                    : `<div style="width:34px;height:60px;border-radius:6px;background:rgba(0,180,255,0.08);display:flex;align-items:center;justify-content:center;color:#4a5a7a;font-size:0.4rem;">📱</div>`;

                var statusBadge = item.active !== false
                    ? `<span style="background:rgba(76,217,160,0.1);color:#4cd9a0;padding:2px 12px;border-radius:30px;font-size:0.6rem;font-weight:600;border:1px solid rgba(76,217,160,0.1);">Active</span>`
                    : `<span style="background:rgba(255,107,107,0.1);color:#ff6b6b;padding:2px 12px;border-radius:30px;font-size:0.6rem;font-weight:600;border:1px solid rgba(255,107,107,0.1);">Inactive</span>`;

                itemsHTML += `
                    <div style="display:flex;align-items:center;gap:12px;padding:10px 14px;background:rgba(255,255,255,0.02);border-radius:12px;border:1px solid rgba(255,255,255,0.04);">
                        <div style="width:24px;text-align:center;color:#4a5a7a;font-size:0.6rem;font-weight:600;flex-shrink:0;">#${item.order || index + 1}</div>
                        <div style="display:flex;gap:6px;flex-shrink:0;">${pcImageDisplay}${phoneImageDisplay}</div>
                        <div style="flex:1;min-width:0;">
                            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                                <span style="font-weight:600;color:#e5e9f0;font-size:0.8rem;">Slide ${index + 1}</span>
                                ${statusBadge}
                            </div>
                            <div style="color:#5a6388;font-size:0.6rem;margin-top:2px;"><i class="fas fa-link"></i> ${item.cta_link || 'No link'}</div>
                        </div>
                        <div style="display:flex;gap:4px;flex-shrink:0;">
                            <button onclick="window._adminCarousel.openEditModal('${item.id}')" style="background:rgba(74,124,255,0.1);border:1px solid rgba(74,124,255,0.15);color:#4a7cff;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:0.6rem;font-weight:600;">Edit</button>
                            <button onclick="window._adminCarousel.deleteItem('${item.id}')" style="background:rgba(255,107,107,0.08);border:1px solid rgba(255,107,107,0.1);color:#ff6b6b;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:0.6rem;font-weight:600;">Delete</button>
                            <button onclick="window._adminCarousel.toggleActive('${item.id}')" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);color:#5a6388;padding:4px 8px;border-radius:6px;cursor:pointer;font-size:0.6rem;">
                                <i class="fas fa-${item.active !== false ? 'eye' : 'eye-slash'}"></i>
                            </button>
                        </div>
                    </div>
                `;
            });
        }

        var html = `
            <div style="margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
                <div>
                    <div style="font-size:18px;font-weight:600;color:#fff;"><i class="fas fa-images" style="color:#4a7cff;"></i> Carousel Slides</div>
                    <div style="font-size:12px;color:#5a6388;">Manage homepage carousel (PC + Phone versions)</div>
                </div>
                <button onclick="window._adminCarousel.openAddModal()" style="background:linear-gradient(135deg,#4a7cff,#2f3e7a);border:none;padding:10px 24px;border-radius:40px;color:#fff;font-weight:600;font-size:13px;cursor:pointer;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-plus"></i> Add Slide
                </button>
            </div>
            <div style="background:rgba(10,14,26,0.4);border-radius:16px;border:1px solid rgba(255,255,255,0.04);padding:16px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;font-size:11px;color:#5a6388;font-weight:600;">
                    <span><i class="fas fa-list"></i> ${items.length} slide(s)</span>
                    <span style="color:#2a3560;">${isSupabaseAvailable ? '✅ Supabase' : '💾 Local'}</span>
                </div>
                <div style="display:flex;flex-direction:column;gap:6px;">${itemsHTML}</div>
                <div style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.04);font-size:0.6rem;color:#2a3560;text-align:center;">
                    <i class="fas fa-info-circle"></i> PC: 2.5:1 (1600×640) | Phone: 16:9 (800×450)
                </div>
            </div>
        `;
        container.innerHTML = html;
    }

    // ===== 載入數據 =====
    function loadData() {
        console.log('📥 Loading carousel items...');
        if (!isSupabaseAvailable) { loadFromLocalStorage(); return; }
        try {
            var sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            sb.from('carousel_items').select('*').order('order', { ascending: true })
                .then(function(res) {
                    if (res.error) { console.error('加載失敗:', res.error); loadFromLocalStorage(); return; }
                    currentItems = res.data || [];
                    console.log('✅ 加載成功:', currentItems.length, 'items');
                    renderCarouselPage();
                })
                .catch(function(err) { console.error('異常:', err); loadFromLocalStorage(); });
        } catch (e) { console.error('錯誤:', e); loadFromLocalStorage(); }
    }

    function loadFromLocalStorage() {
        var saved = localStorage.getItem('carousel_items');
        if (saved) {
            try { currentItems = JSON.parse(saved); renderCarouselPage(); return; } catch (e) {}
        }
        currentItems = [];
        renderCarouselPage();
    }

    // ===== 儲存數據 =====
    function saveToSupabase(callback) {
        if (!isSupabaseAvailable) { saveToLocalStorage(); if (callback) callback(); return; }
        try {
            var sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            if (currentItems.length === 0) {
                sb.from('carousel_items').delete().neq('id', '')
                    .then(function() { console.log('✅ 所有數據已刪除'); if (callback) callback(); })
                    .catch(function() { if (callback) callback(); });
                return;
            }
            sb.from('carousel_items').upsert(currentItems, { onConflict: 'id' })
                .then(function(res) { console.log('✅ 保存成功:', res); if (callback) callback(); })
                .catch(function(err) {
                    console.error('Upsert 失敗:', err);
                    sb.from('carousel_items').delete().neq('id', '')
                        .then(function() {
                            sb.from('carousel_items').insert(currentItems)
                                .then(function() { console.log('✅ 插入成功'); if (callback) callback(); })
                                .catch(function(err2) { console.error('插入失敗:', err2); if (callback) callback(); });
                        })
                        .catch(function(err2) { console.error('刪除失敗:', err2); if (callback) callback(); });
                });
        } catch (e) { console.error('保存異常:', e); if (callback) callback(); }
    }

    function saveToLocalStorage() {
        localStorage.setItem('carousel_items', JSON.stringify(currentItems));
    }

    // ===== 🔥 上傳圖片（支援 PC 和 Phone） =====
    function uploadImage(file, folder) {
        return new Promise(function(resolve, reject) {
            if (!file) { resolve(''); return; }
            if (!isSupabaseAvailable) {
                var reader = new FileReader();
                reader.onload = function(e) { resolve(e.target.result); };
                reader.onerror = function() { reject('Failed to read file'); };
                reader.readAsDataURL(file);
                return;
            }
            var sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            var fileExt = file.name.split('.').pop();
            var fileName = 'carousel_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6) + '.' + fileExt;
            var filePath = 'carousel/' + folder + '/' + fileName;
            sb.storage.from('carousel-slide').upload(filePath, file, { cacheControl: '3600', upsert: false })
                .then(function(uploadRes) {
                    if (uploadRes.error) { reject(uploadRes.error.message); return; }
                    var publicUrl = sb.storage.from('carousel-slide').getPublicUrl(filePath);
                    resolve(publicUrl.data.publicUrl);
                })
                .catch(function(err) { reject(err.message); });
        });
    }

    // ===== 新增 / 更新 =====
    function addItem(data) {
        var maxOrder = currentItems.reduce(function(max, item) { return (item.order || 0) > max ? (item.order || 0) : max; }, 0);
        var newItem = {
            id: 'slide_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            image_url: data.image_url || '',
            image_url_mobile: data.image_url_mobile || '',
            cta_link: data.cta_link || '',
            active: data.active !== false,
            order: maxOrder + 1,
            created_at: new Date().toISOString()
        };
        currentItems.push(newItem);
        saveToSupabase(function() { renderCarouselPage(); showSaveResult(true, 'Slide added successfully!'); });
    }

    function updateItem(id, data) {
        var index = currentItems.findIndex(function(item) { return item.id === id; });
        if (index === -1) { showSaveResult(false, 'Item not found'); return; }
        currentItems[index] = {
            ...currentItems[index],
            image_url: data.image_url || currentItems[index].image_url,
            image_url_mobile: data.image_url_mobile || currentItems[index].image_url_mobile,
            cta_link: data.cta_link || currentItems[index].cta_link,
            active: data.active !== undefined ? data.active : currentItems[index].active
        };
        saveToSupabase(function() { renderCarouselPage(); showSaveResult(true, 'Slide updated successfully!'); });
    }

    function deleteItem(id) {
        if (!confirm('Delete this slide?')) return;
        currentItems = currentItems.filter(function(item) { return item.id !== id; });
        saveToSupabase(function() { renderCarouselPage(); showSaveResult(true, 'Slide deleted successfully!'); });
    }

    function toggleActive(id) {
        var index = currentItems.findIndex(function(item) { return item.id === id; });
        if (index === -1) return;
        currentItems[index].active = currentItems[index].active === false ? true : false;
        saveToSupabase(function() { renderCarouselPage(); showSaveResult(true, 'Status toggled!'); });
    }

    function showSaveResult(success, message) {
        var container = document.getElementById('panel_carousel');
        if (!container) return;
        var existing = container.querySelector('.save-result');
        if (existing) existing.remove();
        var div = document.createElement('div');
        div.className = 'save-result';
        div.style.cssText = `
            margin-top:12px;padding:10px 18px;border-radius:12px;font-size:13px;font-weight:500;
            ${success ? 'background:rgba(76,217,160,0.1);border:1px solid rgba(76,217,160,0.2);color:#4cd9a0;' : 'background:rgba(255,107,107,0.1);border:1px solid rgba(255,107,107,0.2);color:#ff6b6b;'}
        `;
        div.textContent = success ? '✅ ' + message : '❌ ' + (message || 'Operation failed');
        container.insertBefore(div, container.firstChild.nextSibling);
        setTimeout(function() {
            if (div.parentNode) {
                div.style.opacity = '0';
                div.style.transition = 'opacity 0.5s';
                setTimeout(function() { if (div.parentNode) div.remove(); }, 500);
            }
        }, 3000);
    }

    // ===== 🔥 表單模態框（雙圖片上傳） =====
    function openAddModal() { 
        editingItemId = null; 
        selectedPcFile = null; 
        selectedPhoneFile = null;
        uploadedPcUrl = ''; 
        uploadedPhoneUrl = '';
        openFormModal('Add Slide', 'Create a new carousel slide (PC + Phone versions)', null); 
    }

    function openEditModal(id) {
        var item = currentItems.find(function(i) { return i.id === id; });
        if (!item) { showSaveResult(false, 'Item not found'); return; }
        editingItemId = id;
        selectedPcFile = null;
        selectedPhoneFile = null;
        uploadedPcUrl = item.image_url || '';
        uploadedPhoneUrl = item.image_url_mobile || '';
        openFormModal('Edit Slide', 'Update carousel slide', item);
    }

    function openFormModal(title, subtitle, item) {
        var isEdit = !!item;

        // PC 版圖片預覽
        var pcPreviewContent = isEdit && item.image_url && item.image_url.startsWith('http')
            ? `<img src="${item.image_url}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`
            : `<i class="fas fa-desktop" style="font-size:2rem;color:#4a5a7a;"></i>`;

        // 手機版圖片預覽
        var phonePreviewContent = isEdit && item.image_url_mobile && item.image_url_mobile.startsWith('http')
            ? `<img src="${item.image_url_mobile}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`
            : `<i class="fas fa-mobile-alt" style="font-size:2rem;color:#4a5a7a;"></i>`;

        var bodyHTML = `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:8px;">
                <!-- PC 版 -->
                <div>
                    <label style="display:block;font-size:11px;color:#5a6388;margin-bottom:4px;font-weight:600;"><i class="fas fa-desktop"></i> PC Version (2.5:1)</label>
                    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;background:rgba(10,14,26,0.8);border:1px dashed #2a3560;border-radius:12px;padding:12px;cursor:pointer;" id="uploadAreaPc">
                        <div style="width:100%;height:80px;border-radius:8px;background:rgba(0,180,255,0.05);display:flex;align-items:center;justify-content:center;font-size:1.5rem;color:#4a5a7a;overflow:hidden;border:1px solid rgba(255,255,255,0.04);" id="pcPreview">${pcPreviewContent}</div>
                        <div style="font-size:0.7rem;color:#5a6388;text-align:center;" id="pcFileName">${isEdit && item.image_url ? 'Current image' : 'Click to upload'}</div>
                        <input type="file" id="pcFileInput" accept="image/*" style="display:none;">
                    </div>
                </div>

                <!-- 手機版 -->
                <div>
                    <label style="display:block;font-size:11px;color:#5a6388;margin-bottom:4px;font-weight:600;"><i class="fas fa-mobile-alt"></i> Phone Version (16:9)</label>
                    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;background:rgba(10,14,26,0.8);border:1px dashed #2a3560;border-radius:12px;padding:12px;cursor:pointer;" id="uploadAreaPhone">
                        <div style="width:100%;height:80px;border-radius:8px;background:rgba(0,180,255,0.05);display:flex;align-items:center;justify-content:center;font-size:1.5rem;color:#4a5a7a;overflow:hidden;border:1px solid rgba(255,255,255,0.04);" id="phonePreview">${phonePreviewContent}</div>
                        <div style="font-size:0.7rem;color:#5a6388;text-align:center;" id="phoneFileName">${isEdit && item.image_url_mobile ? 'Current image' : 'Click to upload'}</div>
                        <input type="file" id="phoneFileInput" accept="image/*" style="display:none;">
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label style="display:block;font-size:12px;color:#5a6388;margin-bottom:4px;font-weight:600;"><i class="fas fa-link"></i> CTA Link</label>
                <input type="text" id="formCtaLink" placeholder="e.g. /deposit 或 https://xxx.com" value="${isEdit ? (item.cta_link || '') : ''}" style="width:100%;background:rgba(10,14,26,0.8);border:1px solid #2a3560;border-radius:12px;padding:12px 16px;color:#fff;font-size:14px;outline:none;box-sizing:border-box;">
                <div style="font-size:0.6rem;color:#2a3560;margin-top:4px;"><i class="fas fa-info-circle"></i> Leave empty for no link</div>
            </div>

            <div class="form-group">
                <label style="display:block;font-size:12px;color:#5a6388;margin-bottom:4px;font-weight:600;"><i class="fas fa-power-off"></i> Active</label>
                <select id="formActive" style="width:100%;background:rgba(10,14,26,0.8);border:1px solid #2a3560;border-radius:12px;padding:12px 16px;color:#fff;font-size:14px;outline:none;box-sizing:border-box;">
                    <option value="true" ${isEdit && item.active !== false ? 'selected' : ''}>Active (顯示)</option>
                    <option value="false" ${isEdit && item.active === false ? 'selected' : ''}>Inactive (隱藏)</option>
                </select>
            </div>

            <div style="font-size:0.6rem;color:#2a3560;text-align:center;padding:8px 0;">
                <i class="fas fa-info-circle"></i> PC: 1600×640 (2.5:1) | Phone: 800×450 (16:9)
            </div>
        `;

        if (typeof openModal === 'function') {
            openModal('<i class="fas fa-' + (isEdit ? 'edit' : 'plus') + '"></i> ' + title, subtitle, bodyHTML, function() {
                var saveBtn = document.querySelector('#modalSaveBtn');
                var hasUpload = selectedPcFile || selectedPhoneFile;

                if (hasUpload) {
                    if (saveBtn) { saveBtn.disabled = true; saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...'; }
                    
                    var uploadPromises = [];
                    var pcPromise = selectedPcFile ? uploadImage(selectedPcFile, 'pc') : Promise.resolve(uploadedPcUrl);
                    var phonePromise = selectedPhoneFile ? uploadImage(selectedPhoneFile, 'phone') : Promise.resolve(uploadedPhoneUrl);
                    
                    Promise.all([pcPromise, phonePromise])
                        .then(function(results) {
                            uploadedPcUrl = results[0];
                            uploadedPhoneUrl = results[1];
                            saveFormData();
                            if (saveBtn) { saveBtn.disabled = false; saveBtn.innerHTML = 'Save'; }
                        })
                        .catch(function(err) {
                            alert('Image upload failed: ' + err);
                            if (saveBtn) { saveBtn.disabled = false; saveBtn.innerHTML = 'Save'; }
                        });
                } else {
                    saveFormData();
                }
            });

            // 🔥 綁定上傳事件
            setTimeout(function() {
                // PC 版
                var pcUploadArea = document.getElementById('uploadAreaPc');
                var pcFileInput = document.getElementById('pcFileInput');
                var pcPreview = document.getElementById('pcPreview');
                var pcFileName = document.getElementById('pcFileName');
                if (pcUploadArea && pcFileInput) {
                    pcUploadArea.addEventListener('click', function() { pcFileInput.click(); });
                    pcFileInput.addEventListener('change', function() {
                        var file = this.files[0];
                        if (!file) return;
                        if (file.size > 10 * 1024 * 1024) { alert('File too large! Maximum 10MB.'); this.value = ''; return; }
                        selectedPcFile = file;
                        pcFileName.textContent = file.name;
                        var reader = new FileReader();
                        reader.onload = function(e) { pcPreview.innerHTML = '<img src="' + e.target.result + '" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">'; };
                        reader.readAsDataURL(file);
                    });
                }

                // 手機版
                var phoneUploadArea = document.getElementById('uploadAreaPhone');
                var phoneFileInput = document.getElementById('phoneFileInput');
                var phonePreview = document.getElementById('phonePreview');
                var phoneFileName = document.getElementById('phoneFileName');
                if (phoneUploadArea && phoneFileInput) {
                    phoneUploadArea.addEventListener('click', function() { phoneFileInput.click(); });
                    phoneFileInput.addEventListener('change', function() {
                        var file = this.files[0];
                        if (!file) return;
                        if (file.size > 10 * 1024 * 1024) { alert('File too large! Maximum 10MB.'); this.value = ''; return; }
                        selectedPhoneFile = file;
                        phoneFileName.textContent = file.name;
                        var reader = new FileReader();
                        reader.onload = function(e) { phonePreview.innerHTML = '<img src="' + e.target.result + '" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">'; };
                        reader.readAsDataURL(file);
                    });
                }
            }, 100);

        } else {
            console.warn('openModal function not available');
        }
    }

    function saveFormData() {
        var cta_link = document.getElementById('formCtaLink').value.trim() || '';
        var active = document.getElementById('formActive').value === 'true';
        var data = { 
            image_url: uploadedPcUrl, 
            image_url_mobile: uploadedPhoneUrl,
            cta_link: cta_link, 
            active: active 
        };
        if (editingItemId) updateItem(editingItemId, data);
        else addItem(data);
        if (typeof closeModal === 'function') closeModal();
        selectedPcFile = null;
        selectedPhoneFile = null;
        uploadedPcUrl = '';
        uploadedPhoneUrl = '';
        editingItemId = null;
    }

    // ===== 暴露全局 =====
    window._adminCarousel = {
        render: renderCarouselPage,
        load: loadData,
        addItem: addItem,
        updateItem: updateItem,
        deleteItem: deleteItem,
        toggleActive: toggleActive,
        openAddModal: openAddModal,
        openEditModal: openEditModal,
        getItems: function() { return currentItems; }
    };

    console.log('✅ admin-carousel.js loaded successfully (PC + Phone versions)');
})();