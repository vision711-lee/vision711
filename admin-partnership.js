// ============================================================
// admin-partnership.js - Partnership 管理模块
// 在 Admin Dashboard 中加载
// ============================================================

(function() {
    'use strict';

    console.log('✅ admin-partnership.js loading...');

    var SUPABASE_URL = 'https://jkbpbjhrgbnzexvjvxgt.supabase.co';
    var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprYnBiamhyZ2JuemV4dmp2eGd0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Mzc3MDcyMSwiZXhwIjoyMDk5MzQ2NzIxfQ.cZumC1R8_pGEfQv-BBfqJXAExCYOC7mdDj4OmkfdjRw';

    var DEFAULT_VALUES = {
        welcome_bonus: 'RM 88',
        daily_rebate: '5%',
        weekly_bonus: 'RM 188',
        new_register_free: 'RM 25'
    };

    var currentData = null;
    var isSupabaseAvailable = false;

    // 检查 Supabase
    try {
        if (typeof supabase !== 'undefined') {
            isSupabaseAvailable = true;
            console.log('✅ Supabase available');
        } else {
            console.warn('⚠️ Supabase not available, using localStorage');
        }
    } catch (e) {
        console.warn('⚠️ Supabase check failed:', e);
    }

    // ============================================================
    // 渲染 Partnership 管理页面
    // ============================================================
    function renderPartnershipPage() {
        console.log('📊 Rendering partnership page...');
        var container = document.getElementById('page_partnership');
        if (!container) {
            console.warn('⚠️ #page_partnership not found');
            return;
        }

        var data = currentData || DEFAULT_VALUES;

        var html = `
            <div style="margin-bottom: 20px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                    <div>
                        <div style="font-size:22px; font-weight:700; color:#fff;">
                            <i class="fas fa-handshake" style="color:#ffd700;"></i> Partnership Settings
                        </div>
                        <div style="font-size:13px; color:#5a6388;">Configure partnership program values shown on user page</div>
                    </div>
                    <button onclick="window._adminPartnership.saveSettings()" style="
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
                        <i class="fas fa-save"></i> Save Settings
                    </button>
                </div>
            </div>

            <div style="
                background: rgba(10, 14, 26, 0.6);
                backdrop-filter: blur(12px);
                border-radius: 16px;
                border: 1px solid rgba(255,255,255,0.04);
                padding: 24px;
            ">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
                    <div class="form-group">
                        <label style="display:block; font-size:12px; color:#5a6388; margin-bottom:4px; font-weight:600;">
                            <i class="fas fa-gift" style="color:#ffd700;"></i> Welcome Bonus (RM)
                        </label>
                        <input type="text" id="partnership_welcome_bonus" value="${data.welcome_bonus || DEFAULT_VALUES.welcome_bonus}" style="
                            width:100%;
                            background: rgba(10,14,26,0.8);
                            border: 1px solid #2a3560;
                            border-radius: 12px;
                            padding: 12px 16px;
                            color: #fff;
                            font-size: 14px;
                            outline: none;
                            box-sizing: border-box;
                        ">
                    </div>
                    <div class="form-group">
                        <label style="display:block; font-size:12px; color:#5a6388; margin-bottom:4px; font-weight:600;">
                            <i class="fas fa-percent" style="color:#4cd9a0;"></i> Daily Rebate (%)
                        </label>
                        <input type="text" id="partnership_daily_rebate" value="${data.daily_rebate || DEFAULT_VALUES.daily_rebate}" style="
                            width:100%;
                            background: rgba(10,14,26,0.8);
                            border: 1px solid #2a3560;
                            border-radius: 12px;
                            padding: 12px 16px;
                            color: #fff;
                            font-size: 14px;
                            outline: none;
                            box-sizing: border-box;
                        ">
                    </div>
                    <div class="form-group">
                        <label style="display:block; font-size:12px; color:#5a6388; margin-bottom:4px; font-weight:600;">
                            <i class="fas fa-calendar-week" style="color:#ffd700;"></i> Weekly Bonus (RM)
                        </label>
                        <input type="text" id="partnership_weekly_bonus" value="${data.weekly_bonus || DEFAULT_VALUES.weekly_bonus}" style="
                            width:100%;
                            background: rgba(10,14,26,0.8);
                            border: 1px solid #2a3560;
                            border-radius: 12px;
                            padding: 12px 16px;
                            color: #fff;
                            font-size: 14px;
                            outline: none;
                            box-sizing: border-box;
                        ">
                    </div>
                    <div class="form-group">
                        <label style="display:block; font-size:12px; color:#5a6388; margin-bottom:4px; font-weight:600;">
                            <i class="fas fa-user-plus" style="color:#4cd9a0;"></i> New Register Free (RM)
                        </label>
                        <input type="text" id="partnership_new_register_free" value="${data.new_register_free || DEFAULT_VALUES.new_register_free}" style="
                            width:100%;
                            background: rgba(10,14,26,0.8);
                            border: 1px solid #2a3560;
                            border-radius: 12px;
                            padding: 12px 16px;
                            color: #fff;
                            font-size: 14px;
                            outline: none;
                            box-sizing: border-box;
                        ">
                    </div>
                </div>

                <!-- Preview -->
                <div style="margin-top:20px; padding-top:20px; border-top:1px solid rgba(255,255,255,0.04);">
                    <div style="font-size:12px; color:#5a6388; margin-bottom:12px;">
                        <i class="fas fa-eye"></i> Live Preview (as seen on user page)
                    </div>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                        <div style="background:rgba(255,255,255,0.02); border-radius:12px; padding:14px 18px; border:1px solid rgba(255,255,255,0.04);">
                            <div style="font-size:11px; color:#5a6388;">🎁 Welcome Bonus</div>
                            <div style="font-size:20px; font-weight:700; color:#ffd700;" id="preview_welcome_bonus">${data.welcome_bonus || DEFAULT_VALUES.welcome_bonus}</div>
                        </div>
                        <div style="background:rgba(255,255,255,0.02); border-radius:12px; padding:14px 18px; border:1px solid rgba(255,255,255,0.04);">
                            <div style="font-size:11px; color:#5a6388;">🔄 Daily Rebate</div>
                            <div style="font-size:20px; font-weight:700; color:#4cd9a0;" id="preview_daily_rebate">${data.daily_rebate || DEFAULT_VALUES.daily_rebate}</div>
                        </div>
                        <div style="background:rgba(255,255,255,0.02); border-radius:12px; padding:14px 18px; border:1px solid rgba(255,255,255,0.04);">
                            <div style="font-size:11px; color:#5a6388;">📊 Weekly Bonus</div>
                            <div style="font-size:20px; font-weight:700; color:#ffd700;" id="preview_weekly_bonus">${data.weekly_bonus || DEFAULT_VALUES.weekly_bonus}</div>
                        </div>
                        <div style="background:rgba(255,255,255,0.02); border-radius:12px; padding:14px 18px; border:1px solid rgba(255,255,255,0.04);">
                            <div style="font-size:11px; color:#5a6388;">✨ New Register Free</div>
                            <div style="font-size:20px; font-weight:700; color:#4cd9a0;" id="preview_new_register_free">${data.new_register_free || DEFAULT_VALUES.new_register_free}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style="margin-top:12px; text-align:right; font-size:12px; color:#3a4a6a;">
                ${data.updated_at ? 'Last updated: ' + new Date(data.updated_at).toLocaleString() : 'No data saved yet'}
                <span style="margin-left:16px; color:#2a3560;">|</span>
                <span style="color:#2a3560;">${isSupabaseAvailable ? '✅ Supabase connected' : '💾 Local storage'}</span>
            </div>
        `;

        container.innerHTML = html;

        // 绑定输入事件更新预览
        document.querySelectorAll('#page_partnership input').forEach(function(input) {
            input.addEventListener('input', function() {
                window._adminPartnership.updatePreview();
            });
        });
    }

    // ============================================================
    // 加载数据
    // ============================================================
    function loadData() {
        console.log('📥 Loading partnership data...');

        if (!isSupabaseAvailable) {
            loadFromLocalStorage();
            return;
        }

        try {
            var sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

            sb.from('partnership_settings')
                .select('*')
                .limit(1)
                .then(function(res) {
                    console.log('📊 Supabase response:', res);

                    if (res.error) {
                        console.error('❌ 加载失败:', res.error);
                        loadFromLocalStorage();
                        return;
                    }

                    if (res.data && res.data.length > 0) {
                        currentData = res.data[0];
                        console.log('✅ 数据加载成功:', currentData);
                    } else {
                        // 创建默认数据
                        currentData = {
                            id: 1,
                            welcome_bonus: DEFAULT_VALUES.welcome_bonus,
                            daily_rebate: DEFAULT_VALUES.daily_rebate,
                            weekly_bonus: DEFAULT_VALUES.weekly_bonus,
                            new_register_free: DEFAULT_VALUES.new_register_free,
                            updated_at: new Date().toISOString()
                        };
                        // 尝试插入
                        sb.from('partnership_settings')
                            .insert(currentData)
                            .then(function() {
                                console.log('✅ 默认数据已创建');
                            })
                            .catch(function(err) {
                                console.warn('⚠️ 创建默认数据失败:', err);
                            });
                    }
                    renderPartnershipPage();
                })
                .catch(function(err) {
                    console.error('❌ 加载异常:', err);
                    loadFromLocalStorage();
                });
        } catch (e) {
            console.error('❌ Supabase 错误:', e);
            loadFromLocalStorage();
        }
    }

    function loadFromLocalStorage() {
        console.log('💾 Loading from localStorage...');
        var saved = localStorage.getItem('partnership_settings');
        if (saved) {
            try {
                currentData = JSON.parse(saved);
                console.log('✅ localStorage 数据:', currentData);
                renderPartnershipPage();
                return;
            } catch (e) {
                console.warn('⚠️ 解析 localStorage 失败:', e);
            }
        }

        currentData = {
            welcome_bonus: DEFAULT_VALUES.welcome_bonus,
            daily_rebate: DEFAULT_VALUES.daily_rebate,
            weekly_bonus: DEFAULT_VALUES.weekly_bonus,
            new_register_free: DEFAULT_VALUES.new_register_free,
            updated_at: new Date().toISOString()
        };
        localStorage.setItem('partnership_settings', JSON.stringify(currentData));
        renderPartnershipPage();
        console.log('✅ 使用默认值');
    }

    // ============================================================
    // 保存设置
    // ============================================================
    function saveSettings() {
        console.log('💾 Saving partnership settings...');

        var welcomeEl = document.getElementById('partnership_welcome_bonus');
        var dailyEl = document.getElementById('partnership_daily_rebate');
        var weeklyEl = document.getElementById('partnership_weekly_bonus');
        var freeEl = document.getElementById('partnership_new_register_free');

        if (!welcomeEl || !dailyEl || !weeklyEl || !freeEl) {
            console.warn('⚠️ 找不到输入元素');
            showSaveResult(false, 'Form elements not found');
            return;
        }

        var data = {
            welcome_bonus: welcomeEl.value.trim() || DEFAULT_VALUES.welcome_bonus,
            daily_rebate: dailyEl.value.trim() || DEFAULT_VALUES.daily_rebate,
            weekly_bonus: weeklyEl.value.trim() || DEFAULT_VALUES.weekly_bonus,
            new_register_free: freeEl.value.trim() || DEFAULT_VALUES.new_register_free,
            updated_at: new Date().toISOString()
        };

        console.log('📝 保存数据:', data);

        // 保存到 localStorage（备份）
        localStorage.setItem('partnership_settings', JSON.stringify(data));

        if (!isSupabaseAvailable) {
            currentData = data;
            showSaveResult(true);
            renderPartnershipPage();
            return;
        }

        try {
            var sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

            sb.from('partnership_settings')
                .select('id')
                .limit(1)
                .then(function(res) {
                    if (res.error) {
                        console.error('❌ 检查记录失败:', res.error);
                        showSaveResult(false, res.error.message);
                        return;
                    }

                    if (res.data && res.data.length > 0) {
                        // 更新
                        sb.from('partnership_settings')
                            .update(data)
                            .eq('id', res.data[0].id)
                            .then(function(updateRes) {
                                if (updateRes.error) {
                                    console.error('❌ 更新失败:', updateRes.error);
                                    showSaveResult(false, updateRes.error.message);
                                } else {
                                    currentData = data;
                                    console.log('✅ 更新成功');
                                    showSaveResult(true);
                                    renderPartnershipPage();
                                }
                            })
                            .catch(function(err) {
                                console.error('❌ 更新异常:', err);
                                showSaveResult(false, err.message);
                            });
                    } else {
                        // 插入
                        sb.from('partnership_settings')
                            .insert(data)
                            .then(function(insertRes) {
                                if (insertRes.error) {
                                    console.error('❌ 插入失败:', insertRes.error);
                                    showSaveResult(false, insertRes.error.message);
                                } else {
                                    currentData = data;
                                    console.log('✅ 插入成功');
                                    showSaveResult(true);
                                    renderPartnershipPage();
                                }
                            })
                            .catch(function(err) {
                                console.error('❌ 插入异常:', err);
                                showSaveResult(false, err.message);
                            });
                    }
                })
                .catch(function(err) {
                    console.error('❌ 查询异常:', err);
                    showSaveResult(false, err.message);
                });
        } catch (e) {
            console.error('❌ Supabase 错误:', e);
            showSaveResult(false, e.message);
        }
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
        div.textContent = success ? '✅ Settings saved successfully!' : '❌ Save failed: ' + (message || 'Unknown error');

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
    // 实时预览更新
    // ============================================================
    function updatePreview() {
        var welcome = document.getElementById('partnership_welcome_bonus');
        var daily = document.getElementById('partnership_daily_rebate');
        var weekly = document.getElementById('partnership_weekly_bonus');
        var free = document.getElementById('partnership_new_register_free');

        var previewWelcome = document.getElementById('preview_welcome_bonus');
        var previewDaily = document.getElementById('preview_daily_rebate');
        var previewWeekly = document.getElementById('preview_weekly_bonus');
        var previewFree = document.getElementById('preview_new_register_free');

        if (welcome && previewWelcome) {
            previewWelcome.textContent = welcome.value.trim() || DEFAULT_VALUES.welcome_bonus;
        }
        if (daily && previewDaily) {
            previewDaily.textContent = daily.value.trim() || DEFAULT_VALUES.daily_rebate;
        }
        if (weekly && previewWeekly) {
            previewWeekly.textContent = weekly.value.trim() || DEFAULT_VALUES.weekly_bonus;
        }
        if (free && previewFree) {
            previewFree.textContent = free.value.trim() || DEFAULT_VALUES.new_register_free;
        }
    }

    // ============================================================
    // 暴露全局接口
    // ============================================================
    window._adminPartnership = {
        render: renderPartnershipPage,
        load: loadData,
        saveSettings: saveSettings,
        updatePreview: updatePreview,
        getData: function() { return currentData; }
    };

    console.log('✅ admin-partnership.js loaded successfully');
    console.log('📦 Available: window._adminPartnership');

})();