require('dotenv').config();

const cookieKey = (): string => {
    const value = process.env.COOKIE_KEY;

    if (value) {
        return value
    }

    return ''
}

export default cookieKey;