function bukaSurprise() {

    // Putar musik
    const musik = document.getElementById("musik");
    if (musik) {
        musik.currentTime = 0;
        musik.play().catch(function(err) {
            console.log("Musik gagal diputar:", err);
        });
    }

    // Hilangkan loading
    document.getElementById("loading").style.display = "none";

    // Tampilkan konten
    document.getElementById("content").style.display = "block";

    // Jalankan semua efek
    confetti();
    fireworks();
}

function showLetter() {

    document.getElementById("letter").style.display = "block";

    confetti();
    fireworks();
}


// =========================
// CONFETTI
// =========================
function confetti() {

    for (let i = 0; i < 80; i++) {

        let love = document.createElement("div");

        love.innerHTML = Math.random() > 0.5 ? "💖" : "🎈";

        love.style.position = "fixed";
        love.style.left = Math.random() * 100 + "vw";
        love.style.top = "-40px";
        love.style.fontSize = (12 + Math.random() * 18) + "px";
        love.style.transition = "5s linear";
        love.style.pointerEvents = "none";
        love.style.zIndex = "9999";

        document.body.appendChild(love);

        setTimeout(() => {
            love.style.top = "110vh";
        }, 50);

        setTimeout(() => {
            love.remove();
        }, 5000);
    }
}

// =========================
// KEMBANG API REALISTIS
// =========================
function fireworks() {

    const canvas = document.getElementById("fireworks");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    function explode(x, y) {

        const colors = [
            "#ff0040",
            "#00e5ff",
            "#ffff00",
            "#00ff66",
            "#ff7b00",
            "#ff00ff",
            "#ffffff"
        ];

        for (let i = 0; i < 120; i++) {

            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 2;

            particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                color: colors[Math.floor(Math.random() * colors.length)]
            });

        }

    }

    // 5 ledakan
    for (let i = 0; i < 5; i++) {

        setTimeout(() => {

            explode(
                Math.random() * canvas.width,
                Math.random() * canvas.height * 0.5 + 80
            );

        }, i * 700);

    }

    function animate() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {

            const p = particles[i];

            p.x += p.vx;
            p.y += p.vy;

            p.vy += 0.05;
            p.alpha -= 0.015;

            if (p.alpha <= 0) {
                particles.splice(i, 1);
                continue;
            }

            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        }

        ctx.globalAlpha = 1;

        if (particles.length > 0) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

    }

    animate();
}