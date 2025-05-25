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
    // 1. The JavaScript Console object can't access the message directly - it's a reference to the Console and STDOUT but doesn't expose internal messages or state.
    
    // 2. Testing: the Image failure above may be flagged through JavaScript. See below.

    // 3. The underlying HTML doesn't update with some attribute on the Element reflecting the 
    // success or failure of the Image. If 2. fails, then there's no way to easily a.) retry or b.) check the outcome of the image loading.
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

    document.querySelectorAll('div.content')[0].addEventListener('error', e => {
        console.log(e)
    })

    onerror = (message, source, lineno, colno, error) => { 
        console.log(error)
        console.log(message)
    }
}