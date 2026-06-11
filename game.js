/**
 * SAHIBUL & ISHITA: A Skyward Bound Odyssey
 * Core Game Engine and Logic
 */

// Web Audio API Synthesizer
class SoundSynth {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.bgOsc = null;
        this.bgGain = null;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playJump() {
        if (!this.ctx || this.muted) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
        
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.12);
    }

    playCoin() {
        if (!this.ctx || this.muted) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(988, now); // B5
        osc.frequency.setValueAtTime(1318, now + 0.08); // E6
        
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.setValueAtTime(0.1, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.25);
    }

    playHurt() {
        if (!this.ctx || this.muted) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);
        
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.25);
    }

    playSquish() {
        if (!this.ctx || this.muted) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);
        
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.15);
    }

    playKiss() {
        if (!this.ctx || this.muted) return;
        const now = this.ctx.currentTime;
        
        // Double sweet chirp
        for (let i = 0; i < 2; i++) {
            const delay = i * 0.08;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600 + i * 200, now + delay);
            osc.frequency.exponentialRampToValueAtTime(1000 + i * 200, now + delay + 0.06);
            
            gain.gain.setValueAtTime(0.08, now + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.06);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now + delay);
            osc.stop(now + delay + 0.06);
        }
    }

    playClear() {
        if (!this.ctx || this.muted) return;
        this.stopMusic();
        const now = this.ctx.currentTime;
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C Major scale arpeggio
        
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.1);
            
            gain.gain.setValueAtTime(0.08, now + idx * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.4);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now + idx * 0.1);
            osc.stop(now + idx * 0.1 + 0.4);
        });
    }

    playFall() {
        if (!this.ctx || this.muted) return;
        this.stopMusic();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.linearRampToValueAtTime(80, now + 1.8);
        
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 1.8);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(now);
        osc.stop(now + 1.8);
    }

    playTragicSong() {
        if (!this.ctx || this.muted) return;
        const now = this.ctx.currentTime;
        // Sad sequence of minor chords
        const notes = [
            { f: 220, t: 0 },    // A3
            { f: 261.63, t: 0.3 }, // C4
            { f: 329.63, t: 0.6 }, // E4
            { f: 440, t: 0.9 },   // A4
            { f: 392, t: 1.5 },   // G4
            { f: 349.23, t: 2.1 }, // F4
            { f: 329.63, t: 2.7 }  // E4
        ];
        
        notes.forEach(note => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(note.f, now + note.t);
            gain.gain.setValueAtTime(0.12, now + note.t);
            gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + 0.8);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + note.t);
            osc.stop(now + note.t + 0.8);
        });
    }

    startMusic(level) {
        if (!this.ctx || this.muted) return;
        this.stopMusic();
        
        const now = this.ctx.currentTime;
        this.bgGain = this.ctx.createGain();
        this.bgGain.gain.setValueAtTime(0.04, now); // Quiet bg music
        this.bgGain.connect(this.ctx.destination);
        
        // Loop a simple arpeggio
        const tempo = level === 3 ? 0.12 : level === 2 ? 0.16 : 0.2;
        let scale = [261.63, 293.66, 329.63, 392.00, 440.00]; // Pentatonic Major
        if (level === 2) scale = [261.63, 277.18, 329.63, 349.23, 392.00, 415.30]; // Phrygian/Minor feel
        if (level === 3) scale = [293.66, 349.23, 440.00, 523.25, 587.33]; // Atmospheric D Minor
        
        let step = 0;
        const playStep = () => {
            if (!this.bgGain) return;
            const t = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const noteGain = this.ctx.createGain();
            
            // Choose note based on level theme
            let note = scale[step % scale.length];
            if (level === 3 && step % 8 === 0) note = scale[0] / 2; // Deep bass note
            
            osc.type = level === 1 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(note, t);
            
            noteGain.gain.setValueAtTime(0.04, t);
            noteGain.gain.exponentialRampToValueAtTime(0.001, t + tempo * 2);
            
            osc.connect(noteGain);
            noteGain.connect(this.bgGain);
            osc.start(t);
            osc.stop(t + tempo * 2);
            
            step++;
            const delay = tempo * 1000;
            this.bgTimer = setTimeout(playStep, delay);
        };
        
        playStep();
    }

    stopMusic() {
        if (this.bgTimer) clearTimeout(this.bgTimer);
        if (this.bgGain) {
            try {
                this.bgGain.disconnect();
            } catch(e){}
            this.bgGain = null;
        }
    }
}

const sfx = new SoundSynth();

// GAME STATES
const STATES = {
    MENU: 'menu',
    LEVEL_SELECT: 'level_select',
    PLAYING: 'playing',
    CUTSCENE: 'cutscene',
    GAMEOVER: 'gameover',
    LEVELCLEAR: 'levelclear',
    TRAGEDY: 'tragedy'
};

let gameState = STATES.MENU;
let currentLevel = 1;
let score = 0;
let timeRemaining = 120;
let timerInterval = null;

// Game canvas setup
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const menuBgCanvas = document.getElementById('menu-bg-canvas');
const menuBgCtx = menuBgCanvas.getContext('2d');

// Game Engine Configs
const GRAVITY = 0.45;
const FRICTION = 0.85;

// Cameras
const camera = {
    x: 0,
    y: 0,
    width: 960,
    height: 540
};

// Keys State
const keys = {
    left: false,
    right: false,
    up: false,
    w: false,
    space: false
};

// Player Object
const player = {
    x: 100,
    y: 300,
    width: 28,
    height: 48,
    vx: 0,
    vy: 0,
    speed: 4.5,
    jumpForce: 11.0,
    grounded: false,
    coyoteFrames: 0,       // Coyote time frames
    jumpBufferFrames: 0,   // Jump buffering frames
    health: 5,
    maxHealth: 5,
    invulnerableFrames: 0,
    invulnerableDuration: 60, // 1 second at 60fps
    state: 'idle', // idle, running, jumping, hurt, falling
    facing: 'right',
    animFrame: 0,
    animTick: 0
};

// Goal Character (Ishita)
const ishita = {
    x: 2800,
    y: 300,
    width: 28,
    height: 48,
    animFrame: 0,
    animTick: 0
};

// Dialogue cutscene variables
let currentDialogueIdx = 0;
let activeDialogueScript = [];
let dialogueCallback = null;

// Particles
let particles = [];
function addSparkles(x, y, color = '#eab308', count = 8) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4 - 2,
            size: Math.random() * 3 + 2,
            color: color,
            alpha: 1,
            decay: Math.random() * 0.02 + 0.02,
            type: 'sparkle'
        });
    }
}

function addHearts(x, y, count = 5) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 3,
            vy: -Math.random() * 3 - 1,
            size: Math.random() * 8 + 6,
            color: '#ef4444',
            alpha: 1,
            decay: Math.random() * 0.01 + 0.015,
            type: 'heart',
            rot: (Math.random() - 0.5) * 0.5
        });
    }
}

// World objects
let platforms = [];
let enemies = [];
let coins = [];
let hazards = []; // Lava or spikes
let meteors = [];
let meteorTimer = 0;
let levelWidth = 3000;

