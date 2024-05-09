javascript: var dom_a = document.createElement('a'); document.body.appendChild(dom_a); dom_a.href = '#main-container'; dom_a.click(); document.body.removeChild(dom_a);


javascript: var player = document.querySelector('.dplayer'); window.scrollTo({ top: player.offsetTop - 200, behavior: "smooth" });