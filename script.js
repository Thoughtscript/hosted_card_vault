'use strict'

window.onload = function() {

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
        
    setTimeout(() => {
        const ELS = document.getElementsByClassName('image')

        console.log("Retrying failed images...")

        const retryImg = async(EL) => {
            let O = EL.src
            EL.src = ""
            EL.src = O 
        }

        let promises = []

        for (let i = 0; i < ELS.length; i++) {
            promises.push(retryImg(ELS[i]))
        }

        Promise.all(promises)

    }, 45000)
}