// Levels Definitions
const LEVELS = {
    1: {
        title: "Forest Valley",
        challenge: "Bouncing Slimes & Gaps",
        width: 3200,
        spawn: { x: 100, y: 350 },
        goal: { x: 3000, y: 360 },
        background: 'linear-gradient(180deg, #1e1b4b 0%, #064e3b 100%)',
        setup: function() {
            // Platforms
            platforms = [
                // Ground segments with gaps
                { x: 0, y: 440, w: 600, h: 100, type: 'ground' },
                { x: 750, y: 440, w: 700, h: 100, type: 'ground' },
                { x: 1600, y: 440, w: 800, h: 100, type: 'ground' },
                { x: 2550, y: 440, w: 700, h: 100, type: 'ground' },
                
                // Floating platforms
                { x: 450, y: 320, w: 120, h: 20, type: 'stone' },
                { x: 700, y: 280, w: 100, h: 20, type: 'stone' },
                { x: 1050, y: 320, w: 150, h: 20, type: 'stone' },
                { x: 1300, y: 240, w: 120, h: 20, type: 'stone' },
                { x: 1500, y: 320, w: 100, h: 20, type: 'stone' },
                { x: 1900, y: 300, w: 160, h: 20, type: 'stone' },
                { x: 2150, y: 220, w: 120, h: 20, type: 'stone' },
                { x: 2420, y: 320, w: 150, h: 20, type: 'stone' }
            ];

            // Enemies
            enemies = [
                { x: 350, y: 400, vx: 1.5, limitL: 100, limitR: 550, type: 'slime', size: 16 },
                { x: 900, y: 400, vx: 1.8, limitL: 780, limitR: 1400, type: 'slime', size: 16 },
                { x: 1200, y: 280, vx: 2, limitL: 1060, limitR: 1190, type: 'slime', size: 14 },
                { x: 1800, y: 400, vx: 2.2, limitL: 1650, limitR: 2350, type: 'slime', size: 18 },
                { x: 2000, y: 260, vx: 1.5, limitL: 1910, limitR: 2050, type: 'slime', size: 14 },
                { x: 2700, y: 400, vx: 2, limitL: 2600, limitR: 2950, type: 'slime', size: 16 }
            ];

            // Coins
            coins = [
                { x: 300, y: 380, collected: false },
                { x: 480, y: 270, collected: false },
                { x: 520, y: 270, collected: false },
                { x: 750, y: 230, collected: false },
                { x: 1100, y: 270, collected: false },
                { x: 1130, y: 270, collected: false },
                { x: 1350, y: 190, collected: false },
                { x: 1750, y: 380, collected: false },
                { x: 1950, y: 250, collected: false },
                { x: 2200, y: 170, collected: false },
                { x: 2500, y: 270, collected: false }
            ];
            
            hazards = [];
            meteors = [];
        }
    },
    2: {
        title: "The Lava Ruins",
        challenge: "Sizzling Lava & Moving Platforms",
        width: 3200,
        spawn: { x: 100, y: 350 },
        goal: { x: 3000, y: 360 },
        background: 'linear-gradient(180deg, #1e1b4b 0%, #7f1d1d 100%)',
        setup: function() {
            // Platforms
            platforms = [
                // Start and End safety ground
                { x: 0, y: 440, w: 350, h: 100, type: 'ruins' },
                { x: 2850, y: 440, w: 400, h: 100, type: 'ruins' },
                
                // Static Floating Ruins
                { x: 500, y: 350, w: 180, h: 30, type: 'ruins' },
                { x: 800, y: 280, w: 120, h: 30, type: 'ruins' },
                { x: 1350, y: 320, w: 200, h: 30, type: 'ruins' },
                { x: 1950, y: 280, w: 160, h: 30, type: 'ruins' },
                { x: 2550, y: 340, w: 200, h: 30, type: 'ruins' },
                
                // Moving Platforms: { x, y, w, h, type, isMoving: true, rangeX, rangeY, speed, startX, startY }
                { x: 1050, y: 360, w: 120, h: 20, type: 'stone', isMoving: true, rangeX: 0, rangeY: 100, speed: 0.03, startX: 1050, startY: 300 },
                { x: 1650, y: 250, w: 120, h: 20, type: 'stone', isMoving: true, rangeX: 120, rangeY: 0, speed: 0.02, startX: 1650, startY: 250 },
                { x: 2250, y: 320, w: 120, h: 20, type: 'stone', isMoving: true, rangeX: 0, rangeY: 120, speed: 0.025, startX: 2250, startY: 260 }
            ];

            // Enemies (Fiery Red Slimes)
            enemies = [
                { x: 550, y: 310, vx: 2, limitL: 510, limitR: 670, type: 'fireslime', size: 16 },
                { x: 1400, y: 280, vx: 2.2, limitL: 1360, limitR: 1530, type: 'fireslime', size: 18 },
                { x: 2000, y: 240, vx: 1.8, limitL: 1960, limitR: 2090, type: 'fireslime', size: 15 },
                { x: 2950, y: 400, vx: 1.5, limitL: 2870, limitR: 3100, type: 'slime', size: 16 }
            ];

            // Coins
            coins = [
                { x: 550, y: 300, collected: false },
                { x: 590, y: 300, collected: false },
                { x: 860, y: 230, collected: false },
                { x: 1110, y: 200, collected: false }, // Above moving platform
                { x: 1450, y: 270, collected: false },
                { x: 1710, y: 180, collected: false }, // Above moving platform
                { x: 2030, y: 230, collected: false },
                { x: 2310, y: 150, collected: false },
                { x: 2650, y: 290, collected: false }
            ];

            // Lava Hazards at the bottom
            hazards = [
                { x: 300, y: 500, w: 2600, h: 40, type: 'lava' }
            ];
            
            meteors = [];
        }
    },
    3: {
        title: "The Cloud Castle",
        challenge: "Narrow Columns, High Winds & Meteors",
        width: 3000,
        spawn: { x: 100, y: 350 },
        goal: { x: 2800, y: 300 }, // Final platform is higher up
        background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 60%, #311042 100%)',
        setup: function() {
            // Platforms - Small cloud pillars, very precise
            platforms = [
                { x: 0, y: 440, w: 250, h: 100, type: 'cloud' },
                { x: 350, y: 380, w: 100, h: 200, type: 'cloud_pillar' },
                { x: 550, y: 320, w: 100, h: 300, type: 'cloud_pillar' },
                { x: 750, y: 260, w: 100, h: 400, type: 'cloud_pillar' },
                
                // Crumbling Cloud Platforms: { x, y, w, h, type, isCrumbling: true, crumbleTimer: -1, isFallen: false }
                { x: 950, y: 280, w: 120, h: 20, type: 'crumble', isCrumbling: true, crumbleTimer: -1, isFallen: false, initialY: 280 },
                { x: 1150, y: 320, w: 120, h: 20, type: 'crumble', isCrumbling: true, crumbleTimer: -1, isFallen: false, initialY: 320 },
                { x: 1350, y: 260, w: 120, h: 20, type: 'crumble', isCrumbling: true, crumbleTimer: -1, isFallen: false, initialY: 260 },
                
                // Normal Clouds
                { x: 1580, y: 240, w: 140, h: 25, type: 'cloud' },
                { x: 1820, y: 300, w: 100, h: 25, type: 'cloud' },
                
                // Crumbling chain leading up
                { x: 2020, y: 260, w: 80, h: 20, type: 'crumble', isCrumbling: true, crumbleTimer: -1, isFallen: false, initialY: 260 },
                { x: 2180, y: 220, w: 80, h: 20, type: 'crumble', isCrumbling: true, crumbleTimer: -1, isFallen: false, initialY: 220 },
                { x: 2340, y: 260, w: 80, h: 20, type: 'crumble', isCrumbling: true, crumbleTimer: -1, isFallen: false, initialY: 260 },
                
                // Final altar where Ishita stands (this will crumble in the ending cutscene)
                { x: 2550, y: 360, w: 450, h: 200, type: 'final_altar', scaleY: 1 }
            ];

            // Flying cloud enemies
            enemies = [
                { x: 580, y: 280, vx: 1.2, limitL: 560, limitR: 640, type: 'cloudelemental', size: 14 },
                { x: 1600, y: 200, vx: 2, limitL: 1590, limitR: 1710, type: 'cloudelemental', size: 15 },
                { x: 1830, y: 260, vx: 1.5, limitL: 1820, limitR: 1910, type: 'cloudelemental', size: 14 }
            ];

            // Coins
            coins = [
                { x: 400, y: 320, collected: false },
                { x: 600, y: 260, collected: false },
                { x: 800, y: 200, collected: false },
                { x: 1010, y: 220, collected: false }, // Crumble 1
                { x: 1210, y: 260, collected: false }, // Crumble 2
                { x: 1410, y: 200, collected: false }, // Crumble 3
                { x: 1650, y: 180, collected: false },
                { x: 2060, y: 200, collected: false },
                { x: 2220, y: 160, collected: false }
            ];

            hazards = [];
            meteors = [];
            meteorTimer = 0;
        }
    }
};

