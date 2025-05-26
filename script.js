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

    const retryImage = (e) => {
        const EL = e.currentTarget,
            NM = EL.alt || EL.getAttribute("data-attr"),
            MR = parseInt(EL.getAttribute("max-retries")),
            CR = parseInt(EL.getAttribute('current-retries'))

        if (CR < MR) {
            console.log(`${ NM } image loading failed - retrying ${CR + 1} / ${MR}`)

            let O = EL.src
            if (O.length) {
                EL.src = ""
                EL.src = O
            }

            EL.setAttribute("current-retries", CR + 1)
        }

        if (CR >= MR) {
            console.log(`${ NM } max retries ${MR} reached - removing Event Listener...`)
            EL.removeEventListener('error', retryImage)
        }
    }

    // Failed to load resource: net::ERR_HTTP2_PROTOCOL_ERROR Large Images loaded but not cached from GitHub (no CDN).
    const setErrorEventListeners = () => {
        const ELS = document.getElementsByClassName('image')

        // TBD - exponential backoff...
        // Probably unnecessary here for GitHub hosting but would be of use elsewhere.
        for (let i = 0; i < ELS.length; i++) {
            ELS[i].setAttribute('max-retries', 3)
            ELS[i].setAttribute('current-retries', 0)
            ELS[i].addEventListener('error', retryImage)
        }
    }
    
    setErrorEventListeners()
}