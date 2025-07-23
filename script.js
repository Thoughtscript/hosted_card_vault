'use strict'

const ENABLE_FULL_LOGGING = true

const ENABLE_INIT_RETRY = false // See comment below.

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

        const MB = document.getElementById('my-blog')
        MB.className = `${MB.className} mac-adjust`
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
            NM = EL.alt,
            LINK_URL = EL.getAttribute("data-attr"),
            MR = parseInt(EL.getAttribute("max-retries")),
            CR = parseInt(EL.getAttribute('current-retries'))

        EL.setAttribute('retry', true)
        EL.setAttribute('failed', true)

        if (CR < MR) {
           console.log(`[ Image: ${ NM } | Certifying URL: ${ LINK_URL } ] - retrying load failure ${CR + 1} / ${MR}`)

            const O = EL.src
            if (O.length) {
                EL.src = ""
                EL.src = O
                // If successful this triggers the 'load' event
            }

            EL.setAttribute("current-retries", CR + 1)
        }

        if (CR >= MR) {
            if (ENABLE_FULL_LOGGING) console.log(`${ NM } max retries ${MR} reached - removing Event Listener...`)
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
            // For performance and load order reasons, these can be set in the HTML file itself.
            // ENABLE_INIT_RETRY add these values to Elements whether they have those or not.
            if (ENABLE_INIT_RETRY) {
                ELS[i].setAttribute('max-retries', 3)
                ELS[i].setAttribute('current-retries', 0)
                ELS[i].setAttribute('retry', true)
                ELS[i].setAttribute('failed', false)
            }
            
            ELS[i].addEventListener('error', retryImage)
            ELS[i].addEventListener('abort', retryImage)
            ELS[i].addEventListener('load', (e) => {
                const EL = e.currentTarget
                EL.setAttribute('retry', false)
                EL.setAttribute('failed', false)
            })
        }
    }
    
    setErrorEventListeners()

    /************************************
     *              UNCAUGHT            *
     ************************************/

    const retryLoop = (ms) => {

        const POLL_ID = setInterval(() => {
            const ELS = document.getElementsByClassName('image')

            if (ENABLE_FULL_LOGGING) console.log(`Polling every ${ms} ms to retry uncaught failed images ...`)

            const asyncRetryImage = async (EL) => {
                const O = EL.src,
                    NM = EL.alt,
                    LINK_URL = EL.getAttribute("data-attr"),
                    MR = parseInt(EL.getAttribute("max-retries")),
                    CR = parseInt(EL.getAttribute('current-retries'))

                if (ENABLE_FULL_LOGGING) console.log(`[ Image: ${ NM } | Certifying URL: ${ LINK_URL } ] - retrying in case of uncaught failures ${CR + 1} / ${MR}`)

                if (O.length) {
                    EL.src = ""
                    EL.src = O
                    // If successful this triggers the 'load' event
                }

                EL.setAttribute("current-retries", CR + 1)
            }

            let promises = []

            for (let i = 0; i < ELS.length; i++) {
                const EL = ELS[i]

                // This is a String value
                if (EL.getAttribute('retry') === 'true' || EL.getAttribute('failed') === 'true') {
                    const MR = parseInt(EL.getAttribute("max-retries")),
                        CR = parseInt(EL.getAttribute('current-retries'))

                    if (CR < MR) promises.push(asyncRetryImage(EL))
                    else EL.setAttribute('retry', false)
                }
            }

            if (!promises.length) {
                if (ENABLE_FULL_LOGGING) console.log(`No Images left - clearing Poll...`)
                clearInterval(POLL_ID)
            }

            Promise.all(promises)

        }, ms)
    }

    retryLoop(180000)
}