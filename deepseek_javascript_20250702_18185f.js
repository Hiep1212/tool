<!DOCTYPE html>
<html>
<head>
    <style>
        /* Nút hình tròn nhỏ */
        #toggle-ui-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #6a3093, #a044ff);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            transition: all 0.3s ease;
        }

        #toggle-ui-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 15px rgba(0,0,0,0.4);
        }

        #toggle-ui-btn:active {
            transform: scale(0.95);
        }

        /* UI Panel */
        #minhhepsigma-ui {
            position: fixed;
            bottom: 90px;
            right: 30px;
            width: 280px;
            background: #1e1e2d;
            border: 1px solid #4a3b76;
            border-radius: 10px;
            padding: 15px;
            color: white;
            font-family: 'Arial', sans-serif;
            z-index: 999;
            box-shadow: 0 4px 15px rgba(0,0,0,0.4);
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(20px);
            visibility: hidden;
        }

        #minhhepsigma-ui.show {
            opacity: 1;
            transform: translateY(0);
            visibility: visible;
        }

        /* Phần còn lại của UI */
        #minhhepsigma-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #4a3b76;
        }

        #minhhepsigma-title {
            margin: 0;
            color: #b38aff;
            font-size: 18px;
            font-weight: bold;
        }

        #minhhepsigma-counter {
            text-align: center;
            margin: 20px 0;
        }

        #minhhepsigma-count {
            font-size: 42px;
            font-weight: bold;
            color: #4CAF50;
            transition: all 0.3s;
        }

        .minhhepsigma-label {
            font-size: 14px;
            color: #aaa;
            margin-bottom: 5px;
        }

        #minhhepsigma-buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .minhhepsigma-btn {
            background: linear-gradient(to right, #6a3093, #a044ff);
            color: white;
            border: none;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
        }

        .minhhepsigma-btn:hover {
            background: linear-gradient(to right, #7a40a3, #b054ff);
            transform: translateY(-2px);
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }

        .pulse {
            animation: pulse 0.3s ease;
        }
    </style>
</head>
<body>
    <!-- Nút hình tròn mở/đóng UI -->
    <button id="toggle-ui-btn">☰</button>

    <!-- UI Panel -->
    <div id="minhhepsigma-ui">
        <div id="minhhepsigma-header">
            <h3 id="minhhepsigma-title">MINHHEPSIGMA Tool</h3>
        </div>
        
        <div id="minhhepsigma-counter">
            <div class="minhhepsigma-label">Số link Hcoin đã nhận</div>
            <div id="minhhepsigma-count">0</div>
        </div>
        
        <div id="minhhepsigma-buttons">
            <button class="minhhepsigma-btn" id="minhhepsigma-add">Nhận Hcoin</button>
            <button class="minhhepsigma-btn" id="minhhepsigma-reset">Reset Counter</button>
        </div>
    </div>

    <script>
        // Lấy các phần tử DOM
        const toggleBtn = document.getElementById('toggle-ui-btn');
        const uiPanel = document.getElementById('minhhepsigma-ui');
        const countElement = document.getElementById('minhhepsigma-count');
        const addBtn = document.getElementById('minhhepsigma-add');
        const resetBtn = document.getElementById('minhhepsigma-reset');

        // Khởi tạo biến đếm
        let hcoinCount = localStorage.getItem('minhhepsigma_hcoinCount') || 0;
        countElement.textContent = hcoinCount;

        // Xử lý nút toggle
        toggleBtn.addEventListener('click', function() {
            uiPanel.classList.toggle('show');
            toggleBtn.textContent = uiPanel.classList.contains('show') ? '×' : '☰';
        });

        // Xử lý nút nhận Hcoin
        addBtn.addEventListener('click', function() {
            hcoinCount++;
            countElement.textContent = hcoinCount;
            localStorage.setItem('minhhepsigma_hcoinCount', hcoinCount);
            
            // Hiệu ứng
            countElement.classList.add('pulse');
            setTimeout(() => {
                countElement.classList.remove('pulse');
            }, 300);
        });

        // Xử lý nút reset
        resetBtn.addEventListener('click', function() {
            if (confirm('Bạn có chắc muốn reset số Hcoin về 0?')) {
                hcoinCount = 0;
                countElement.textContent = hcoinCount;
                localStorage.setItem('minhhepsigma_hcoinCount', hcoinCount);
                
                // Hiệu ứng
                countElement.style.color = '#ff4454';
                setTimeout(() => {
                    countElement.style.color = '#4CAF50';
                }, 500);
            }
        });

        // Đóng UI khi click bên ngoài
        document.addEventListener('click', function(e) {
            if (!uiPanel.contains(e.target) && e.target !== toggleBtn) {
                uiPanel.classList.remove('show');
                toggleBtn.textContent = '☰';
            }
        });
    </script>
</body>
</html>
