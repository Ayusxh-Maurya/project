
        document.addEventListener('DOMContentLoaded', () => {
            // 1. Initialize AOS (Animate on Scroll)
            AOS.init({
                duration: 800,
                once: true, // Animation happens only once
                offset: 100, // Trigger animation a bit early
            });

            // 2. Dark/Light Mode Toggle
            const themeToggle = document.getElementById('theme-toggle');
            const sunIcon = '<i class="fas fa-sun"></i>';
            const moonIcon = '<i class="fas fa-moon"></i>';

            const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
            if (currentTheme) {
                document.documentElement.setAttribute('data-theme', currentTheme);
                if (currentTheme === 'light') {
                    themeToggle.innerHTML = moonIcon;
                } else {
                    themeToggle.innerHTML = sunIcon;
                }
            }

            themeToggle.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme');
                if (current === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'light');
                    localStorage.setItem('theme', 'light');
                    themeToggle.innerHTML = moonIcon;
                } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                    themeToggle.innerHTML = sunIcon;
                }
            });

            // 3. Sticky Header
            const header = document.getElementById('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            const hamburger = document.getElementById('hamburger');
            const navLinks = document.getElementById('nav-links');

            // Show nav
            hamburger.addEventListener('click', () => {
                navLinks.style.display = 'flex';
                setTimeout(() => {
                    navLinks.classList.add('active');
                }, 10);
            });

            // // Close on link click
            // navLinks.querySelectorAll('a').forEach(link => {
            //     link.addEventListener('click', () => {
            //         navLinks.classList.remove('active');
            //         setTimeout(() => {
            //             navLinks.style.display = 'none';
            //         }, 400);
            //     });
            // });

            // Close when clicking outside
            document.addEventListener('click', (event) => {
                const isClickInside = navLinks.contains(event.target) || hamburger.contains(event.target);

                if (!isClickInside && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    setTimeout(() => {
                        navLinks.style.display = 'none';
                    }, 400);
                }
            });

            // --- Chart.js Implementations ---

            const chartConfig = {
                fontColor: document.documentElement.getAttribute('data-theme') === 'dark' ? '#e0e7ff' : '#1e2329',
                gridColor: document.documentElement.getAttribute('data-theme') === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            };

            // 5. Technical Analysis Chart
            const techCtx = document.getElementById('technicalChart').getContext('2d');
            new Chart(techCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Candlestick Body',
                        data: [120, 122, 125, 123, 130, 135],
                        backgroundColor: (context) => {
                            const value = context.dataset.data[context.dataIndex];
                            return value > context.dataset.data[context.dataIndex - 1] ? 'rgba(0, 230, 118, 0.7)' : 'rgba(255, 61, 0, 0.7)';
                        },
                        borderColor: (context) => {
                            const value = context.dataset.data[context.dataIndex];
                            return value > context.dataset.data[context.dataIndex - 1] ? '#00e676' : '#ff3d00';
                        },
                        borderWidth: 1
                    },
                    {
                        label: 'RSI',
                        data: [25, 28, 40, 35, 55, 65],
                        type: 'line',
                        borderColor: '#00aaff',
                        tension: 0.4,
                        yAxisID: 'y1'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { labels: { color: chartConfig.fontColor } } },
                    scales: {
                        x: { ticks: { color: chartConfig.fontColor }, grid: { color: chartConfig.gridColor } },
                        y: { position: 'left', ticks: { color: chartConfig.fontColor }, grid: { color: chartConfig.gridColor } },
                        y1: { position: 'right', ticks: { color: chartConfig.fontColor }, grid: { drawOnChartArea: false } }
                    }
                }
            });

            // 6. Fundamental Analysis Chart
            const funCtx = document.getElementById('fundamentalChart').getContext('2d');
            new Chart(funCtx, {
                type: 'bar',
                data: {
                    labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2025'],
                    datasets: [
                        {
                            label: 'Revenue (in M)',
                            data: [120, 135, 130, 150],
                            backgroundColor: 'rgba(0, 170, 255, 0.6)',
                            borderColor: '#00aaff',
                            borderWidth: 1
                        },
                        {
                            label: 'Net Income (in M)',
                            data: [20, 25, 22, 30],
                            backgroundColor: 'rgba(0, 234, 255, 0.6)',
                            borderColor: '#00eaff',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { labels: { color: chartConfig.fontColor } } },
                    scales: {
                        x: { ticks: { color: chartConfig.fontColor }, grid: { color: chartConfig.gridColor } },
                        y: { ticks: { color: chartConfig.fontColor }, grid: { color: chartConfig.gridColor } }
                    }
                }
            });
        });
    