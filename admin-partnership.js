// ============================================================
// admin-partnership.js - Partnership 管理模块
// 支持图片上传到 Supabase Storage
// ============================================================

(function() {
    'use strict';

    console.log('✅ admin-partnership.js loading...');

    var SUPABASE_URL = 'https://jkbpbjhrgbnzexvjvxgt.supabase.co';
    var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprYnBiamhyZ2JuemV4dmp2eGd0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mzc3MDcyMSwiZXhwIjoyMDk5MzQ2NzIxfQ.cZumC1R8_pGEfQv-BBfqJXAExCYOC7mdDj4OmkfdjRw';

    var currentItems = [];
    var isSupabaseAvailable = false;
    var selectedFile = null;
    var uploadedLogoUrl = '';

    try {
        if (typeof supabase !== 'undefined') {
            isSupabaseAvailable = true;
            console.log('✅ Supabase available');
        }
    } catch (e) {}

    // ============================================================
    // 渲染 Partnership 管理页面
    // ============================================================
    function renderPartnershipPage() {
        var container = document.getElementById('page_partnership');
        if (!container) {
            console.warn('⚠️ #page_partnership not found');
            return;
        }

        var itemsHTML = '';
        if (currentItems && currentItems.length > 0) {
            currentItems.forEach(function(item, index) {
                var logoDisplay = item.logo_url
                    ? `<img src="${item.logo_url}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:1px solid rgba(0,180,255,0.15);" onerror="this.style.display='none'">`
                    : `<div style="width:40px;height:40px;border-radius:50%;background:rgba(0,180,255,0.08);display:flex;align-items:center;justify-content:center;color:#4a5a7a;font-size:0.8rem;"><i class="fas fa-handshake"></i></div>`;

                itemsHTML += `
                    <div style="display:flex;align-items:center;gap:14px;padding:12px 16px;background:rgba(255,255,255,0.02);border-radius:12px;border:1px solid rgba(255,255,255,0.04);">
                        ${logoDisplay}
                        <div style="flex:1;min-width:0;">
                            <div style="font-weight:600;color:#e5e9f0;font-size:0.85rem;">${item.title || 'Untitled'}</div>
                            <div style="font-size:0.7rem;color:#5a6388;">${item.welcome_bonus || 'RM 0'} · ${item.daily_rebate || '0%'} · ${item.weekly_bonus || 'RM 0'}</div>
                        </div>
                        <button onclick="window._adminPartnership.deleteItem('${item.id}')" style="
                            background:transparent;
                            border:none;
                            color:#4a5a7a;
                            cursor:pointer;
                            padding:6px 10px;
                            border-radius:6px;
                            transition:0.3s;
                            font-size:0.8rem;
                        " onmouseover="this.style.color='#ff6b6b';this.style.background='rgba(255,107,107,0.05)'" onmouseout="this.style.color='#4a5a7a';this.style.background='transparent'">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
            });
        } else {
            itemsHTML = `
                <div style="text-align:center;padding:30px 20px;color:#4a5a7a;font-size:0.85rem;">
                    <i class="fas fa-handshake" style="font-size:2rem;display:block;margin-bottom:10px;color:#2a3560;"></i>
                    No partnership items yet. Click "Add Partnership" to create one.
                </div>
            `;
        }

        var html = `
            <div style="margin-bottom: 20px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                    <div>
                        <div style="font-size:22px; font-weight:700; color:#fff;">
                            <i class="fas fa-handshake" style="color:#ffd700;"></i> Partnership Management
                        </div>
                        <div style="font-size:13px; color:#5a6388;">Manage partnership program items displayed on user page</div>
                    </div>
                    <button onclick="window._adminPartnership.openAddModal()" style="
                        background: linear-gradient(135deg, #4a7cff, #2f3e7a);
                        border: none;
                        padding: 12px 28px;
                        border-radius: 40px;
                        color: #fff;
                        font-weight: 600;
                        font-size: 14px;
                        cursor: pointer;
                        transition: 0.3s;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    ">
                        <i class="fas fa-plus"></i> Add Partnership
                    </button>
                </div>
            </div>

            <div style="
                background: rgba(10, 14, 26, 0.6);
                backdrop-filter: blur(12px);
                border-radius: 16px;
                border: 1px solid rgba(255,255,255,0.04);
                padding: 20px;
            ">
                <div style="font-size:12px; color:#5a6388; margin-bottom:12px; font-weight:600;">
                    <i class="fas fa-list"></i> ${currentItems.length} item(s)
                    <span style="margin-left:12px; color:#2a3560;">|</span>
                    <span style="color:#2a3560;">${isSupabaseAvailable ? '✅ Supabase' : '💾 Local'}</span>
                </div>
                <div style="display:flex;flex-direction:column;gap:8px;">
                    ${itemsHTML}
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    // ============================================================
    // 加载数据
    // ============================================================
    function loadData() {
        console.log('📥 Loading partnership items...');

        if (!isSupabaseAvailable) {
            loadFromLocalStorage();
            return;
        }

        try {
            var sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

            sb.from('partnership_items')
                .select('*')
                .order('created_at', { ascending: true })
                .then(function(res) {
                    if (res.error) {
                        console.error('加载失败:', res.error);
                        loadFromLocalStorage();
                        return;
                    }
                    currentItems = res.data || [];
                    console.log('✅ 加载成功:', currentItems.length, 'items');
                    renderPartnershipPage();
                })
                .catch(function(err) {
                    console.error('异常:', err);
                    loadFromLocalStorage();
                });
        } catch (e) {
            console.error('错误:', e);
            loadFromLocalStorage();
        }
    }

    function loadFromLocalStorage() {
        var saved = localStorage.getItem('partnership_items');
        if (saved) {
            try {
                currentItems = JSON.parse(saved);
                renderPartnershipPage();
                return;
            } catch (e) {}
        }
        currentItems = [];
        renderPartnershipPage();
    }

    // ============================================================
    // 保存数据到 Supabase
    // ============================================================
    function saveToSupabase(callback) {
        if (!isSupabaseAvailable) {
            saveToLocalStorage();
            if (callback) callback();
            return;
        }

        try {
            var sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

            sb.from('partnership_items')
                .delete()
                .neq('id', '')
                .then(function() {
                    if (currentItems.length === 0) {
                        if (callback) callback();
                        return;
                    }
                    sb.from('partnership_items')
                        .insert(currentItems)
                        .then(function() {
                            if (callback) callback();
                        })
                        .catch(function(err) {
                            console.error('保存失败:', err);
                            if (callback) callback();
                        });
                })
                .catch(function(err) {
                    console.error('删除失败:', err);
                    if (callback) callback();
                });
        } catch (e) {
            console.error('保存异常:', e);
            if (callback) callback();
        }
    }

    function saveToLocalStorage() {
        localStorage.setItem('partnership_items', JSON.stringify(currentItems));
    }

    // ============================================================
    // 上传图片到 Supabase Storage
    // ============================================================
    function uploadImage(file) {
        return new Promise(function(resolve, reject) {
            if (!file) {
                resolve('');
                return;
            }

            if (!isSupabaseAvailable) {
                // 如果没有 Supabase，将图片转为 base64 存储
                var reader = new FileReader();
                reader.onload = function(e) {
                    resolve(e.target.result);
                };
                reader.onerror = function() {
                    reject('Failed to read file');
                };
                reader.readAsDataURL(file);
                return;
            }

            var sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            var fileExt = file.name.split('.').pop();
            var fileName = 'partnership_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6) + '.' + fileExt;
            var filePath = 'partnership-logos/' + fileName;

            sb.storage
                .from('vision-partner')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                })
                .then(function(uploadRes) {
                    if (uploadRes.error) {
                        console.error('上传失败:', uploadRes.error);
                        reject(uploadRes.error.message);
                        return;
                    }

                    // 获取公开 URL
                    var publicUrl = sb.storage
                        .from('vision-partner')
                        .getPublicUrl(filePath);

                    resolve(publicUrl.data.publicUrl);
                })
                .catch(function(err) {
                    console.error('上传异常:', err);
                    reject(err.message);
                });
        });
    }

    // ============================================================
    // 添加项目
    // ============================================================
    function addItem(data) {
        var newItem = {
            id: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            logo_url: data.logo_url || '',
            title: data.title || 'Partnership',
            welcome_bonus: data.welcome_bonus || 'RM 0',
            daily_rebate: data.daily_rebate || '0%',
            weekly_bonus: data.weekly_bonus || 'RM 0',
            description: data.description || '',
            created_at: new Date().toISOString()
        };

        currentItems.push(newItem);
        saveToSupabase(function() {
            renderPartnershipPage();
            showSaveResult(true, 'Partnership added successfully!');
        });
    }

    // ============================================================
    // 删除项目
    // ============================================================
    function deleteItem(id) {
        if (!confirm('Delete this partnership item?')) return;

        currentItems = currentItems.filter(function(item) {
            return item.id !== id;
        });

        saveToSupabase(function() {
            renderPartnershipPage();
            showSaveResult(true, 'Item deleted successfully!');
        });
    }

    // ============================================================
    // 显示保存结果
    // ============================================================
    function showSaveResult(success, message) {
        var container = document.getElementById('page_partnership');
        if (!container) return;

        var existing = container.querySelector('.save-result');
        if (existing) existing.remove();

        var div = document.createElement('div');
        div.className = 'save-result';
        div.style.cssText = `
            margin-top: 12px;
            padding: 12px 20px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            ${success ? 'background: rgba(76, 217, 160, 0.1); border: 1px solid rgba(76, 217, 160, 0.2); color: #4cd9a0;' : 'background: rgba(255, 107, 107, 0.1); border: 1px solid rgba(255, 107, 107, 0.2); color: #ff6b6b;'}
        `;
        div.textContent = success ? '✅ ' + message : '❌ ' + (message || 'Operation failed');

        container.insertBefore(div, container.firstChild.nextSibling);

        setTimeout(function() {
            if (div.parentNode) {
                div.style.opacity = '0';
                div.style.transition = 'opacity 0.5s';
                setTimeout(function() {
                    if (div.parentNode) div.remove();
                }, 500);
            }
        }, 3000);
    }

    // ============================================================
    // Modal - 添加 Partnership（带图片上传）
    // ============================================================
    function openAddModal() {
        selectedFile = null;
        uploadedLogoUrl = '';

        var bodyHTML = `
            <div class="form-group">
                <label style="display:block;font-size:12px;color:#5a6388;margin-bottom:4px;font-weight:600;">
                    <i class="fas fa-image"></i> Upload Logo
                </label>
                <div style="
                    display:flex;
                    align-items:center;
                    gap:12px;
                    background:rgba(10,14,26,0.8);
                    border:1px dashed #2a3560;
                    border-radius:12px;
                    padding:16px;
                    cursor:pointer;
                    transition:0.3s;
                " id="uploadArea" onmouseover="this.style.borderColor='rgba(74,124,255,0.4)'" onmouseout="this.style.borderColor='#2a3560'">
                    <div style="
                        width:60px;
                        height:60px;
                        border-radius:50%;
                        background:rgba(0,180,255,0.05);
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        font-size:1.5rem;
                        color:#4a5a7a;
                        flex-shrink:0;
                        overflow:hidden;
                    " id="logoPreview">
                        <i class="fas fa-handshake"></i>
                    </div>
                    <div style="flex:1;">
                        <div style="font-size:0.8rem;color:#5a6388;" id="fileNameText">Click or drag to upload image</div>
                        <div style="font-size:0.6rem;color:#2a3560;">PNG, JPG, GIF up to 2MB</div>
                    </div>
                    <input type="file" id="fileInput" accept="image/*" style="display:none;">
                </div>
            </div>
            <div class="form-group">
                <label style="display:block;font-size:12px;color:#5a6388;margin-bottom:4px;font-weight:600;">
                    <i class="fas fa-tag"></i> Title
                </label>
                <input type="text" id="formTitle" placeholder="e.g. Welcome Bonus" value="Partnership" style="
                    width:100%;
                    background:rgba(10,14,26,0.8);
                    border:1px solid #2a3560;
                    border-radius:12px;
                    padding:12px 16px;
                    color:#fff;
                    font-size:14px;
                    outline:none;
                    box-sizing:border-box;
                ">
            </div>
            <div class="form-group">
                <label style="display:block;font-size:12px;color:#5a6388;margin-bottom:4px;font-weight:600;">
                    <i class="fas fa-gift" style="color:#ffd700;"></i> Welcome Bonus
                </label>
                <input type="text" id="formWelcomeBonus" placeholder="e.g. RM 88" value="RM 88" style="
                    width:100%;
                    background:rgba(10,14,26,0.8);
                    border:1px solid #2a3560;
                    border-radius:12px;
                    padding:12px 16px;
                    color:#fff;
                    font-size:14px;
                    outline:none;
                    box-sizing:border-box;
                ">
            </div>
            <div class="form-group">
                <label style="display:block;font-size:12px;color:#5a6388;margin-bottom:4px;font-weight:600;">
                    <i class="fas fa-percent" style="color:#4cd9a0;"></i> Daily Rebate
                </label>
                <input type="text" id="formDailyRebate" placeholder="e.g. 5%" value="5%" style="
                    width:100%;
                    background:rgba(10,14,26,0.8);
                    border:1px solid #2a3560;
                    border-radius:12px;
                    padding:12px 16px;
                    color:#fff;
                    font-size:14px;
                    outline:none;
                    box-sizing:border-box;
                ">
            </div>
            <div class="form-group">
                <label style="display:block;font-size:12px;color:#5a6388;margin-bottom:4px;font-weight:600;">
                    <i class="fas fa-calendar-week" style="color:#4a7cff;"></i> Weekly Bonus
                </label>
                <input type="text" id="formWeeklyBonus" placeholder="e.g. RM 188" value="RM 188" style="
                    width:100%;
                    background:rgba(10,14,26,0.8);
                    border:1px solid #2a3560;
                    border-radius:12px;
                    padding:12px 16px;
                    color:#fff;
                    font-size:14px;
                    outline:none;
                    box-sizing:border-box;
                ">
            </div>
            <div class="form-group">
                <label style="display:block;font-size:12px;color:#5a6388;margin-bottom:4px;font-weight:600;">
                    <i class="fas fa-align-left"></i> Description
                </label>
                <input type="text" id="formDescription" placeholder="e.g. First deposit bonus" value="Exclusive partnership reward" style="
                    width:100%;
                    background:rgba(10,14,26,0.8);
                    border:1px solid #2a3560;
                    border-radius:12px;
                    padding:12px 16px;
                    color:#fff;
                    font-size:14px;
                    outline:none;
                    box-sizing:border-box;
                ">
            </div>
        `;

        if (typeof openModal === 'function') {
            openModal(
                '<i class="fas fa-plus"></i> Add Partnership',
                'Create a new partnership program item',
                bodyHTML,
                function() {
                    // 如果有文件正在上传，先上传
                    if (selectedFile) {
                        // 显示上传状态
                        var saveBtn = document.querySelector('#modalSaveBtn');
                        if (saveBtn) {
                            saveBtn.disabled = true;
                            saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
                        }

                        uploadImage(selectedFile)
                            .then(function(url) {
                                uploadedLogoUrl = url;
                                saveItem();
                            })
                            .catch(function(err) {
                                alert('Image upload failed: ' + err);
                                if (saveBtn) {
                                    saveBtn.disabled = false;
                                    saveBtn.innerHTML = 'Save';
                                }
                            });
                    } else {
                        saveItem();
                    }
                }
            );

            // 绑定文件上传事件
            setTimeout(function() {
                var fileInput = document.getElementById('fileInput');
                var uploadArea = document.getElementById('uploadArea');
                var logoPreview = document.getElementById('logoPreview');
                var fileNameText = document.getElementById('fileNameText');

                if (!fileInput || !uploadArea) return;

                uploadArea.addEventListener('click', function() {
                    fileInput.click();
                });

                fileInput.addEventListener('change', function() {
                    var file = this.files[0];
                    if (!file) return;

                    if (file.size > 2 * 1024 * 1024) {
                        alert('File too large! Maximum 2MB.');
                        this.value = '';
                        return;
                    }

                    selectedFile = file;
                    fileNameText.textContent = file.name;

                    // 预览图片
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        logoPreview.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;">`;
                    };
                    reader.readAsDataURL(file);
                });

                // 拖拽支持
                uploadArea.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    this.style.borderColor = 'rgba(74,124,255,0.6)';
                    this.style.background = 'rgba(74,124,255,0.05)';
                });

                uploadArea.addEventListener('dragleave', function(e) {
                    e.preventDefault();
                    this.style.borderColor = '#2a3560';
                    this.style.background = 'transparent';
                });

                uploadArea.addEventListener('drop', function(e) {
                    e.preventDefault();
                    this.style.borderColor = '#2a3560';
                    this.style.background = 'transparent';

                    var file = e.dataTransfer.files[0];
                    if (!file) return;

                    if (file.size > 2 * 1024 * 1024) {
                        alert('File too large! Maximum 2MB.');
                        return;
                    }

                    selectedFile = file;
                    fileNameText.textContent = file.name;

                    var reader = new FileReader();
                    reader.onload = function(e) {
                        logoPreview.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;">`;
                    };
                    reader.readAsDataURL(file);

                    fileInput.files = e.dataTransfer.files;
                });

            }, 100);
        } else {
            console.warn('openModal function not available');
        }
    }

    function saveItem() {
        var title = document.getElementById('formTitle').value.trim() || 'Partnership';
        var welcome_bonus = document.getElementById('formWelcomeBonus').value.trim() || 'RM 0';
        var daily_rebate = document.getElementById('formDailyRebate').value.trim() || '0%';
        var weekly_bonus = document.getElementById('formWeeklyBonus').value.trim() || 'RM 0';
        var description = document.getElementById('formDescription').value.trim() || '';

        addItem({
            logo_url: uploadedLogoUrl,
            title: title,
            welcome_bonus: welcome_bonus,
            daily_rebate: daily_rebate,
            weekly_bonus: weekly_bonus,
            description: description
        });

        if (typeof closeModal === 'function') {
            closeModal();
        }

        // 重置
        selectedFile = null;
        uploadedLogoUrl = '';
    }

    // ============================================================
    // 暴露全局接口
    // ============================================================
    window._adminPartnership = {
        render: renderPartnershipPage,
        load: loadData,
        addItem: addItem,
        deleteItem: deleteItem,
        openAddModal: openAddModal,
        getItems: function() { return currentItems; }
    };

    console.log('✅ admin-partnership.js loaded successfully');
    console.log('📦 Available: window._adminPartnership');

})();