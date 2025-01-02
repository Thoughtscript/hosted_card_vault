'use strict'

window.onload = function() {
    const ELS = document.querySelectorAll('div.image')

    for (let i = 0; i < ELS.length; i++) {
        ELS[i].addEventListener('click', () => {
            window.open(ELS[i].getAttribute('data-attr'))
        })
    }
}