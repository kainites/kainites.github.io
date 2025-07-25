function toggleTheme() {
    let theme = document.getElementById('theme');
    let script = document.getElementById('themeScript');
    let toggle = document.getElementById('themeButton');


    if (sessionStorage.getItem('theme') == 'light') {
        // go to dark mode if light
        sessionStorage.setItem('theme', 'dark')
        theme.setAttribute('href', 'css/dark.css');
        toggle.setAttribute('style', `background-image: url(/img/DarkButton.jpg); 
               background-size: cover; 
               background-repeat: no-repeat; 
               width: 4em; 
               height: 4em;")`);
    } else { 
        // go to game mode if dark
        sessionStorage.setItem('theme', 'game')
        theme.setAttribute('href', 'css/game.css');
        toggle.setAttribute('style', `background-image: url(/img/gameButton.jpg)
               background-size: cover; 
               background-repeat: no-repeat; 
               width: 4em; 
               height: 4em;")`);
        const newScript = document.createElement('script');
        newScript.src = 'js/game.js';
        newScript.id = 'themeScript';
        script.parentNode.replaceChild(newScript, script);
    }
}