// Dialogue Scripting
const dialogueLibrary = {
    level1Intro: [
        { name: "Sahibul", text: "Ishita! Can you hear me? I see you on the other side of the valley!", speaker: "sahibul" },
        { name: "Ishita", text: "Sahibul! Watch out for the bouncing green slimes! Please hurry!", speaker: "ishita" }
    ],
    level2Intro: [
        { name: "Sahibul", text: "The temperature is rising! The ground here is gone...", speaker: "sahibul" },
        { name: "Ishita", text: "It's the ancient lava ruins! Leap across the floating stones carefully!", speaker: "ishita" }
    ],
    level3Intro: [
        { name: "Sahibul", text: "We are high in the clouds... The wind is pushing against me!", speaker: "sahibul" },
        { name: "Ishita", text: "Be careful! The clouds are fragile, and fire meteors are falling from the cosmic rift!", speaker: "ishita" }
    ],
    level3Tragedy: [
        { name: "Sahibul", text: "Ishita! I've cleared the sky pillars! I'm finally here!", speaker: "sahibul" },
        { name: "Ishita", text: "Oh Sahibul! You actually made it... but wait, the altar! It's shaking!", speaker: "ishita" },
        { name: "Sahibul", text: "No... The foundation is giving way! Hold on to me!", speaker: "sahibul" },
        { name: "Ishita", text: "SAHIBUL!!!! NO!!!", speaker: "ishita" }
    ]
};

// INITIALIZATION
window.onload = function() {
    setupMenuHandlers();
    initMenuBgAnimation();
    
    // Check if touch device or screen width is mobile-sized, show mobile controls
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 1024) {
        document.getElementById('mobile-controls').style.display = 'flex';
        setupTouchControls();
    }
    
    // Resize handler
    window.addEventListener('resize', handleResize);
    handleResize();
};

function handleResize() {
    const wrapper = document.getElementById('app-container');
    const scaleX = window.innerWidth / 960;
    const scaleY = window.innerHeight / 540;
    // Scale wrapper to fill screen fully (maintaining aspect ratio)
    const scale = Math.min(scaleX, scaleY);
    wrapper.style.transform = `scale(${scale})`;
}

// SETUP MENU INTERACTIVES
function setupMenuHandlers() {
    // Automatically blur any clicked button to prevent Spacebar re-triggering it
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => btn.blur());
    });

    // Native Fullscreen API Toggle
    const fsBtn = document.getElementById('btn-fullscreen');
    if (fsBtn) {
        fsBtn.onclick = () => {
            const container = document.getElementById('app-container');
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                const req = container.requestFullscreen || container.webkitRequestFullscreen;
                if (req) {
                    req.call(container).catch(err => {
                        console.log(`Fullscreen error: ${err.message}`);
                    });
                }
            } else {
                const exit = document.exitFullscreen || document.webkitExitFullscreen;
                if (exit) {
                    exit.call(document);
                }
            }
        };
    }

    const startMenu = document.getElementById('start-menu');
    const levelMenu = document.getElementById('level-menu');
    const hud = document.getElementById('game-hud');
    
    document.getElementById('btn-start-game').onclick = () => {
        sfx.init();
        startMenu.classList.remove('active');
        startGame(1);
    };

    document.getElementById('btn-level-select').onclick = () => {
        sfx.init();
        startMenu.classList.remove('active');
        levelMenu.classList.add('active');
    };

    document.getElementById('btn-level-back').onclick = () => {
        levelMenu.classList.remove('active');
        startMenu.classList.add('active');
    };

    // Level card selection click events
    const levelCards = document.querySelectorAll('.level-select-card');
    levelCards.forEach(card => {
        card.onclick = () => {
            levelCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            currentLevel = parseInt(card.getAttribute('data-level'));
            
            levelMenu.classList.remove('active');
            startGame(currentLevel);
        };
    });

    // In Game Screen Actions
    document.getElementById('btn-resume').onclick = () => {
        document.getElementById('pause-screen').classList.remove('active');
        gameState = STATES.PLAYING;
        startTimer();
    };

    document.getElementById('btn-restart').onclick = () => {
        document.getElementById('pause-screen').classList.remove('active');
        startGame(currentLevel);
    };

    document.getElementById('btn-quit').onclick = () => {
        document.getElementById('pause-screen').classList.remove('active');
        quitToMenu();
    };

    document.getElementById('btn-next-level').onclick = () => {
        document.getElementById('level-clear-screen').classList.remove('active');
        if (currentLevel < 3) {
            currentLevel++;
            startGame(currentLevel);
        } else {
            quitToMenu();
        }
    };

    document.getElementById('btn-clear-replay').onclick = () => {
        document.getElementById('level-clear-screen').classList.remove('active');
        startGame(currentLevel);
    };

    document.getElementById('btn-retry').onclick = () => {
        document.getElementById('game-over-screen').classList.remove('active');
        startGame(currentLevel);
    };

    document.getElementById('btn-gameover-quit').onclick = () => {
        document.getElementById('game-over-screen').classList.remove('active');
        quitToMenu();
    };

    document.getElementById('btn-tragedy-replay').onclick = () => {
        document.getElementById('tragic-end-screen').classList.remove('active');
        startGame(1); // Start from beginning
    };

    document.getElementById('btn-tragedy-quit').onclick = () => {
        document.getElementById('tragic-end-screen').classList.remove('active');
        quitToMenu();
    };

    // Dialogue tap/click handler for mobile
    document.getElementById('dialogue-box').onclick = () => {
        if (gameState === STATES.CUTSCENE) {
            advanceDialogue();
        }
    };

    // Keyboard handlers
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

function handleKeyDown(e) {
    if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
        if (gameState !== STATES.MENU) {
            e.preventDefault();
            if (document.activeElement) {
                document.activeElement.blur();
            }
        }
    }

    if (gameState === STATES.PLAYING) {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = true;
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = true;
        if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
            keys.up = true;
            keys.w = true;
            keys.space = true;
        }
        if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
            pauseGame();
        }
    } else if (gameState === STATES.CUTSCENE) {
        if (e.key === ' ' || e.key === 'Enter') {
            advanceDialogue();
        }
    }
}

function handleKeyUp(e) {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
        keys.up = false;
        keys.w = false;
        keys.space = false;
    }
}

function setupTouchControls() {
    const leftBtn = document.getElementById('btn-left');
    const rightBtn = document.getElementById('btn-right');
    const jumpBtn = document.getElementById('btn-jump');

    leftBtn.ontouchstart = (e) => { e.preventDefault(); keys.left = true; };
    leftBtn.ontouchend = (e) => { e.preventDefault(); keys.left = false; };
    
    rightBtn.ontouchstart = (e) => { e.preventDefault(); keys.right = true; };
    rightBtn.ontouchend = (e) => { e.preventDefault(); keys.right = false; };
    
    jumpBtn.ontouchstart = (e) => { 
        e.preventDefault(); 
        if (gameState === STATES.PLAYING) {
            keys.up = true; 
        } else if (gameState === STATES.CUTSCENE) {
            advanceDialogue();
        }
    };
    jumpBtn.ontouchend = (e) => { e.preventDefault(); keys.up = false; };
}

