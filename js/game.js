// track if starter page has already been seen or no
if (!sessionStorage.getItem('splashShown')) {
    // add a splash screen to appear on first load
    const splash = document.getElementById('splashscreen');
    const enterLink = document.querySelector('.enter');
    splash.style.display = 'block';
    sessionStorage.setItem('splashShown', 'true');
    enterLink.addEventListener('click', function (e) {
        e.preventDefault();
        splash.classList.add('fade-out');

        splash.addEventListener('transitionend', function () {
            splash.remove();
            splash.style.display = 'none';
        }, { once: true });
    });

    // set theme to game mode automatically for first time
    sessionStorage.setItem('theme', 'game');
    
    // scroll from bottom initially
    sessionStorage.setItem('indexScrollPosition', document.body.scrollHeight);
}

window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');

  // fade out the preloader 
  preloader.style.opacity = '0';
  setTimeout(() => {
    preloader.classList.add('fade-out'); 
    preloader.style.display = 'none';
  }, 500); 
});

// change theme
function toggleTheme() {
    let theme = document.getElementById('theme');
    let script = document.getElementById('themeScript');
    let toggle = document.getElementById('themeButton');

    // go to light mode
    sessionStorage.setItem('theme', 'light');
    theme.setAttribute('href', 'css/light.css');
    toggle.setAttribute('style', `background-image: url(/img/lightButton.jpg); 
               background-size: cover; 
               background-repeat: no-repeat; 
               width: 4em; 
               height: 4em;")`);
    const newScript = document.createElement('script');
    newScript.src = 'js/basic.js';
    newScript.id = 'themeScript';
    script.parentNode.replaceChild(newScript, script);
}

// typewriter for visual novel character
if (typeof window.TypeWriter == 'undefined') {

window.TypeWriter = class {
    constructor(targetElement, lines, options = {}) {
        this.target = targetElement;
        this.lines = lines;
        this.lineIndex = 0;
        this.charIndex = 0;
        this.typing = false;
        this.timeoutId = null;
        this.speed = options.speed || 50;
        this.onFinish = options.onFinish || function () {};
        this.hideOnCompleteSelector = options.hideOnCompleteSelector || null;

        this.target.addEventListener('click', () => this.handleClick());
    }

    handleClick() {
        if (this.typing) {
            clearTimeout(this.timeoutId);
            this.target.innerHTML = this.lines[this.lineIndex];
            this.typing = false;
            this.lineIndex++;
        } else {
            if (this.lineIndex < this.lines.length) {
                this.startTyping();
            } else {
                if (this.hideOnCompleteSelector) {
                    const el = document.querySelector(this.hideOnCompleteSelector);
                    if (el) el.style.display = 'none';
                }
                this.onFinish();
            }
        }
    }

    startTyping() {
        this.typing = true;
        this.charIndex = 0;
        this.target.innerHTML = '';
        this.type();
    }

    type() {
        if (this.charIndex < this.lines[this.lineIndex].length) {
            this.target.innerHTML += this.lines[this.lineIndex].charAt(this.charIndex);
            this.charIndex++;
            this.timeoutId = setTimeout(() => this.type(), this.speed);
        } else {
            this.typing = false;
            this.lineIndex++;
        }
    }
}
}

if (typeof window.indexTypewriter == 'undefined') {

    // typewriter objects
    window.indexTypewriter = new window.TypeWriter(
        document.getElementById('indexSpeech'), // speech elem
        ['My name is KY, welcome to my world! I\'m a student coder and creative based in London and Singapore. I love looking and making pretty things,',
        'This site acts both as my personal site as well as my portfolio',
        'As you can see, standing on this text box, there\'s a mini me you can use to explore my world. Use WASD or arrow keys to move around.',
        'Alternatively, if you\'d like to switch off game mode, you can do so by clicking the icon in the top right corner of the nav bar.'
        ],  // lines to type
        {
            speed: 60,                          // (optional) typing speed in ms
            hideOnCompleteSelector: '#indexVn', // (optional) hide this element when done
            onFinish: () => {
                console.log('Typing finished!');
            }
        }
    );

}