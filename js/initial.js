// start scrolling from where last left off
let currPage = sessionStorage.getItem('currentPage');
let scrollPosition = sessionStorage.getItem(`${currPage}ScrollPosition`);

if (scrollPosition) {
    window.onload = window.scrollTo(0, parseInt(scrollPosition));
}
    
// save scroll position
window.addEventListener('scroll', function() {
    sessionStorage.setItem(`${currPage}ScrollPosition`, window.scrollY);
});

document.addEventListener("DOMContentLoaded", function () {
    let theme = document.getElementById('theme');
    let script = document.getElementById('themeScript');
    let currTheme = sessionStorage.getItem('theme');
    let toggle = document.getElementById('themeButton');
    
    window.scrollTo(0, parseInt(scrollPosition));
    if (!currTheme) currTheme = 'game';
    theme.setAttribute('href', `css/${currTheme}.css`);
    toggle.setAttribute('style', `background-image: url(/img/${currTheme}Button.jpg); 
               background-size: cover; 
               background-repeat: no-repeat; 
               width: 4em; 
               height: 4em;")`);
    const newScript = document.createElement('script');
    if (currTheme == 'game') {
        newScript.src = 'js/game.js';
    } else {
        newScript.src = 'js/basic.js';
    }
    newScript.id = 'themeScript';
    script.parentNode.replaceChild(newScript, script);
});