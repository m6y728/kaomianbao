const nav=document.querySelector(".nav");window.addEventListener("scroll",()=>{nav.classList.toggle("scrolled",window.scrollY>50)});const r=document.querySelectorAll(".reveal"),o=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add("visible")})},{threshold:.15});r.forEach(e=>o.observe(e));

// 重写视频播放逻辑
document.querySelectorAll(".vlog-card").forEach(card => {
    const poster = card.querySelector(".vlog-poster");
    const video = card.querySelector("video");
    
    if (!poster || !video) return;
    
    // 确保视频预加载
    video.preload = "auto";
    video.playsInline = true;
    
    // 隐藏海报的函数
    function hidePoster() {
        if (poster) {
            poster.classList.add("hidden");
        }
    }
    
    // 显示海报的函数
    function showPoster() {
        if (poster) {
            poster.classList.remove("hidden");
        }
    }
    
    // 重置视频到开始并显示海报
    function resetVideo() {
        if (video) {
            video.currentTime = 0;
            showPoster();
        }
    }
    
    // 点击海报时播放视频
    poster.addEventListener("click", () => {
        // 暂停其他所有视频
        document.querySelectorAll(".vlog-card video").forEach(otherVideo => {
            if (otherVideo !== video && !otherVideo.paused) {
                otherVideo.pause();
                // 显示对应的海报
                const otherCard = otherVideo.closest(".vlog-card");
                const otherPoster = otherCard?.querySelector(".vlog-poster");
                if (otherPoster) {
                    otherPoster.classList.remove("hidden");
                }
            }
        });
        
        // 设置视频为静音并从头开始
        video.muted = true;
        video.currentTime = 0;
        
        // 尝试播放视频
        video.play()
            .then(() => {
                // 播放成功后，稍等片刻取消静音
                setTimeout(() => {
                    video.muted = false;
                }, 200);
                // 隐藏海报
                hidePoster();
            })
            .catch(error => {
                // 如果播放失败，取消静音让用户手动操作
                console.log("Video play failed:", error);
                video.muted = false;
                hidePoster(); // 仍然隐藏海报，让用户可以直接点击视频控制
            });
    });
    
    // 点击视频时切换播放/暂停
    video.addEventListener("click", (e) => {
        e.stopPropagation(); // 防止事件冒泡到父元素
        if (video.paused) {
            video.play();
            hidePoster();
        } else {
            video.pause();
            showPoster();
        }
    });
    
    // 视频播放时隐藏海报
    video.addEventListener("play", hidePoster);
    
    // 视频暂停时显示海报（除了用户主动点击暂停的情况）
    video.addEventListener("pause", () => {
        // 只有在视频不是因为结束而暂停时才显示海报
        if (!video.ended && video.currentTime > 0) {
            showPoster();
        }
    });
    
    // 视频结束时重置
    video.addEventListener("ended", resetVideo);
});

document.addEventListener("mousemove",e=>{const t=document.querySelector(".hero-content");if(!t)return;const n=(e.clientX/innerWidth-.5)*20,o=(e.clientY/innerHeight-.5)*20;t.style.transform=`perspective(1000px) rotateY(${n*.04}deg) rotateX(${-o*.04}deg)`});const s=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){document.querySelectorAll(".hero-stat-num[data-target]").forEach(e=>{const t=+e.dataset.target,n=e.dataset.suffix||"";if(e._animated)return;e._animated=!0;const o=performance.now();!function r(a){const c=Math.min((a-o)/1500,1);e.textContent=Math.floor(t*(1-Math.pow(1-c,3)))+n,c<1&&requestAnimationFrame(r)}(o)}),s.unobserve(e.target)}})},{threshold:.5});const a=document.querySelector(".hero-stats");a&&s.observe(a);