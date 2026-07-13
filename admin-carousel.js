// ============================================================
// admin-carousel.js - 轮播图管理模块
// 支持图片上传到 Supabase Storage
// ============================================================

(function() {
    'use strict';

    console.log('✅ admin-carousel.js loading...');

    var SUPABASE_URL = 'https://jkbpbjhrgbnzexvjvxgt.supabase.co';
    var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprYnBiamhyZ2JuemV4dmp2eGd0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mzc3MDcyMSwiZXhwIjoyMDk5MzQ2NzIxfQ.cZumC1R8_pGEfQv-BBfqJXAExCYOC7mdDj4OmkfdjRw';

    var currentItems = [];
    var isSupabaseAvailable = false;
    var selectedFile = null;
    var uploadedImageUrl = '';
    var editingItemId = null;

    try {
        if (typeof supabase !== 'undefined') {
            isSupabaseAvailable = true;
            console.log('✅ Supabase available');
        }
    } catch (e) {}

    // ============================================================
    // 渲染轮播图管理页面
    // ============================================================
    function renderCarouselPage() {
        var container = document.getElementById('page_carousel');
        if (!container) {
            console.warn('⚠️ #page_carousel not found');
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
                var imageDisplay = item.image_url && item.image_url.startsWith('http')
                    ? `<img src="${item.image_url}" style="width:120px;height:68px;border-radius:8px;object-fit:cover;border:1px solid rgba(255,255,255,0.06);">`
                    : `<div style="width:120px;height:68px;border-radius:8px;background:rgba(0,180,255,0.08);display:flex;align-items:center;justify-content:center;color:#4a5a7a;font-size:0.7rem;">No Image</div>`;

                var statusBadge = item.active !== false
                    ? `<span style="background:rgba(76,217,160,0.1);color:#4cd9a0;padding:2px 12px;border-radius:30px;font-size:0.6rem;font-weight:600;border:1px solid rgba(76,217,160,0.1);">Active</span>`
                    : `<span style="background:rgba(255,107,107,0.1);color:#ff6b6b;padding:2px 12px;border-radius:30px;font-size:0.6rem;font-weight:600;border:1px solid rgba(255,107,107,0.1);">Inactive</span>`;

                itemsHTML += `
                    <div style="
                        display:flex;
                        align-items:center;
                        gap:16px;
                        padding:12px 16px;
                        background:rgba(255,255,255,0.02);
                        border-radius:12px;
                        border:1px solid rgba(255,255,255,0.04);
                        transition:0.3s;
                    " onmouseover="this.style.background='rgba(255,255,255,0.04)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
                        <div style="width:28px;text-align:center;color:#4a5a7a;font-size:0.7rem;font-weight:600;flex-shrink:0;">
                            #${item.order || index + 1}
                        </div>

                        ${imageDisplay}

                        <div style="flex:1;min-width:0;">
                            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                                <span style="font-weight:600;color:#e5e9f0;font-size:0.9rem;">${item.title || 'Untitled'}</span>
                                ${statusBadge}
                                ${item.badge ? `<span style="background:rgba(255,215,0,0.08);color:#ffd700;padding:2px 10px;border-radius:30px;font-size:0.55rem;font-weight:600;border:1px solid rgba(255,215,0,0.08);">${item.badge}</span>` : ''}
                            </div>
                            <div style="color:#5a6388;font-size:0.75rem;margin-top:2px;">
                                ${item.description || ''}
                                <span style="color:#2a3560;margin-left:12px;">→ ${item.cta_text || 'View More'}</span>
                            </div>
                        </div>

                        <div style="display:flex;gap:6px;flex-shrink:0;">
                            <button onclick="window._adminCarousel.openEditModal('${item.id}')" style="
                                background:rgba(74,124,255,0.1);
                                border:1px solid rgba(74,124,255,0.15);
                                color:#4a7cff;
                                padding:5px 12px;
                                border-radius:6px;
                                cursor:pointer;
                                font-size:0.65rem;
                                font-weight:600;
                                transition:0.3s;
                                display:flex;
                                align-items:center;
                                gap:4px;
                            " onmouseover="this.style.background='rgba(74,124,255,0.2)'" onmouseout="this.style.background='rgba(74,124,255,0.1)'">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button onclick="window._adminCarousel.deleteItem('${item.id}')" style="
                                background:rgba(255,107,107,0.08);
                                border:1px solid rgba(255,107,107,0.1);
                                color:#ff6b6b;
                                padding:5px 12px;
                                border-radius:6px;
                                cursor:pointer;
                                font-size:0.65rem;
                                font-weight:600;
                                transition:0.3s;
                                display:flex;
                                align-items:center;
                                gap:4px;
                            " onmouseover="this.style.background='rgba(255,107,107,0.2)'" onmouseout="this.style.background='rgba(255,107,107,0.08)'">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                            <button onclick="window._adminCarousel.toggleActive('${item.id}')" style="
                                background:rgba(255,255,255,0.03);
                                border:1px solid rgba(255,255,255,0.05);
                                color:#5a6388;
                                padding:5px 10px;
                                border-radius:6px;
                                cursor:pointer;
                                font-size:0.65rem;
                                transition:0.3s;
                                display:flex;
                                align-items:center;
                                gap:4px;
                            " onmouseover="this.style.color='#8a9abb'" onmouseout="this.style.color='#5a6388'">
                                <i class="fas fa-${item.active !== false ? 'eye' : 'eye-slash'}"></i>
                            </button>
                        </div>
                    </div>
                `;
            });
        }

        var html = `
            <div style="margin-bottom: 20px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                    <div>
                        <div style="font-size:22px; font-weight:700; color:#fff;">
                            <i class="fas fa-images" style="color:#4a7cff;"></i> Carousel Management
                        </div>
                        <div style="font-size:13px; color:#5a6388;">Manage homepage slideshow / carousel items</div>
                    </div>
                    <button onclick="window._adminCarousel.openAddModal()" style="
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
                        <i class="fas fa-plus"></i> Add Slide
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
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;font-size:12px;color:#5a6388;font-weight:600;">
                    <span><i class="fas fa-list"></i> ${items.length} slide(s)</span>
                    <span style="color:#2a3560;">${isSupabaseAvailable ? '✅ Supabase' : '💾 Local'}</span>
                </div>
                <div style="display:flex;flex-direction:column;gap:10px;">
                    ${itemsHTML}
                </div>
                <div style="margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.04);font-size:0.65rem;color:#2a3560;text-align:center;">
                    <i class="fas fa-info-circle"></i> Recommended image size: 1600 x 600px (8:3 ratio)
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    // ============================================================
    // 加载数据
    // ============================================================
    function loadData() {
        console.log('📥 Loading carousel items...');

        if (!isSupabaseAvailable) {
            loadFromLocalStorage();
            return;
        }

        try {
            var sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

            sb.from('carousel_items')
                .select('*')
                .order('order', { ascending: true })
                .then(function(res) {
                    if (res.error) {
                        console.error('加载失败:', res.error);
                        loadFromLocalStorage();
                        return;
                    }
                    currentItems = res.data || [];
                    console.log('✅ 加载成功:', currentItems.length, 'items');
                    renderCarouselPage();
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
        var saved = localStorage.getItem('carousel_items');
        if (saved) {
            try {
                currentItems = JSON.parse(saved);
                renderCarouselPage();
                return;
            } catch (e) {}
        }
        currentItems = [];
        renderCarouselPage();
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

            sb.from('carousel_items')
                .delete()
                .neq('id', '')
                .then(function() {
                    if (currentItems.length === 0) {
                        if (callback) callback();
                        return;
                    }
                    sb.from('carousel_items')
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
        localStorage.setItem('carousel_items', JSON.stringify(currentItems));
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
            var fileName = 'carousel_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6) + '.' + fileExt;
            var filePath = 'carousel/' + fileName;

            sb.storage
    .from('carousel-slide')
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

                    var publicUrl = sb.storage
    .from('carousel-slide')
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
        var maxOrder = currentItems.reduce(function(max, item) {
            return (item.order || 0) > max ? (item.order || 0) : max;
        }, 0);

        var newItem = {
            id: 'slide_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            image_url: data.image_url || '',
            title: data.title || 'New Slide',
            description: data.description || '',
            badge: data.badge || '',
            cta_text: data.cta_text || 'View More →',
            cta_link: data.cta_link || '/',
            order: maxOrder + 1,
            active: data.active !== false,
            created_at: new Date().toISOString()
        };

        currentItems.push(newItem);
        saveToSupabase(function() {
            renderCarouselPage();
            showSaveResult(true, 'Slide added successfully!');
        });
    }

    // ============================================================
    // 更新项目
    // ============================================================
    function updateItem(id, data) {
        var index = currentItems.findIndex(function(item) {
            return item.id === id;
        });

        if (index === -1) {
            showSaveResult(false, 'Item not found');
            return;
        }

        currentItems[index] = {
            ...currentItems[index],
            image_url: data.image_url || currentItems[index].image_url,
            title: data.title || currentItems[index].title,
            description: data.description || currentItems[index].description,
            badge: data.badge || currentItems[index].badge,
            cta_text: data.cta_text || currentItems[index].cta_text,
            cta_link: data.cta_link || currentItems[index].cta_link,
            active: data.active !== undefined ? data.active : currentItems[index].active
        };

        saveToSupabase(function() {
            renderCarouselPage();
            showSaveResult(true, 'Slide updated successfully!');
        });
    }

    // ============================================================
    // 删除项目
    // ============================================================
    function deleteItem(id) {
        if (!confirm('Delete this slide?')) return;

        currentItems = currentItems.filter(function(item) {
            return item.id !== id;
        });

        saveToSupabase(function() {
            renderCarouselPage();
            showSaveResult(true, 'Slide deleted successfully!');
        });
    }

    // ============================================================
    // 切换激活状态
    // ============================================================
    function toggleActive(id) {
        var index = currentItems.findIndex(function(item) {
            return item.id === id;
        });

        if (index === -1) return;

        currentItems[index].active = currentItems[index].active === false ? true : false;

        saveToSupabase(function() {
            renderCarouselPage();
            showSaveResult(true, 'Status toggled!');
        });
    }

    // ============================================================
    // 显示保存结果
    // ============================================================
    function showSaveResult(success, message) {
        var container = document.getElementById('page_carousel');
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
    // 打开添加 Modal
    // ============================================================
    function openAddModal() {
        editingItemId = null;
        selectedFile = null;
        uploadedImageUrl = '';
        openFormModal('Add Slide', 'Create a new carousel slide', null);
    }

    // ============================================================
    // 打开编辑 Modal
    // ============================================================
    function openEditModal(id) {
        var item = currentItems.find(function(i) { return i.id === id; });
        if (!item) {
            showSaveResult(false, 'Item not found');
            return;
        }

        editingItemId = id;
        selectedFile = null;
        uploadedImageUrl = item.image_url || '';

        openFormModal('Edit Slide', 'Update carousel slide', item);
    }

    // ============================================================
    // 通用表单 Modal
    // ============================================================
    function openFormModal(title, subtitle, item) {
        var isEdit = !!item;

        var imagePreviewContent = '';
        if (isEdit && item.image_url && item.image_url.startsWith('http')) {
            imagePreviewContent = `<img src="${item.image_url}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`;
        } else {
            imagePreviewContent = `<i class="fas fa-image" style="font-size:2rem;color:#4a5a7a;"></i>`;
        }

        var bodyHTML = `
            <div class="form-group">
                <label style="display:block;font-size:12px;color:#5a6388;margin-bottom:4px;font-weight:600;">
                    <i class="fas fa-image"></i> Slide Image (1600 x 600px recommended)
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
                        width:80px;
                        height:45px;
                        border-radius:8px;
                        background:rgba(0,180,255,0.05);
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        font-size:1.5rem;
                        color:#4a5a7a;
                        flex-shrink:0;
                        overflow:hidden;
                        border:1px solid rgba(255,255,255,0.04);
                    " id="imagePreview">
                        ${imagePreviewContent}
                    </div>
                    <div style="flex:1;">
                        <div style="font-size:0.8rem;color:#5a6388;" id="fileNameText">
                            ${isEdit && item.image_url ? 'Current image uploaded' : 'Click or drag to upload image'}
                        </div>
                        <div style="font-size:0.6rem;color:#2a3560;">PNG, JPG, WebP up to 2MB</div>
                    </div>
                    <input type="file" id="fileInput" accept="image/*" style="display:none;">
                </div>
            </div>
            <div class="form-group">
                <label style="display:block;font-size:12px;color:#5a6388;margin-bottom:4px;font-weight:600;">
                    <i class="fas fa-tag"></i> Badge
                </label>
                <input type="text" id="formBadge" placeholder="e.g. 🔥 热门" value="${isEdit ? (item.badge || '') : ''}" style="
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
                    <i class="fas fa-heading"></i> Title
                </label>
                <input type="text" id="formTitle" placeholder="e.g. RM888 存款奖励" value="${isEdit ? (item.title || '') : ''}" style="
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
                <input type="text" id="formDescription" placeholder="e.g. 首次存款可获得 100% 额外红利" value="${isEdit ? (item.description || '') : ''}" style="
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
                    <i class="fas fa-link"></i> CTA Text
                </label>
                <input type="text" id="formCtaText" placeholder="e.g. 立即领取 →" value="${isEdit ? (item.cta_text || '') : ''}" style="
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
                    <i class="fas fa-external-link-alt"></i> CTA Link
                </label>
                <input type="text" id="formCtaLink" placeholder="e.g. /deposit" value="${isEdit ? (item.cta_link || '') : ''}" style="
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
                    <i class="fas fa-power-off"></i> Active
                </label>
                <select id="formActive" style="
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
                    <option value="true" ${isEdit && item.active !== false ? 'selected' : ''}>Active</option>
                    <option value="false" ${isEdit && item.active === false ? 'selected' : ''}>Inactive</option>
                </select>
            </div>
        `;

        if (typeof openModal === 'function') {
            openModal(
                '<i class="fas fa-' + (isEdit ? 'edit' : 'plus') + '"></i> ' + title,
                subtitle,
                bodyHTML,
                function() {
                    if (selectedFile) {
                        var saveBtn = document.querySelector('#modalSaveBtn');
                        if (saveBtn) {
                            saveBtn.disabled = true;
                            saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
                        }

                        uploadImage(selectedFile)
                            .then(function(url) {
                                uploadedImageUrl = url;
                                saveFormData();
                            })
                            .catch(function(err) {
                                alert('Image upload failed: ' + err);
                                if (saveBtn) {
                                    saveBtn.disabled = false;
                                    saveBtn.innerHTML = 'Save';
                                }
                            });
                    } else {
                        saveFormData();
                    }
                }
            );

            // 绑定文件上传事件
            setTimeout(function() {
                var fileInput = document.getElementById('fileInput');
                var uploadArea = document.getElementById('uploadArea');
                var imagePreview = document.getElementById('imagePreview');
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

                    var reader = new FileReader();
                    reader.onload = function(e) {
                        imagePreview.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`;
                    };
                    reader.readAsDataURL(file);
                });

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
                        imagePreview.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`;
                    };
                    reader.readAsDataURL(file);

                    fileInput.files = e.dataTransfer.files;
                });

            }, 100);
        } else {
            console.warn('openModal function not available');
        }
    }

    // ============================================================
    // 保存表单数据
    // ============================================================
    function saveFormData() {
        var badge = document.getElementById('formBadge').value.trim() || '';
        var title = document.getElementById('formTitle').value.trim() || 'New Slide';
        var description = document.getElementById('formDescription').value.trim() || '';
        var cta_text = document.getElementById('formCtaText').value.trim() || 'View More →';
        var cta_link = document.getElementById('formCtaLink').value.trim() || '/';
        var active = document.getElementById('formActive').value === 'true';

        var data = {
            image_url: uploadedImageUrl,
            badge: badge,
            title: title,
            description: description,
            cta_text: cta_text,
            cta_link: cta_link,
            active: active
        };

        if (editingItemId) {
            updateItem(editingItemId, data);
        } else {
            addItem(data);
        }

        if (typeof closeModal === 'function') {
            closeModal();
        }

        selectedFile = null;
        uploadedImageUrl = '';
        editingItemId = null;
    }

    // ============================================================
    // 暴露全局接口
    // ============================================================
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

    console.log('✅ admin-carousel.js loaded successfully');
    console.log('📦 Available: window._adminCarousel');

})();