
import Cookies from 'universal-cookie';

const cookies = new Cookies()

function getCookies(name) {
    return cookies.get(name)
}


function setCookies(name, value) {
    return cookies.set(name, value)
}

export {
    getCookies,
    setCookies
}


