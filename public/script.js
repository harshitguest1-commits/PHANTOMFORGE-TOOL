/* =========================================
   PHANTOMFORGE ULTRA SCRIPT
========================================= */

console.log('PHANTOMFORGE ONLINE');

/* =========================================
   ELEMENTS
========================================= */

const intro =
document.getElementById('intro');

const app =
document.getElementById('app');

const particles =
document.getElementById('particles');

const cursorGlow =
document.getElementById('cursorGlow');

const promptInput =
document.getElementById('promptInput');

const captionResult =
document.getElementById('captionResult');

const generateBtn =
document.getElementById('generateBtn');

const clearBtn =
document.getElementById('clearBtn');

const modeButtons =
document.querySelectorAll('.mode-btn');

const promptTags =
document.querySelectorAll('.prompt-tag');

const allButtons =
document.querySelectorAll('button');

const featureCards =
document.querySelectorAll('.feature-card');

const statCards =
document.querySelectorAll('.stat-card');

/* =========================================
   APP STATE
========================================= */

let currentMode = 'caption';

let isGenerating = false;

/* =========================================
   INTRO SYSTEM
========================================= */

window.addEventListener('load', () => {

  setTimeout(() => {

    if(intro){

      intro.classList.add('hide');

    }

    if(app){

      app.classList.add('show');

    }

  }, 3500);

});

/* =========================================
   CURSOR GLOW
========================================= */

document.addEventListener('mousemove', e => {

  if(!cursorGlow) return;

  cursorGlow.style.left =
  e.clientX + 'px';

  cursorGlow.style.top =
  e.clientY + 'px';

});

/* =========================================
   PARTICLE SYSTEM
========================================= */

