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
    // Surprisingly there's no way to access:

    // 1. That Console message directly - it's browser-based and not printed through JavaScript.
    // 2. JavaScript apparently still doesn't emit any such event on Image failures.
    // 3. The underlying HTML doesn't update with some attribute on the Element reflecting the success or failure of the Image.
    const retry = (ms) => {

        // Testing simple approach to address this issue.
        // For very slow Image loading sessions, retry repeatedly.
        setInterval(() => {
            const ELS = document.getElementsByClassName('image')

            console.log(`Retrying failed images at ${ms} ms intervals ...`)

            const retryImg = async (EL) => {
                let O = EL.src
                EL.src = ""
                EL.src = O
            }

            let promises = []

            for (let i = 0; i < ELS.length; i++) {
                promises.push(retryImg(ELS[i]))
            }

            Promise.all(promises)

        }, ms)
    }

    retry(150000)
}