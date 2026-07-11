// ============================================================
// admin-user.js - Users Management Module
// 独立加载，不污染主框架
// ============================================================

(function() {
    'use strict';

    // ============================================================
    //  数据
    // ============================================================
    let users = [];
    let currentPage = 1;
    const pageSize = 10;

    // ============================================================
    //  渲染用户表格
    // ============================================================
    function renderUsers() {
        const container = document.getElementById('page_users');
        if (!container) return;

        // 计算分页
        const total = users.length;
        const totalPages = Math.ceil(total / pageSize) || 1;
        const start = (currentPage - 1) * pageSize;
        const end = Math.min(start + pageSize, total);
        const pageUsers = users.slice(start, end);

        // 构建 HTML
        let html = `
            <div style="margin-bottom: 20px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                    <div>
                        <div style="font-size:22px; font-weight:700; color:#fff;">Users Management</div>
                        <div style="font-size:13px; color:#5a6388;">Total: ${total} users</div>
                    </div>
                    <button onclick="window._adminUser.openAddModal()" style="
                        background: linear-gradient(135deg, #4a7cff, #2f3e7a);
                        border: none;
                        padding: 12px 24px;
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
                        <i class="fas fa-user-plus"></i> Add User
                    </button>
                </div>
            </div>

            <div style="
                background: rgba(10, 14, 26, 0.6);
                backdrop-filter: blur(12px);
                border-radius: 16px;
                border: 1px solid rgba(255,255,255,0.04);
                overflow: hidden;
            ">
                <div style="overflow-x: auto;">
                    <table style="width:100%; border-collapse:collapse; font-size:13px;">
                        <thead>
                            <tr>
                                <th style="text-align:left; padding:14px 16px; color:#5a6388; font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid rgba(255,255,255,0.04);">User</th>
                                <th style="text-align:left; padding:14px 16px; color:#5a6388; font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid rgba(255,255,255,0.04);">Phone</th>
                                <th style="text-align:left; padding:14px 16px; color:#5a6388; font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid rgba(255,255,255,0.04);">Balance</th>
                                <th style="text-align:left; padding:14px 16px; color:#5a6388; font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid rgba(255,255,255,0.04);">Status</th>
                                <th style="text-align:left; padding:14px 16px; color:#5a6388; font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid rgba(255,255,255,0.04);">Joined</th>
                                <th style="text-align:right; padding:14px 16px; color:#5a6388; font-weight:600; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid rgba(255,255,255,0.04);">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        if (pageUsers.length === 0) {
            html += `
                <tr>
                    <td colspan="6" style="padding:40px 16px; text-align:center; color:#4a5a7a; font-size:14px;">
                        <i class="fas fa-users" style="font-size:32px; display:block; margin-bottom:12px; color:#2a3560;"></i>
                        No users found. Click "Add User" to create one.
                    </td>
                </tr>
            `;
        } else {
            pageUsers.forEach(user => {
                const statusClass = user.status === 'active' ? 'active' : 'inactive';
                const statusText = user.status === 'active' ? 'Active' : 'Inactive';
                const balance = typeof user.balance === 'number' ? user.balance.toFixed(2) : '0.00';

                html += `
                    <tr>
                        <td style="padding:12px 16px; border-bottom:1px solid rgba(255,255,255,0.03);">
                            <div style="display:flex; align-items:center; gap:12px;">
                                <div style="
                                    width:36px; height:36px; border-radius:50%;
                                    background: linear-gradient(135deg, ${user.color || '#2f3e7a'}, ${user.color2 || '#4a7cff'});
                                    display:flex; align-items:center; justify-content:center;
                                    color:#fff; font-size:14px; flex-shrink:0;
                                ">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div>
                                    <div style="font-weight:600; color:#e5e9f0;">${user.username || 'Unknown'}</div>
                                    <div style="font-size:11px; color:#4a5a7a;">${user.email || ''}</div>
                                </div>
                            </div>
                        </td>
                        <td style="padding:12px 16px; border-bottom:1px solid rgba(255,255,255,0.03); color:#8a9abb;">${user.phone || '-'}</td>
                        <td style="padding:12px 16px; border-bottom:1px solid rgba(255,255,255,0.03); color:#4ade80; font-weight:600;">RM ${balance}</td>
                        <td style="padding:12px 16px; border-bottom:1px solid rgba(255,255,255,0.03);">
                            <span style="
                                font-size:11px; padding:4px 14px; border-radius:30px; font-weight:600;
                                ${user.status === 'active' 
                                    ? 'background:rgba(46,209,90,0.1); color:#4ade80; border:1px solid rgba(46,209,90,0.1);' 
                                    : 'background:rgba(255,107,107,0.1); color:#ff6b6b; border:1px solid rgba(255,107,107,0.1);'}
                            ">${statusText}</span>
                        </td>
                        <td style="padding:12px 16px; border-bottom:1px solid rgba(255,255,255,0.03); color:#5a6388; font-size:12px;">${user.joined || '-'}</td>
                        <td style="padding:12px 16px; border-bottom:1px solid rgba(255,255,255,0.03); text-align:right;">
                            <button onclick="window._adminUser.openEditModal('${user.id}')" style="
                                background:transparent; border:none; padding:6px 10px; border-radius:6px;
                                color:#4a5a7a; cursor:pointer; transition:0.3s; font-size:13px;
                            " onmouseover="this.style.color='#4a7cff'; this.style.background='rgba(74,124,255,0.05)'" onmouseout="this.style.color='#4a5a7a'; this.style.background='transparent'">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="window._adminUser.deleteUser('${user.id}')" style="
                                background:transparent; border:none; padding:6px 10px; border-radius:6px;
                                color:#4a5a7a; cursor:pointer; transition:0.3s; font-size:13px;
                            " onmouseover="this.style.color='#ff6b6b'; this.style.background='rgba(255,107,107,0.05)'" onmouseout="this.style.color='#4a5a7a'; this.style.background='transparent'">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });
        }

        html += `
                        </tbody>
                    </table>
                </div>

                <!-- 分页 -->
                <div style="display:flex; justify-content:space-between; align-items:center; padding:16px 16px 12px; border-top:1px solid rgba(255,255,255,0.04);">
                    <div style="font-size:12px; color:#4a5a7a;">
                        Showing ${start + 1} - ${end} of ${total} users
                    </div>
                    <div style="display:flex; gap:4px;">
        `;

        for (let i = 1; i <= totalPages; i++) {
            html += `
                <button onclick="window._adminUser.goToPage(${i})" style="
                    background: ${i === currentPage ? 'rgba(74,124,255,0.15)' : 'transparent'};
                    border: 1px solid ${i === currentPage ? 'rgba(74,124,255,0.2)' : 'rgba(255,255,255,0.04)'};
                    color: ${i === currentPage ? '#4a7cff' : '#5a6388'};
                    padding: 6px 14px; border-radius: 8px; cursor: pointer; transition:0.3s; font-size:12px;
                " onmouseover="this.style.background='rgba(255,255,255,0.04)'; this.style.color='#8a9abb'" onmouseout="this.style.background='${i === currentPage ? 'rgba(74,124,255,0.15)' : 'transparent'}'; this.style.color='${i === currentPage ? '#4a7cff' : '#5a6388'}'">
                    ${i}
                </button>
            `;
        }

        html += `
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    // ============================================================
    //  生成随机ID
    // ============================================================
    function generateId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    }

    // ============================================================
    //  加载用户数据 (从 localStorage)
    // ============================================================
    function loadUsers() {
        try {
            const data = localStorage.getItem('admin_users');
            if (data) {
                users = JSON.parse(data);
            } else {
                // 默认示例数据
                users = [
                    {
                        id: generateId(),
                        username: 'player1',
                        email: 'player1@email.com',
                        phone: '+60 12-345 6789',
                        balance: 1250.00,
                        status: 'active',
                        joined: '2026-01-15',
                        color: '#2f3e7a',
                        color2: '#4a7cff'
                    },
                    {
                        id: generateId(),
                        username: 'player2',
                        email: 'player2@email.com',
                        phone: '+60 12-345 6790',
                        balance: 350.50,
                        status: 'active',
                        joined: '2026-02-20',
                        color: '#7a3e2f',
                        color2: '#ff6b4a'
                    },
                    {
                        id: generateId(),
                        username: 'player3',
                        email: 'player3@email.com',
                        phone: '+60 12-345 6791',
                        balance: 0.00,
                        status: 'inactive',
                        joined: '2026-03-10',
                        color: '#3e2f7a',
                        color2: '#8a6bff'
                    },
                    {
                        id: generateId(),
                        username: 'player4',
                        email: 'player4@email.com',
                        phone: '+60 12-345 6792',
                        balance: 7800.00,
                        status: 'active',
                        joined: '2026-04-05',
                        color: '#2f7a3e',
                        color2: '#4aff8a'
                    },
                    {
                        id: generateId(),
                        username: 'player5',
                        email: 'player5@email.com',
                        phone: '+60 12-345 6793',
                        balance: 120.00,
                        status: 'active',
                        joined: '2026-05-12',
                        color: '#7a2f6a',
                        color2: '#ff4ac0'
                    }
                ];
                saveUsers();
            }
        } catch (e) {
            console.error('Load users error:', e);
            users = [];
        }
        renderUsers();
    }

    // ============================================================
    //  保存用户数据
    // ============================================================
    function saveUsers() {
        try {
            localStorage.setItem('admin_users', JSON.stringify(users));
        } catch (e) {
            console.error('Save users error:', e);
        }
    }

    // ============================================================
    //  添加用户
    // ============================================================
    function addUser(data) {
        const newUser = {
            id: generateId(),
            username: data.username || 'player',
            email: data.email || '',
            phone: data.phone || '',
            balance: parseFloat(data.balance) || 0,
            status: data.status || 'active',
            joined: new Date().toISOString().split('T')[0],
            color: data.color || '#2f3e7a',
            color2: data.color2 || '#4a7cff'
        };
        users.unshift(newUser);
        saveUsers();
        renderUsers();
        return newUser;
    }

    // ============================================================
    //  编辑用户
    // ============================================================
    function editUser(id, data) {
        const index = users.findIndex(u => u.id === id);
        if (index === -1) return null;
        users[index] = { ...users[index], ...data };
        saveUsers();
        renderUsers();
        return users[index];
    }

    // ============================================================
    //  删除用户
    // ============================================================
    function deleteUser(id) {
        if (!confirm('Are you sure you want to delete this user?')) return;
        users = users.filter(u => u.id !== id);
        saveUsers();
        renderUsers();
    }

    // ============================================================
    //  分页跳转
    // ============================================================
    function goToPage(page) {
        const totalPages = Math.ceil(users.length / pageSize) || 1;
        if (page < 1 || page > totalPages) return;
        currentPage = page;
        renderUsers();
    }

    // ============================================================
    //  Modal 表单 - 添加
    // ============================================================
    function openAddModal() {
        const bodyHTML = `
            <div class="form-group">
                <label>Username *</label>
                <input type="text" id="formUsername" placeholder="Enter username" value="player_${Date.now().toString().slice(-4)}">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="formEmail" placeholder="Enter email" value="user@email.com">
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="text" id="formPhone" placeholder="Enter phone number" value="+60 12-345 6789">
            </div>
            <div class="form-group">
                <label>Balance (RM)</label>
                <input type="number" id="formBalance" placeholder="0.00" value="0" step="0.01">
            </div>
            <div class="form-group">
                <label>Status</label>
                <select id="formStatus">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
        `;

        window._adminUser._openModal(
            '<i class="fas fa-user-plus"></i> Add User',
            'Create a new user account',
            bodyHTML,
            function() {
                const username = document.getElementById('formUsername').value.trim();
                if (!username) {
                    alert('Username is required!');
                    return;
                }
                // 检查用户名是否已存在
                if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
                    alert('Username already exists!');
                    return;
                }
                const data = {
                    username: username,
                    email: document.getElementById('formEmail').value.trim(),
                    phone: document.getElementById('formPhone').value.trim(),
                    balance: document.getElementById('formBalance').value || 0,
                    status: document.getElementById('formStatus').value
                };
                addUser(data);
                closeModal();
            }
        );
    }

    // ============================================================
    //  Modal 表单 - 编辑
    // ============================================================
    function openEditModal(id) {
        const user = users.find(u => u.id === id);
        if (!user) return;

        const bodyHTML = `
            <div class="form-group">
                <label>Username *</label>
                <input type="text" id="formUsername" value="${user.username || ''}">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="formEmail" value="${user.email || ''}">
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="text" id="formPhone" value="${user.phone || ''}">
            </div>
            <div class="form-group">
                <label>Balance (RM)</label>
                <input type="number" id="formBalance" value="${user.balance || 0}" step="0.01">
            </div>
            <div class="form-group">
                <label>Status</label>
                <select id="formStatus">
                    <option value="active" ${user.status === 'active' ? 'selected' : ''}>Active</option>
                    <option value="inactive" ${user.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                </select>
            </div>
        `;

        window._adminUser._openModal(
            '<i class="fas fa-edit"></i> Edit User',
            `Editing: ${user.username}`,
            bodyHTML,
            function() {
                const username = document.getElementById('formUsername').value.trim();
                if (!username) {
                    alert('Username is required!');
                    return;
                }
                // 检查用户名是否已被其他用户占用
                const existing = users.find(u => u.id !== id && u.username.toLowerCase() === username.toLowerCase());
                if (existing) {
                    alert('Username already exists!');
                    return;
                }
                const data = {
                    username: username,
                    email: document.getElementById('formEmail').value.trim(),
                    phone: document.getElementById('formPhone').value.trim(),
                    balance: parseFloat(document.getElementById('formBalance').value) || 0,
                    status: document.getElementById('formStatus').value
                };
                editUser(id, data);
                closeModal();
            }
        );
    }

    // ============================================================
    //  暴露全局接口
    // ============================================================
    window._adminUser = {
        // 数据
        users: users,

        // 渲染
        render: renderUsers,

        // CRUD
        addUser: addUser,
        editUser: editUser,
        deleteUser: deleteUser,

        // 分页
        goToPage: goToPage,

        // Modal
        openAddModal: openAddModal,
        openEditModal: openEditModal,
        _openModal: function(title, sub, bodyHTML, onSave) {
            if (typeof openModal === 'function') {
                openModal(title, sub, bodyHTML, onSave);
            } else {
                console.error('openModal not available');
            }
        },

        // 刷新
        refresh: function() {
            loadUsers();
        }
    };

    // ============================================================
    //  初始化
    // ============================================================
    loadUsers();

    console.log('✅ admin-user.js loaded');
    console.log('📊 Users:', users.length);

})();