// GAME LIFECYCLE
function startGame(level) {
    if (document.activeElement) {
        document.activeElement.blur();
    }
    currentLevel = level;
    score = 0;
    timeRemaining = 120;
    particles = [];
    
    // Setup Level parameters
    const lvlDef = LEVELS[currentLevel];
    lvlDef.setup();
    
    // Player spawn
    player.x = lvlDef.spawn.x;
    player.y = lvlDef.spawn.y;
    player.vx = 0;
    player.vy = 0;
    player.health = 5;
    player.state = 'idle';
    player.grounded = false;
    player.invulnerableFrames = 0;
    
    // Goal spawn
    ishita.x = lvlDef.goal.x;
    ishita.y = lvlDef.goal.y;
    
    // Update HUD
    updateHUD();
    document.getElementById('game-hud').style.opacity = '1';
    
    // Load state
    gameState = STATES.PLAYING;
    sfx.startMusic(currentLevel);
    startTimer();
    
    // Trigger cutscene intro dialogue
    let introKey = `level${currentLevel}Intro`;
    triggerDialogue(dialogueLibrary[introKey]);
    
    // Start loop
    if (!gameLoopRunning) {
        gameLoopRunning = true;
        requestAnimationFrame(gameLoop);
    }
}

function quitToMenu() {
    sfx.stopMusic();
    gameState = STATES.MENU;
    document.getElementById('game-hud').style.opacity = '0';
    document.getElementById('start-menu').classList.add('active');
    stopTimer();
}

function pauseGame() {
    if (gameState === STATES.PLAYING) {
        gameState = STATES.CUTSCENE; // Reuse to block input
        document.getElementById('pause-screen').classList.add('active');
        stopTimer();
    }
}

