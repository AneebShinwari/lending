// Particles background effect
class Particles {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.className = 'particles-canvas';
        document.body.appendChild(this.canvas);
        
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        
        this.particles = [];
        this.particleCount = 100;
        this.colors = [
            'rgba(110, 0, 255, 0.7)',
            'rgba(0, 212, 255, 0.7)',
            'rgba(255, 0, 234, 0.7)'
        ];
        
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    init() {
        this.resize();
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 3 + 1,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                speed: Math.random() * 0.5 + 0.2,
                direction: Math.random() * 360,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            // Update particle position
            const radians = p.direction * Math.PI / 180;
            p.x += Math.cos(radians) * p.speed;
            p.y += Math.sin(radians) * p.speed;
            
            // Wrap around screen edges
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.opacity;
            this.ctx.fill();
            
            // Connect particles that are close
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = p.color;
                    this.ctx.globalAlpha = 0.2 * (1 - distance / 150);
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

// Initialize particles on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        new Particles();
    }, 1500); // Delay to not interfere with loading animation
});

// Add interactive mouse trail effect
class MouseTrail {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.className = 'mouse-trail-canvas';
        document.body.appendChild(this.canvas);
        
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '2';
        
        this.points = [];
        this.maxPoints = 50;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isActive = false;
        
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    init() {
        this.resize();
        
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.isActive = true;
            
            this.addPoint();
        });
        
        document.addEventListener('mouseout', () => {
            this.isActive = false;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    addPoint() {
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
        gradient.addColorStop(0, 'rgba(110, 0, 255, 0.5)');
        gradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 0, 234, 0.5)');
        
        this.points.push({
            x: this.mouseX,
            y: this.mouseY,
            size: 10,
            color: gradient,
            life: 20
        });
        
        if (this.points.length > this.maxPoints) {
            this.points.shift();
        }
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (!this.isActive && this.points.length === 0) return;
        
        for (let i = 0; i < this.points.length; i++) {
            const p = this.points[i];
            
            p.life--;
            p.size *= 0.9;
            
            if (p.life <= 0 || p.size < 0.5) {
                this.points.splice(i, 1);
                i--;
                continue;
            }
            
            // Draw point
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.life / 20;
            this.ctx.fill();
            
            // Connect consecutive points
            if (i > 0) {
                const prev = this.points[i - 1];
                this.ctx.beginPath();
                this.ctx.strokeStyle = p.color;
                this.ctx.globalAlpha = (p.life / 20) * 0.5;
                this.ctx.lineWidth = p.size / 2;
                this.ctx.moveTo(p.x, p.y);
                this.ctx.lineTo(prev.x, prev.y);
                this.ctx.stroke();
            }
        }
    }
}

// Initialize mouse trail on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        new MouseTrail();
    }, 1500);
});
