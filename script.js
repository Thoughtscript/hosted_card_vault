'use strict'

window.onload = function () {

    const UA = window.navigator.userAgent

    if (UA.includes('AppleWebKit')) {
        const H = document.getElementById('title-heading')
        H.className = `${H.className} mac-adjust`

        const HO = document.getElementById('hosted-on')
        HO.className = `${HO.className} mac-adjust`
    }

    const ELS = document.querySelectorAll('.image')

    for (let i = 0; i < ELS.length; i++) {
        ELS[i].addEventListener('click', () => {
            window.open(ELS[i].getAttribute('data-attr'))
        })
    }

    // Failed to load resource: net::ERR_HTTP2_PROTOCOL_ERROR Large Images loaded but not cached from GitHub (no CDN).
    const setErrorEventListeners = () => {
        const ELS = document.getElementsByClassName('image')

        // TBD - exponential backoff...
        // Probably unnecessary here for GitHub hosting but would be of use elsewhere.
        for (let i = 0; i < ELS.length; i++) {
            ELS[i].addEventListener('error', (e) => {
                const EL = e.currentTarget,
                    C = EL.alt || EL.attributes[2].textContent
                
                console.log(`${ C } image loading failed - retrying...`)

                let O = EL.src

                if (O.length) {
                    EL.src = ""
                    EL.src = O
                }
            })
        }
    }
    
    setErrorEventListeners()
}