// TIMER HANDLERS
function startTimer() {
    stopTimer();
    timerInterval = setInterval(() => {
        if (gameState === STATES.PLAYING) {
            timeRemaining--;
            document.getElementById('hud-timer-val').innerText = timeRemaining.toString().padStart(3, '0');
            if (timeRemaining <= 0) {
                damagePlayer(999); // Instantly defeat
            }
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateHUD() {
    document.getElementById('hud-level-val').innerText = currentLevel.toString().padStart(2, '0');
    document.getElementById('hud-challenge-val').innerText = LEVELS[currentLevel].challenge;
    document.getElementById('hud-coins-val').innerText = score.toString().padStart(2, '0');
    document.getElementById('hud-timer-val').innerText = timeRemaining.toString().padStart(3, '0');
    
    // Update Hearts HTML
    const hearts = document.querySelectorAll('#hud-hearts-container .heart');
    hearts.forEach((heart, idx) => {
        if (idx < player.health) {
            heart.classList.add('active');
        } else {
            heart.classList.remove('active');
        }
    });
}

// DAMAGE AND HEAL
function damagePlayer(amount) {
    if (player.invulnerableFrames > 0) return;
    
    player.health -= amount;
    player.invulnerableFrames = player.invulnerableDuration;
    player.state = 'hurt';
    sfx.playHurt();
    
    updateHUD();
    
    if (player.health <= 0) {
        triggerGameOver();
    } else {
        // Little bounce
        player.vy = -5;
        player.vx = player.facing === 'right' ? -3 : 3;
    }
}

function triggerGameOver() {
    gameState = STATES.GAMEOVER;
    sfx.stopMusic();
    stopTimer();
    
    const subtitle = currentLevel === 2 ? "Burned in the scorching ruins." : currentLevel === 3 ? "Swallowed by the stormy sky castle." : "Defeated by the slimes of Forest Valley.";
    document.getElementById('fail-subtitle').innerText = subtitle;
    document.getElementById('game-over-screen').classList.add('active');
}

// DIALOGUE CUTSCENE SYSTEM
function triggerDialogue(script, callback = null) {
    activeDialogueScript = script;
    currentDialogueIdx = 0;
    dialogueCallback = callback;
    
    if (script && script.length > 0) {
        gameState = STATES.CUTSCENE;
        showDialogueStep();
        document.getElementById('dialogue-box').classList.add('active');
    }
}

function showDialogueStep() {
    const step = activeDialogueScript[currentDialogueIdx];
    const nameEl = document.getElementById('dialogue-speaker-name');
    const textEl = document.getElementById('dialogue-text');
    const avatarContainer = document.getElementById('speaker-avatar-container');
    
    nameEl.innerText = step.name;
    textEl.innerText = step.text;
    
    // Style and setup avatar
    avatarContainer.innerHTML = '';
    
    const svgNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgNode.setAttribute("viewBox", "0 0 100 100");
    svgNode.style.width = "100%";
    svgNode.style.height = "100%";
    
    if (step.speaker === 'sahibul') {
        avatarContainer.className = "dialogue-speaker-avatar avatar-sahibul";
        svgNode.innerHTML = `
            <circle cx="50" cy="40" r="25" fill="#3B82F6" />
            <rect x="35" y="65" width="30" height="30" rx="10" fill="#1D4ED8" />
            <path d="M22 35 C 22 15, 78 15, 78 35 Z" fill="#1E293B" />
            <circle cx="43" cy="38" r="3" fill="#FFFFFF" /><circle cx="57" cy="38" r="3" fill="#FFFFFF" />
            <circle cx="43" cy="38" r="1.5" fill="#000" /><circle cx="57" cy="38" r="1.5" fill="#000" />
            <path d="M43 48 Q 50 54, 57 48" stroke="#FFFFFF" stroke-width="2" fill="none" />
        `;
    } else {
        avatarContainer.className = "dialogue-speaker-avatar avatar-ishita";
        svgNode.innerHTML = `
            <circle cx="50" cy="40" r="25" fill="#F472B6" />
            <rect x="35" y="65" width="30" height="30" rx="10" fill="#DB2777" />
            <path d="M20 38 C 15 15, 85 15, 80 38 C 75 50, 75 70, 75 70 C 75 50, 65 30, 50 30 C 35 30, 25 50, 25 70 C 25 70, 15 50, 20 38 Z" fill="#4C1D95" />
            <polygon points="40,20 45,12 50,22 55,12 60,20" fill="#FBBF24" />
            <circle cx="43" cy="38" r="3" fill="#FFFFFF" /><circle cx="57" cy="38" r="3" fill="#FFFFFF" />
            <circle cx="43" cy="38" r="1.5" fill="#000" /><circle cx="57" cy="38" r="1.5" fill="#000" />
            <circle cx="37" cy="44" r="2.5" fill="#FDA4AF" opacity="0.8" /><circle cx="63" cy="44" r="2.5" fill="#FDA4AF" opacity="0.8" />
            <path d="M44 48 Q 50 53, 56 48" stroke="#FFFFFF" stroke-width="2" fill="none" />
        `;
    }
    
    avatarContainer.appendChild(svgNode);
}

function advanceDialogue() {
    currentDialogueIdx++;
    if (currentDialogueIdx < activeDialogueScript.length) {
        showDialogueStep();
    } else {
        // Dialogue finished
        document.getElementById('dialogue-box').classList.remove('active');
        gameState = STATES.PLAYING;
        if (dialogueCallback) {
            dialogueCallback();
            dialogueCallback = null;
        } else {
            // Unpause background music/timer
            startTimer();
        }
    }
}

// WIN / KISSCENE TRIGGER
let cutsceneTimer = 0;
function triggerLevelClear() {
    gameState = STATES.CUTSCENE;
    stopTimer();
    sfx.stopMusic();
    sfx.playClear();
    
    // Center camera on them
    const midpoint = (player.x + ishita.x) / 2;
    camera.x = midpoint - camera.width / 2;
    
    // Scripted walk towards each other
    let walkTimer = setInterval(() => {
        let moved = false;
        
        // Sahibul walks to Ishita
        if (player.x < ishita.x - 32) {
            player.x += 1.5;
            player.state = 'running';
            player.facing = 'right';
            moved = true;
        } else if (player.x > ishita.x + 32) {
            player.x -= 1.5;
            player.state = 'running';
            player.facing = 'left';
            moved = true;
        } else {
            player.state = 'idle';
        }
        
        // Ishita faces Sahibul
        if (ishita.x < player.x) {
            ishita.facing = 'right';
        } else {
            ishita.facing = 'left';
        }
        
        if (!moved) {
            clearInterval(walkTimer);
            // Engage in Kiss Animation!
            sfx.playKiss();
            addHearts((player.x + ishita.x) / 2, player.y - 10, 12);
            
            // Pop clear screen after delay
            setTimeout(() => {
                const titleText = currentLevel === 1 ? "A Grassy Valley Embrace!" : "A Warm Bridge Reunion!";
                const msgText = currentLevel === 1 
                    ? '"Sahibul! I was so scared. Your bravery is unmatched!"'
                    : '"Oh Sahibul, crossing that sizzling lava for me... You are my hero!"';
                
                document.getElementById('clear-title').innerText = titleText;
                document.getElementById('clear-message').innerText = msgText;
                
                // Animate hearts inside clear modal too
                const modalHearts = document.getElementById('clear-hearts');
                modalHearts.innerHTML = '';
                for(let i=0; i<15; i++) {
                    const heart = document.createElement('div');
                    heart.className = 'heart-pop-particle';
                    heart.style.left = `${30 + Math.random() * 40}%`;
                    heart.style.top = `${40 + Math.random() * 40}%`;
                    heart.style.animationDelay = `${i * 0.1}s`;
                    heart.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' fill='%23db2777'/%3E%3C/svg%3E")`;
                    heart.style.width = `${12 + Math.random() * 12}px`;
                    heart.style.height = heart.style.width;
                    modalHearts.appendChild(heart);
                }
                
                document.getElementById('level-clear-screen').classList.add('active');
                gameState = STATES.LEVELCLEAR;
            }, 1000);
        }
    }, 20);
}

// LEVEL 3 TRAGIC SCRIPTED ENDING
function triggerTragicEnding() {
    gameState = STATES.CUTSCENE;
    stopTimer();
    sfx.stopMusic();
    
    // Stop character physics
    player.vx = 0;
    player.vy = 0;
    player.state = 'idle';
    
    // Lock them close
    player.x = ishita.x - 55;
    
    // Trigger Dialogue block
    triggerDialogue(dialogueLibrary.level3Tragedy, () => {
        // Callback runs when dialogue finishes
        gameState = STATES.CUTSCENE;
        
        // Dramatic sequence:
        // 1. Screen shakes, stone altar crumbles (shrinks scaleY)
        // 2. Sahibul falls down flailing
        // 3. Play falling audio sweep
        // 4. Trigger tragic screen
        
        let shakeFrames = 60;
        let altarPlatform = platforms.find(p => p.type === 'final_altar');
        
        sfx.playFall();
        
        let tragedyLoop = () => {
            if (shakeFrames > 0) {
                // Shake camera
                camera.x += (Math.random() - 0.5) * 8;
                camera.y += (Math.random() - 0.5) * 8;
                shakeFrames--;
                
                // Spawn dust particles
                addSparkles(player.x + 30, player.y + 40, '#475569', 2);
                
                // Crumble the altar slowly
                if (altarPlatform) {
                    altarPlatform.scaleY -= 0.005;
                }
                
                requestAnimationFrame(tragedyLoop);
            } else {
                // Sahibul falls!
                player.state = 'falling';
                let fallSpeed = 1.5;
                
                let fallLoop = () => {
                    player.y += fallSpeed;
                    fallSpeed += 0.3; // Gravity acceleration
                    
                    // Tilt/Flail arms rotation is simulated via canvas draw
                    
                    // Center camera following Sahibul down
                    if (player.y > 400) {
                        camera.y += (player.y - camera.y - 300) * 0.1;
                    }
                    
                    if (player.y < 580) {
                        requestAnimationFrame(fallLoop);
                    } else {
                        // Gone in abyss. Play final minor song and show screen
                        sfx.playTragicSong();
                        document.getElementById('tragic-end-screen').classList.add('active');
                        gameState = STATES.TRAGEDY;
                    }
                };
                
                // Add minor screen shake on trigger
                fallLoop();
            }
        };
        
        tragedyLoop();
    });
}

// PHYSIC ENGINE & UPDATE
let gameLoopRunning = false;

function gameLoop() {
    if (gameState === STATES.PLAYING || gameState === STATES.CUTSCENE) {
        updatePhysics();
        updateMeteors();
        updateEnemies();
        updateParticles();
        drawGame();
        requestAnimationFrame(gameLoop);
    } else if (gameState === STATES.LEVELCLEAR || gameState === STATES.GAMEOVER || gameState === STATES.TRAGEDY) {
        // Just keep rendering background/particles
        updateParticles();
        drawGame();
        requestAnimationFrame(gameLoop);
    } else {
        gameLoopRunning = false;
    }
}

function updatePhysics() {
    if (gameState === STATES.PLAYING) {
        // Wind push on Level 3 (reduced to 0.045 for easier control)
        if (currentLevel === 3) {
            player.vx -= 0.045; // Continuous leftward drift
        }

        // Handle coyote frames and jump buffer decrements
        if (player.coyoteFrames > 0) player.coyoteFrames--;
        if (player.jumpBufferFrames > 0) player.jumpBufferFrames--;

        // Set coyote frames if on ground
        if (player.grounded) {
            player.coyoteFrames = 8; // 8 frames of coyote time (generous!)
        }

        // Set jump buffer if jump key is pressed
        if (keys.up || keys.space || keys.w) {
            player.jumpBufferFrames = 6; // Buffer jump for 6 frames
        }

        // Horizontal input
        if (keys.left) {
            player.vx -= 0.45;
            player.facing = 'left';
            player.state = player.grounded ? 'running' : 'jumping';
        } else if (keys.right) {
            player.vx += 0.45;
            player.facing = 'right';
            player.state = player.grounded ? 'running' : 'jumping';
        } else {
            player.vx *= FRICTION;
            if (player.grounded) {
                player.state = 'idle';
            }
        }
        
        // Jump input check combining coyote time and jump buffering
        if (player.jumpBufferFrames > 0 && (player.grounded || player.coyoteFrames > 0)) {
            player.vy = -player.jumpForce;
            player.grounded = false;
            player.coyoteFrames = 0;       // Consume coyote frames
            player.jumpBufferFrames = 0;   // Consume jump buffer
            player.state = 'jumping';
            sfx.playJump();
            
            // Add dust particles
            addSparkles(player.x + player.width/2, player.y + player.height, '#cbd5e1', 5);
        }
    }

    // Apply Gravity
    player.vy += GRAVITY;
    
    // Speed clamps
    const maxSpeed = 5.5;
    if (player.vx > maxSpeed) player.vx = maxSpeed;
    if (player.vx < -maxSpeed) player.vx = -maxSpeed;
    
    // Invulnerability flashing
    if (player.invulnerableFrames > 0) {
        player.invulnerableFrames--;
    }

    // Temporary positions
    player.x += player.vx;
    
    // Bounds check X
    if (player.x < 0) {
        player.x = 0;
        player.vx = 0;
    }
    if (player.x > LEVELS[currentLevel].width - player.width) {
        player.x = LEVELS[currentLevel].width - player.width;
        player.vx = 0;
    }

    // Check collisions X with platforms
    player.grounded = false;
    
    // We check Y collision after applying Y velocity
    player.y += player.vy;
    
    // Platform Collisions
    for (let platform of platforms) {
        // Ignore crumbling platforms if they have completely fallen out
        if (platform.isFallen) continue;
        
        // Calculate collision box
        let px = platform.x;
        let py = platform.y;
        let pw = platform.w;
        let ph = platform.h;
        
        // Basic AABB check
        if (player.x < px + pw &&
            player.x + player.width > px &&
            player.y < py + ph &&
            player.y + player.height > py) {
            
            // Resolve collision
            // Calculate overlap on both axes
            let overlapX = Math.min(player.x + player.width - px, px + pw - player.x);
            let overlapY = Math.min(player.y + player.height - py, py + ph - player.y);
            
            if (overlapX < overlapY) {
                // X Resolution
                if (player.x + player.width / 2 < px + pw / 2) {
                    player.x -= overlapX;
                } else {
                    player.x += overlapX;
                }
                player.vx = 0;
            } else {
                // Y Resolution
                if (player.y + player.height / 2 < py + ph / 2) {
                    player.y -= overlapY;
                    player.vy = 0;
                    player.grounded = true;
                    
                    // Trigger crumbling timer if standing on crumble platform
                    if (platform.isCrumbling && platform.crumbleTimer === -1) {
                        platform.crumbleTimer = 48; // Frames before collapse (easier!)
                    }
                } else {
                    player.y += overlapY;
                    player.vy = 0.5; // Bump head bounce
                }
            }
        }
    }
    
    // Handle crumbling platforms updates
    if (currentLevel === 3) {
        for (let p of platforms) {
            if (p.isCrumbling && p.crumbleTimer > 0) {
                p.crumbleTimer--;
                if (p.crumbleTimer === 0) {
                    p.isFallen = true;
                    sfx.playHurt(); // Sound of crumbling
                    addSparkles(p.x + p.w/2, p.y + 10, '#94a3b8', 15);
                    
                    // Quick respawn of platform after 4 seconds
                    setTimeout(() => {
                        p.isFallen = false;
                        p.crumbleTimer = -1;
                        addSparkles(p.x + p.w/2, p.y + 10, '#cbd5e1', 8);
                    }, 4000);
                }
            }
        }
    }

    // Check Coin Collections
    for (let coin of coins) {
        if (!coin.collected) {
            if (player.x < coin.x + 20 &&
                player.x + player.width > coin.x &&
                player.y < coin.y + 20 &&
                player.y + player.height > coin.y) {
                
                coin.collected = true;
                score++;
                sfx.playCoin();
                addSparkles(coin.x + 10, coin.y + 10, '#fbbf24', 8);
                updateHUD();
            }
        }
    }

    // Check Hazards (Lava segment collision)
    if (gameState === STATES.PLAYING) {
        for (let hz of hazards) {
            if (player.x < hz.x + hz.w &&
                player.x + player.width > hz.x &&
                player.y + player.height > hz.y) {
                
                // Fell in Lava! Lose 1 heart and respawn at level start
                damagePlayer(1);
                if (player.health > 0) {
                    // Lava Respawn Sequence
                    player.x = LEVELS[currentLevel].spawn.x;
                    player.y = LEVELS[currentLevel].spawn.y;
                    player.vx = 0;
                    player.vy = 0;
                }
            }
        }

        // Screen bottom abyss check (Level 1 & 3 falling out)
        if (player.y > 540) {
            damagePlayer(1);
            if (player.health > 0) {
                player.x = LEVELS[currentLevel].spawn.x;
                player.y = LEVELS[currentLevel].spawn.y;
                player.vx = 0;
                player.vy = 0;
            }
        }
        
        // Check Goal (Reaching Ishita)
        if (Math.abs(player.x - ishita.x) < 45 && Math.abs(player.y - ishita.y) < 50) {
            if (currentLevel === 3) {
                triggerTragicEnding();
            } else {
                triggerLevelClear();
            }
        }
    }

    // Camera follow (Interpolated for smoothness)
    let targetCamX = player.x - camera.width / 3;
    const maxCamX = LEVELS[currentLevel].width - camera.width;
    if (targetCamX < 0) targetCamX = 0;
    if (targetCamX > maxCamX) targetCamX = maxCamX;
    
    camera.x += (targetCamX - camera.x) * 0.1;
    
    // Vertical camera adjustments on Cloud Level
    if (currentLevel === 3) {
        let targetCamY = player.y - camera.height / 2 - 50;
        if (targetCamY < -100) targetCamY = -100;
        if (targetCamY > 50) targetCamY = 50;
        camera.y += (targetCamY - camera.y) * 0.08;
    } else {
        camera.y += (0 - camera.y) * 0.08;
    }
}

function updateMeteors() {
    if (gameState !== STATES.PLAYING || currentLevel !== 3) return;
    
    meteorTimer++;
    // Spawn meteor every 90-120 frames ahead of camera view
    if (meteorTimer > 100) {
        meteorTimer = 0;
        let spawnX = camera.x + camera.width + Math.random() * 200;
        let spawnY = -50;
        
        meteors.push({
            x: spawnX,
            y: spawnY,
            vx: -3.5 - Math.random() * 2,
            vy: 4 + Math.random() * 2,
            size: 15 + Math.random() * 10
        });
    }
    
    // Update active meteors
    for (let i = meteors.length - 1; i >= 0; i--) {
        let m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        
        // Spawn sparks trail
        if (Math.random() < 0.3) {
            addSparkles(m.x, m.y, '#f97316', 3);
        }
        
        // Check collision with player
        if (player.x < m.x + m.size &&
            player.x + player.width > m.x - m.size &&
            player.y < m.y + m.size &&
            player.y + player.height > m.y - m.size) {
            
            damagePlayer(1);
            meteors.splice(i, 1);
            continue;
        }
        
        // Clean out of bounds meteors
        if (m.y > 600 || m.x < camera.x - 100) {
            meteors.splice(i, 1);
        }
    }
}

function updateEnemies() {
    if (gameState !== STATES.PLAYING) return;

    for (let en of enemies) {
        // Move enemy
        en.x += en.vx;
        
        // Reverse direction at limits
        if (en.x < en.limitL) {
            en.x = en.limitL;
            en.vx = -en.vx;
        }
        if (en.x > en.limitR) {
            en.x = en.limitR;
            en.vx = -en.vx;
        }

        // Fire-slime shooting sparks occasionally
        if (en.type === 'fireslime' && Math.random() < 0.02) {
            addSparkles(en.x, en.y - 10, '#ef4444', 3);
        }

        // Collision with player
        let ex = en.x - en.size;
        let ey = en.y - en.size * 2;
        let ew = en.size * 2;
        let eh = en.size * 2;

        if (player.x < ex + ew &&
            player.x + player.width > ex &&
            player.y < ey + eh &&
            player.y + player.height > ey) {
            
            // Check if jumping on top (Mario squish)
            if (player.vy > 0 && player.y + player.height - player.vy <= ey + 10) {
                // Kill enemy
                sfx.playSquish();
                addSparkles(en.x, en.y - en.size, '#22c55e', 12);
                
                // Remove enemy
                const idx = enemies.indexOf(en);
                if (idx > -1) enemies.splice(idx, 1);
                
                // Bounce player
                player.vy = -7.5;
                player.state = 'jumping';
            } else {
                // Get hurt
                damagePlayer(1);
            }
        }
    }
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        
        if (p.type === 'heart') {
            p.rot += 0.02;
        }
        
        if (p.alpha <= 0) {
            particles.splice(i, 1);
        }
    }
}

// GRAPHICS DRAWING FUNCTIONS
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Save context for camera scrolling
    ctx.save();
    ctx.translate(-camera.x, -camera.y);
    
    // Draw background elements (clouds, stars, ambient sky)
    drawBackground();
    
    // Draw Platforms
    for (let plat of platforms) {
        if (plat.isFallen) continue;
        
        ctx.save();
        if (plat.type === 'final_altar') {
            // Special scale transformation for Level 3 altar crumbling
            ctx.translate(plat.x + plat.w/2, plat.y + plat.h);
            ctx.scale(1, plat.scaleY);
            ctx.translate(-(plat.x + plat.w/2), -(plat.y + plat.h));
        }
        
        drawPlatform(plat);
        ctx.restore();
    }
    
    // Draw Coins
    for (let coin of coins) {
        if (!coin.collected) {
            drawCoin(coin);
        }
    }

    // Draw Hazards (Lava)
    drawHazards();
    
    // Draw Meteors
    for (let m of meteors) {
        drawMeteor(m);
    }
    
    // Draw Goal (Ishita)
    drawGoalIshita();

    // Draw Player (Sahibul)
    drawPlayerSahibul();

    // Draw Particles
    drawParticles();

    ctx.restore();
}

function drawBackground() {
    // We add sky details like stars or drifting clouds
    const levelWidthMax = LEVELS[currentLevel].width;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    if (currentLevel === 1) {
        // Soft rolling hills in background (parallax)
        ctx.beginPath();
        for (let i = 0; i <= levelWidthMax; i += 200) {
            let hillY = 320 + Math.sin(i * 0.005) * 50;
            if (i === 0) ctx.moveTo(i, 540);
            ctx.lineTo(i, hillY);
        }
        ctx.lineTo(levelWidthMax, 540);
        ctx.closePath();
        ctx.fill();
    } else if (currentLevel === 2) {
        // Red glowing volcano silhouettes
        ctx.fillStyle = 'rgba(127, 29, 29, 0.15)';
        ctx.beginPath();
        ctx.moveTo(100, 540);
        ctx.lineTo(350, 250);
        ctx.lineTo(600, 540);
        
        ctx.moveTo(800, 540);
        ctx.lineTo(1100, 200);
        ctx.lineTo(1400, 540);
        
        ctx.moveTo(1800, 540);
        ctx.lineTo(2100, 230);
        ctx.lineTo(2400, 540);
        ctx.fill();
    } else if (currentLevel === 3) {
        // Giant atmospheric clouds
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        for (let i = 0; i < levelWidthMax; i += 400) {
            ctx.beginPath();
            ctx.arc(i + 100, 200, 150, 0, Math.PI * 2);
            ctx.arc(i + 250, 180, 180, 0, Math.PI * 2);
            ctx.arc(i + 380, 220, 120, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

function drawPlatform(p) {
    ctx.shadowBlur = 10;
    
    if (p.type === 'ground' || p.type === 'stone') {
        // Forest green top / earthy brown base
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        let grad = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.h);
        grad.addColorStop(0, '#15803d'); // Green Top
        grad.addColorStop(0.15, '#166534');
        grad.addColorStop(0.2, '#78350f'); // Mud base
        grad.addColorStop(1, '#451a03');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(p.x, p.y, p.w, p.h, [8, 8, 0, 0]);
        ctx.fill();
        
        // Highlight stroke
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    } else if (p.type === 'ruins') {
        // Dark metallic/stone ruins
        ctx.shadowColor = 'rgba(239, 68, 68, 0.2)';
        let grad = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.h);
        grad.addColorStop(0, '#475569'); 
        grad.addColorStop(1, '#1e293b');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(p.x, p.y, p.w, p.h, 6);
        ctx.fill();
        
        // Brick cracks lines
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let bx = p.x + 40; bx < p.x + p.w; bx += 50) {
            ctx.moveTo(bx, p.y);
            ctx.lineTo(bx, p.y + p.h);
        }
        ctx.stroke();
    } else if (p.type === 'cloud' || p.type === 'cloud_pillar' || p.type === 'crumble' || p.type === 'final_altar') {
        // Fluffy cloud platforms
        ctx.shadowColor = 'rgba(255, 255, 255, 0.2)';
        let color = '#f8fafc';
        
        if (p.type === 'crumble') {
            // Fade slightly if shaking
            if (p.crumbleTimer > 0) {
                color = '#cbd5e1';
                // Shake offset draw
                ctx.translate((Math.random() - 0.5) * 4, 0);
            }
        }
        
        let grad = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.h);
        grad.addColorStop(0, color);
        grad.addColorStop(1, '#e2e8f0');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(p.x, p.y, p.w, p.h, 10);
        ctx.fill();
        
        // Draw cloud curves bubbles
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(p.x + 15, p.y, 12, 0, Math.PI * 2);
        ctx.arc(p.x + p.w - 15, p.y, 12, 0, Math.PI * 2);
        ctx.arc(p.x + p.w / 2, p.y - 4, 16, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Process moving platform positions updates
    if (p.isMoving && gameState === STATES.PLAYING) {
        // Sinusoidal movement
        const time = Date.now() * p.speed * 0.1;
        p.x = p.startX + Math.sin(time) * p.rangeX;
        p.y = p.startY + Math.cos(time) * p.rangeY;
    }
    
    ctx.shadowBlur = 0;
}

function drawCoin(c) {
    const coinFrame = Math.floor(Date.now() / 150) % 4;
    ctx.save();
    
    ctx.shadowBlur = 8;
    ctx.shadowColor = 'rgba(234, 179, 8, 0.5)';
    
    ctx.translate(c.x + 10, c.y + 10);
    // Simulate spin scaling width
    let spinWidth = 1;
    if (coinFrame === 1) spinWidth = 0.5;
    if (coinFrame === 2) spinWidth = 0.05;
    if (coinFrame === 3) spinWidth = 0.5;
    
    ctx.scale(spinWidth, 1);
    
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Core highlight
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(-2, -2, 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

function drawHazards() {
    ctx.save();
    // Lava bubbling logic
    for (let hz of hazards) {
        if (hz.type === 'lava') {
            let bubbleOffset = Math.sin(Date.now() * 0.005) * 8;
            
            let grad = ctx.createLinearGradient(hz.x, hz.y + bubbleOffset, hz.x, hz.y + hz.h);
            grad.addColorStop(0, '#ef4444'); // Glowing red top
            grad.addColorStop(0.3, '#f97316'); // Orange
            grad.addColorStop(1, '#7f1d1d'); // Dark volcanic red
            
            ctx.fillStyle = grad;
            ctx.shadowBlur = 25;
            ctx.shadowColor = '#ef4444';
            
            ctx.beginPath();
            ctx.rect(hz.x, hz.y, hz.w, hz.h + 20);
            ctx.fill();
            
            // Draw bubbling waves
            ctx.fillStyle = '#f97316';
            ctx.beginPath();
            for (let bx = hz.x; bx < hz.x + hz.w; bx += 40) {
                let amp = Math.sin((bx + Date.now() * 0.1) * 0.02) * 5;
                ctx.arc(bx, hz.y + amp, 12, 0, Math.PI * 2);
            }
            ctx.fill();
        }
    }
    ctx.restore();
}

function drawMeteor(m) {
    ctx.save();
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#f97316';
    
    let grad = ctx.createRadialGradient(m.x, m.y, 2, m.x, m.y, m.size);
    grad.addColorStop(0, '#fff');
    grad.addColorStop(0.3, '#eab308');
    grad.addColorStop(0.6, '#ea580c');
    grad.addColorStop(1, 'rgba(239, 68, 68, 0)');
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function drawPlayerSahibul() {
    // Invulnerability flashing
    if (player.invulnerableFrames > 0 && Math.floor(player.invulnerableFrames / 4) % 2 === 0) {
        return; // Don't draw frame
    }
    
    ctx.save();
    
    // State dependent scaling/effects
    let px = player.x;
    let py = player.y;
    
    // Animation tickers
    if (player.state === 'running') {
        player.animTick++;
        if (player.animTick > 6) {
            player.animTick = 0;
            player.animFrame = (player.animFrame + 1) % 4;
        }
    } else {
        player.animFrame = 0;
    }
    
    ctx.translate(px + player.width / 2, py + player.height / 2);
    
    // Flip canvas based on direction
    if (player.facing === 'left') {
        ctx.scale(-1, 1);
    }
    
    // If falling in tragedy, spin slightly
    if (player.state === 'falling') {
        const rotationAngle = (Date.now() * 0.01) % (Math.PI * 2);
        ctx.rotate(rotationAngle);
    }
    
    // Draw Character Vector Elements (Sahibul: Blue Coat, Dark Hair)
    // 1. Legs (running animation simulation)
    ctx.fillStyle = '#1e293b';
    let legOffset = 0;
    if (player.state === 'running') {
        legOffset = Math.sin(Date.now() * 0.015) * 8;
        ctx.fillRect(-10, 10, 6, 14 + legOffset);
        ctx.fillRect(4, 10, 6, 14 - legOffset);
    } else if (player.state === 'jumping') {
        ctx.fillRect(-11, 10, 6, 8);
        ctx.fillRect(5, 10, 6, 8);
    } else {
        ctx.fillRect(-8, 10, 6, 14);
        ctx.fillRect(2, 10, 6, 14);
    }
    
    // 2. Coat/Torso
    ctx.fillStyle = '#1d4ed8'; // Darker blue body
    ctx.beginPath();
    ctx.roundRect(-14, -14, 28, 26, [8, 8, 4, 4]);
    ctx.fill();
    
    // Hoodie/Scarf detail
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.roundRect(-12, -14, 24, 8, 4);
    ctx.fill();

    // 3. Head
    ctx.fillStyle = '#fed7aa'; // Peach skin tone
    ctx.beginPath();
    ctx.arc(0, -22, 11, 0, Math.PI * 2);
    ctx.fill();
    
    // Hair (Dark)
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(0, -26, 12, Math.PI, 0); // Top skull hair cap
    ctx.fill();
    ctx.fillRect(-12, -26, 6, 8); // Side burns
    
    // Eyes
    ctx.fillStyle = '#000';
    if (player.state === 'hurt' || player.state === 'falling') {
        // Draw cross eyes
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1.5;
        // Left eye X
        ctx.beginPath();
        ctx.moveTo(1, -24); ctx.lineTo(5, -20);
        ctx.moveTo(5, -24); ctx.lineTo(1, -20);
        ctx.stroke();
    } else {
        // Happy normal dots
        ctx.beginPath();
        ctx.arc(4, -22, 1.8, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Smile / Mouth
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    if (player.state === 'hurt' || player.state === 'falling') {
        ctx.arc(4, -15, 3, Math.PI, 0); // Sad open mouth
    } else {
        ctx.arc(4, -18, 3, 0, Math.PI); // Smiley
    }
    ctx.stroke();
    
    ctx.restore();
}

function drawGoalIshita() {
    ctx.save();
    
    // Animation floating idle
    let floatY = Math.sin(Date.now() * 0.003) * 4;
    
    ctx.translate(ishita.x + ishita.width / 2, ishita.y + ishita.height / 2 + floatY);
    
    // Face player
    if (ishita.facing === 'right') {
        ctx.scale(-1, 1);
    }
    
    // Draw Ishita (Pink Dress, Purple Hair, Gold Crown)
    // 1. Gown/Torso
    ctx.fillStyle = '#db2777'; // Magenta/pink base
    ctx.beginPath();
    ctx.moveTo(-15, 24);
    ctx.lineTo(-10, -10);
    ctx.lineTo(10, -10);
    ctx.lineTo(15, 24);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = '#f472b6'; // Lighter overlay frills
    ctx.fillRect(-8, -10, 16, 15);
    
    // 2. Arms reaching out if player is close/falling
    ctx.fillStyle = '#fda4af';
    if (gameState === STATES.CUTSCENE || currentLevel === 3) {
        // Reaching out
        ctx.fillRect(8, -4, 15, 5);
    } else {
        // Hands folded side
        ctx.fillRect(8, -4, 5, 12);
        ctx.fillRect(-13, -4, 5, 12);
    }
    
    // 3. Head
    ctx.fillStyle = '#fbcfe8'; // Light peach/pink tone
    ctx.beginPath();
    ctx.arc(0, -20, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Long hair (Purple)
    ctx.fillStyle = '#4c1d95';
    ctx.beginPath();
    // Wrap around shoulders
    ctx.arc(0, -22, 11, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(-11, -22, 4, 30);
    ctx.fillRect(7, -22, 4, 30);
    
    // Tiara/Crown
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(-6, -29);
    ctx.lineTo(-4, -34);
    ctx.lineTo(-1, -30);
    ctx.lineTo(2, -34);
    ctx.lineTo(5, -29);
    ctx.closePath();
    ctx.fill();
    
    // Eyes (Closed blinking happy arcs)
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(4, -20, 2, Math.PI, 0); // eye
    ctx.stroke();
    
    // Blush
    ctx.fillStyle = '#fecdd3';
    ctx.beginPath();
    ctx.arc(5, -16, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

function drawParticles() {
    for (let p of particles) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        
        if (p.type === 'sparkle') {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        } else if (p.type === 'heart') {
            ctx.fillStyle = p.color;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            
            // Draw heart shape
            ctx.beginPath();
            ctx.moveTo(0, 0);
            // Left curve
            ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, 0, 0, p.size);
            // Right curve
            ctx.bezierCurveTo(p.size, 0, p.size / 2, -p.size / 2, 0, 0);
            ctx.fill();
        }
        ctx.restore();
    }
}

// MAIN MENU BACKGROUND ORNAMENTAL ANIMATION
let menuBgRunning = true;
let menuParticles = [];

function initMenuBgAnimation() {
    menuBgCanvas.width = 960;
    menuBgCanvas.height = 540;
    
    // Spawn initial clouds and sparkles
    for (let i = 0; i < 20; i++) {
        menuParticles.push({
            x: Math.random() * 960,
            y: Math.random() * 540,
            vx: Math.random() * 0.4 + 0.1,
            size: Math.random() * 30 + 10,
            color: 'rgba(255, 255, 255, 0.05)',
            type: 'cloud'
        });
    }
    for (let i = 0; i < 40; i++) {
        menuParticles.push({
            x: Math.random() * 960,
            y: Math.random() * 540,
            vx: Math.random() * 0.8 + 0.2,
            vy: -Math.random() * 0.4 - 0.1,
            size: Math.random() * 2 + 1,
            color: 'rgba(59, 130, 246, 0.25)',
            type: 'spark'
        });
    }
    
    function animate() {
        if (!menuBgRunning) return;
        menuBgCtx.clearRect(0, 0, 960, 540);
        
        for (let p of menuParticles) {
            p.x += p.vx;
            if (p.vy) p.y += p.vy;
            
            // wrap around
            if (p.x > 980) p.x = -40;
            if (p.y < -10) p.y = 550;
            
            menuBgCtx.fillStyle = p.color;
            menuBgCtx.beginPath();
            if (p.type === 'cloud') {
                menuBgCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                menuBgCtx.arc(p.x + p.size * 0.8, p.y + p.size * 0.2, p.size * 0.7, 0, Math.PI * 2);
            } else {
                menuBgCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            }
            menuBgCtx.fill();
        }
        
        requestAnimationFrame(animate);
    }
    animate();
}
