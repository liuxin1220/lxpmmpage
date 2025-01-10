// 烟花效果
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 2 + 1;
    this.velocity = {
      x: (Math.random() - 0.5) * 5,
      y: (Math.random() - 0.5) * 5
    };
    this.alpha = 1;
  }


  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
  }
}

let particles = [];

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
  
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(x, y, color));
  }
}

function animateFireworks() {
  requestAnimationFrame(animateFireworks);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach((particle, index) => {
    if (particle.alpha <= 0) {
      particles.splice(index, 1);
    } else {
      particle.update();
    }
  });
  
  if (Math.random() < 0.03) {
    createFirework();
  }
}

// 爱心效果
const heartsContainer = document.querySelector('.hearts');

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = Math.random() * 2 + 3 + 's';
  heart.innerText = '❤️';
  
  heartsContainer.appendChild(heart);
  
  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(createHeart, 300);

// 窗口大小调整
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// 大爱心点击效果
const bigHeart = document.querySelector('.big-heart');
let clickCount = 0;

bigHeart.addEventListener('click', () => {
  clickCount++;
  
  // 改变颜色
  const colors = ['#ff4081', '#ff7675', '#ff9ff3', '#f368e0'];
  bigHeart.style.color = colors[clickCount % colors.length];
  
  // 放大效果
  bigHeart.style.transform = 'translateX(-50%) scale(1.5)';
  setTimeout(() => {
    bigHeart.style.transform = 'translateX(-50%) scale(1)';
  }, 300);
  
  // 创建小爱心
  for (let i = 0; i < 10; i++) {
    const miniHeart = document.createElement('div');
    miniHeart.classList.add('mini-heart');
    miniHeart.innerText = '❤️';
    miniHeart.style.left = `${Math.random() * 100}vw`;
    miniHeart.style.animationDuration = `${Math.random() * 1 + 1}s`;
    document.body.appendChild(miniHeart);
    
    setTimeout(() => {
      miniHeart.remove();
    }, 2000);
  }
});

// 计时器功能
const startDate = new Date('2018-06-09');
const textContent = document.querySelector('.text-content');
const timer = document.querySelector('.timer');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateTimer() {
  const now = new Date();
  const diff = now - startDate;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

// 初始化计时器
let timerStarted = false;

// 计时器实时更新
function startTimer() {
  setInterval(updateTimer, 1000);
}

// 文字显示1秒后跳转到计时器时间
const timerElement = document.querySelector('.timer.show-after-5s');
if (timerElement) {
  // 确保元素可见
  timerElement.style.display = 'block';
  timerElement.style.opacity = 1;
  
  // 添加过渡样式
  timerElement.style.transition = 'all 0.5s ease';
  timerElement.style.position = 'relative';
  
  setTimeout(() => {
    // 向上移动并淡出
    timerElement.style.transform = 'translateY(-20px)';
    timerElement.style.opacity = 0;
    
    setTimeout(() => {
      // 启动实时计时器
      startTimer();
      
      // 从下方移动并淡入
      timerElement.style.transform = 'translateY(20px)';
      timerElement.style.opacity = 0;
      setTimeout(() => {
        timerElement.style.transform = 'translateY(0)';
        timerElement.style.opacity = 1;
      }, 10);
    }, 500); // 等待淡出完成
  }, 1000); // 1秒后开始跳转
}

// 媒体预加载
function preloadMedia() {
  const video = document.getElementById('love-video');
  const bgm = document.getElementById('bgm');
  
  // 预加载视频
  video.preload = 'auto';
  video.load();

  // 预加载音频
  bgm.preload = 'auto';
  bgm.load();
}

// 初始化音乐
const bgm = document.getElementById('bgm');
bgm.muted = true;
bgm.volume = 0.5; // 设置初始音量

// 点击页面任意位置开始
document.addEventListener('click', () => {
  const overlay = document.querySelector('.overlay');
  const video = document.getElementById('love-video');
  const bgm = document.getElementById('bgm');
  
  // 隐藏覆盖层
  overlay.style.display = 'none';

  // 播放视频
  video.play().then(() => {
    video.muted = false;
    video.volume = 1;
  }).catch(error => {
    console.log('视频播放失败:', error);
    video.muted = true;
    video.play();
  });

  // 播放音乐
  bgm.muted = false;
  bgm.play();

  // 性能监控
  monitorPerformance();
});

// 性能监控
function monitorPerformance() {
  const video = document.getElementById('love-video');
  const bgm = document.getElementById('bgm');

  // 视频缓冲监控
  video.addEventListener('progress', () => {
    const buffered = video.buffered;
    if (buffered.length > 0) {
      console.log(`视频缓冲进度: ${(buffered.end(0) / video.duration * 100).toFixed(2)}%`);
    }
  });

  // 音频缓冲监控
  bgm.addEventListener('progress', () => {
    const buffered = bgm.buffered;
    if (buffered.length > 0) {
      console.log(`音频缓冲进度: ${(buffered.end(0) / bgm.duration * 100).toFixed(2)}%`);
    }
  });
}

// 初始化
initWechatSDK();

// 初始化覆盖层
const overlay = document.querySelector('.overlay');
overlay.style.display = 'block';

animateFireworks();


// 分享说明
console.log('要分享这个网页，可以将整个love-page文件夹打包发送，或者将代码部署到服务器上。');

// WeChat 视频播放处理
function initWechatVideo() {
  const video = document.getElementById('love-video');
  
  // 确保视频在微信中自动播放
  video.muted = true;
  video.playsInline = true;
  
  // 处理微信浏览器自动播放限制
  document.addEventListener('WeixinJSBridgeReady', function() {
    video.play();
  }, false);
  
  // 处理触摸事件
  document.addEventListener('touchstart', function() {
    if (video.paused) {
      video.play();
    }
  });
  
  // 处理视频加载
  video.addEventListener('loadedmetadata', function() {
    video.play();
  });
  
  // 处理视频错误
  video.addEventListener('error', function(e) {
    console.error('视频播放错误:', e);
    // 尝试重新加载视频
    video.load();
    setTimeout(() => video.play(), 1000);
  });
}

// 初始化WeChat视频处理
initWechatVideo();
