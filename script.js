'use strict'

window.onload = function () {

    /************************************
     *               MAC                *
     ************************************/

    const UA = window.navigator.userAgent

    if (UA.includes('AppleWebKit')) {
        const H = document.getElementById('title-heading')
        H.className = `${H.className} mac-adjust`

        const HO = document.getElementById('hosted-on')
        HO.className = `${HO.className} mac-adjust`
    }

    /************************************
     *                PSA               *
     ************************************/

    const ELS = document.querySelectorAll('.image')

    for (let i = 0; i < ELS.length; i++) {
        ELS[i].addEventListener('click', () => {
            window.open(ELS[i].getAttribute('data-attr'))
        })
    }

    /************************************
     *               RETRY              *
     ************************************/

    const retryImage = (e) => {
        const EL = e.currentTarget,
            NM = EL.alt || EL.getAttribute("data-attr"),
            MR = parseInt(EL.getAttribute("max-retries")),
            CR = parseInt(EL.getAttribute('current-retries'))

        EL.setAttribute('failed', true)

        if (CR < MR) {
            console.log(`${ NM } image loading failed - retrying ${CR + 1} / ${MR}`)

            const O = EL.src
            if (O.length) {
                EL.src = ""
                EL.src = O
            }

            EL.setAttribute("current-retries", CR + 1)
        }

        if (CR >= MR) {
            console.log(`${ NM } max retries ${MR} reached - removing Event Listener...`)
            EL.removeEventListener('error', retryImage)
            EL.removeEventListener('abort', retryImage)
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
            ELS[i].setAttribute('failed', true)
            
            ELS[i].addEventListener('error', retryImage)
            ELS[i].addEventListener('abort', retryImage)
            ELS[i].addEventListener('load', (e) => {
                const EL = e.currentTarget
                EL.setAttribute('failed', false)
            })
        }
    }
    
    setErrorEventListeners()

    /************************************
     *              UNCAUGHT            *
     ************************************/

    const retryLoop = (ms) => {

        setInterval(() => {
            const ELS = document.getElementsByClassName('image')

            console.log(`Polling every ${ms} ms to retry uncaught failed images ...`)

            const asyncRetryImage = async (EL) => {
                const O = EL.src
                if (O.length) {
                    EL.src = ""
                    EL.src = O
                }
            }

            let promises = []

            for (let i = 0; i < ELS.length; i++) {
                if (ELS[i].getAttribute('failed')) {
                    promises.push(asyncRetryImage(ELS[i]))
                }
            }

            Promise.all(promises)

        }, ms)
    }

    retryLoop(120000)
}