if(particles){

  const ctx =
  particles.getContext('2d');

  particles.width =
  window.innerWidth;

  particles.height =
  window.innerHeight;

  let particleArray = [];

  class Particle{

    constructor(){

      this.x =
      Math.random() * particles.width;

      this.y =
      Math.random() * particles.height;

      this.size =
      Math.random() * 2 + 0.5;

      this.speedX =
      Math.random() * 0.5 - 0.25;

      this.speedY =
      Math.random() * 0.5 - 0.25;

      this.opacity =
      Math.random() * 0.7 + 0.2;

    }

    update(){

      this.x += this.speedX;

      this.y += this.speedY;

      if(this.x > particles.width){

        this.x = 0;

      }

      if(this.x < 0){

        this.x = particles.width;

      }

      if(this.y > particles.height){

        this.y = 0;

      }

      if(this.y < 0){

        this.y = particles.height;

      }

    }

    draw(){

      ctx.beginPath();

      ctx.arc(
        this.x,
        this.y,
        this.size,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
      `rgba(168,85,247,${this.opacity})`;

      ctx.fill();

    }

  }

  function initParticles(){

    particleArray = [];

    for(let i = 0; i < 140; i++){

      particleArray.push(
        new Particle()
      );

    }

  }

  function connectParticles(){

    for(let a = 0; a < particleArray.length; a++){

      for(let b = a; b < particleArray.length; b++){

        const dx =
        particleArray[a].x -
        particleArray[b].x;

        const dy =
        particleArray[a].y -
        particleArray[b].y;

        const distance =
        dx * dx + dy * dy;

        if(distance < 9000){

          ctx.beginPath();

          ctx.strokeStyle =
          'rgba(168,85,247,0.08)';

          ctx.lineWidth = 1;

          ctx.moveTo(
            particleArray[a].x,
            particleArray[a].y
          );

          ctx.lineTo(
            particleArray[b].x,
            particleArray[b].y
          );

          ctx.stroke();

        }

      }

    }

  }

  function animateParticles(){

    ctx.clearRect(
      0,
      0,
      particles.width,
      particles.height
    );

    particleArray.forEach(particle => {

      particle.update();

      particle.draw();

    });

    connectParticles();

    requestAnimationFrame(
      animateParticles
    );

  }

  initParticles();

  animateParticles();

}

/* =========================================
   WINDOW RESIZE
========================================= */

window.addEventListener('resize', () => {

  if(particles){

    particles.width =
    window.innerWidth;

    particles.height =
    window.innerHeight;

  }

});

/* =========================================
   MODE SWITCHER
========================================= */

modeButtons.forEach(button => {

  button.addEventListener('click', () => {

    modeButtons.forEach(btn => {

      btn.classList.remove('active');

    });

    button.classList.add('active');

    currentMode =
    button.dataset.mode;

    /* PLACEHOLDER CHANGES */

    if(currentMode === 'caption'){

      promptInput.placeholder =
      'Describe your cinematic edit...';

    }

    else if(currentMode === 'video'){

      promptInput.placeholder =
      'Describe your cinematic video idea...';

    }

    else if(currentMode === 'quote'){

      promptInput.placeholder =
      'Describe your emotion or aesthetic...';

    }

    /* SMALL FX */

    captionResult.innerHTML =
    `Mode switched to ${currentMode.toUpperCase()}`;

  });

});

/* =========================================
   PROMPT TAGS
========================================= */

promptTags.forEach(tag => {

  tag.addEventListener('click', () => {

    promptInput.value =
    tag.innerText;

    promptInput.focus();

  });

});

/* =========================================
   BUTTON FX
========================================= */

allButtons.forEach(button => {

  button.addEventListener('mouseenter', () => {

    button.style.transform =
    'translateY(-4px) scale(1.03)';

  });

  button.addEventListener('mouseleave', () => {

    button.style.transform =
    '';

  });

});

/* =========================================
   FEATURE CARD FX
========================================= */

featureCards.forEach(card => {

  card.addEventListener('mousemove', e => {

    const rect =
    card.getBoundingClientRect();

    const x =
    e.clientX - rect.left;

    const y =
    e.clientY - rect.top;

    card.style.background =
    `
    radial-gradient(
      circle at ${x}px ${y}px,
      rgba(168,85,247,0.18),
      rgba(255,255,255,0.04)
    )
    `;

  });

  card.addEventListener('mouseleave', () => {

    card.style.background =
    'rgba(255,255,255,0.04)';

  });

});

/* =========================================
   STAT CARD FLOAT
========================================= */

statCards.forEach((card,index) => {

  setInterval(() => {

    card.style.transform =
    `translateY(${
      Math.sin(Date.now() * 0.001 + index)
      * 6
    }px)`;

  }, 16);

});

/* =========================================
   TYPEWRITER EFFECT
========================================= */

function typeWriterEffect(text){

  captionResult.innerHTML = '';

  let i = 0;

  const speed = 18;

  const typing = setInterval(() => {

    captionResult.innerHTML +=
    text.charAt(i);

    i++;

    if(i >= text.length){

      clearInterval(typing);

    }

  }, speed);

}

/* =========================================
   LOADING EFFECT
========================================= */

function showLoading(){

  let dots = 0;

  captionResult.innerHTML =
  'PHANTOMFORGE generating';

  const loadingInterval =
  setInterval(() => {

    dots++;

    if(dots > 3){

      dots = 0;

    }

    captionResult.innerHTML =
    'PHANTOMFORGE generating' +
    '.'.repeat(dots);

  }, 400);

  return loadingInterval;

}

/* =========================================
   GENERATE SYSTEM
========================================= */

if(generateBtn){

  generateBtn.addEventListener('click', async () => {

    if(isGenerating) return;

    const prompt =
    promptInput.value.trim();

    if(!prompt){

      captionResult.innerHTML =
      'Please enter a prompt.';

      return;

    }

    isGenerating = true;

    generateBtn.disabled = true;

    generateBtn.innerHTML =
    'GENERATING';

    const loadingInterval =
    showLoading();

    try{

      const response =
      await fetch(
        '/generate-caption',
        {

          method:'POST',

          headers:{
            'Content-Type':
            'application/json'
          },

          body:JSON.stringify({

            prompt,
            mode:currentMode

          })

        }
      );

      const data =
      await response.json();

      clearInterval(
        loadingInterval
      );

      if(data.success){

        typeWriterEffect(
          data.caption
        );

      }

      else{

        captionResult.innerHTML =
        data.error ||
        'Generation failed.';

      }

    }

    catch(error){

      console.log(error);

      clearInterval(
        loadingInterval
      );

      captionResult.innerHTML =
      'Server connection failed.';

    }

    generateBtn.disabled = false;

    generateBtn.innerHTML =
    'GENERATE';

    isGenerating = false;

  });

}

/* =========================================
   CLEAR SYSTEM
========================================= */

if(clearBtn){

  clearBtn.addEventListener('click', () => {

    promptInput.value = '';

    captionResult.innerHTML =
    'Your AI result appears here...';

  });

}

/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll(
  'a[href^="#"]'
).forEach(anchor => {

  anchor.addEventListener(
    'click',
    function(e){

      e.preventDefault();

      const target =
      document.querySelector(
        this.getAttribute('href')
      );

      if(target){

        target.scrollIntoView({

          behavior:'smooth'

        });

      }

    }
  );

});

/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
document.querySelectorAll(
  '.feature-card,.showcase-card'
);

function revealOnScroll(){

  const trigger =
  window.innerHeight * 0.85;

  revealElements.forEach(el => {

    const top =
    el.getBoundingClientRect().top;

    if(top < trigger){

      el.style.opacity = '1';

      el.style.transform =
      'translateY(0px)';

    }

  });

}

revealElements.forEach(el => {

  el.style.opacity = '0';

  el.style.transform =
  'translateY(60px)';

  el.style.transition =
  'all 0.8s ease';

});

window.addEventListener(
  'scroll',
  revealOnScroll
);

revealOnScroll();

/* =========================================
   RANDOM STATUS TEXT
========================================= */

const statusTexts = [

  'AI CORE ONLINE',
  'CINEMATIC ENGINE ACTIVE',
  'CREATOR SYSTEM READY',
  'FUTURE INTERFACE ENABLED'

];

let statusIndex = 0;

setInterval(() => {

  const topLine =
  document.querySelector(
    '.hero-topline'
  );

  if(topLine){

    statusIndex++;

    if(statusIndex >= statusTexts.length){

      statusIndex = 0;

    }

    topLine.innerHTML =
    statusTexts[statusIndex];

  }

}, 4000);

/* =========================================
   KEYBOARD SHORTCUT
========================================= */

document.addEventListener(
  'keydown',
  e => {

    if(
      e.ctrlKey &&
      e.key === 'Enter'
    ){

      generateBtn.click();

    }

  }
);
/* =========================================
   TEMP BUTTON NOTICE
========================================= */

const enterBtn =
document.getElementById('enterBtn');

const demoBtn =
document.getElementById('demoBtn');

if(enterBtn){

  enterBtn.addEventListener('click', () => {

    captionResult.innerHTML = `
    <div style="
    font-size:1.1rem;
    line-height:1.8;
    color:#c084fc;
    text-align:center;
    ">

    PHANTOMFORGE EXPERIENCE MODE
    IS CURRENTLY IN DEVELOPMENT.

    <br><br>

    AI Generator System is fully functional.

    </div>
    `;

    document
    .getElementById('generator')
    .scrollIntoView({

      behavior:'smooth'

    });

  });

}

if(demoBtn){

  demoBtn.addEventListener('click', () => {

    captionResult.innerHTML = `
    <div style="
    font-size:1.1rem;
    line-height:1.8;
    color:#ffffff;
    text-align:center;
    ">

    DEMO VIDEO COMING SOON.

    <br><br>

    Try the live AI generator below.

    </div>
    `;

    document
    .getElementById('generator')
    .scrollIntoView({

      behavior:'smooth'

    });

  });

}
/* =========================================
   END
========================================= */