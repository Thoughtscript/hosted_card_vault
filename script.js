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

    const retry = (ms) => {
        setTimeout(() => {
            const ELS = document.getElementsByClassName('image')

            console.log(`Retrying failed images at ${ms}...`)

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

    retry(45000)

    retry(120000)
}