export const getCurrentTimeMS = () => {
    return Date.now()
}

export const formatTimeRelative = (time: number, now: number = getCurrentTimeMS()) => {
    const msPerMinute = 60 * 1000
    const msPerHour = msPerMinute * 60
    const msPerDay = msPerHour * 24
    const msPerMonth = msPerDay * 30
    const msPerYear = msPerMonth * 12

    const elapsed = now - time
    const elapsedAbs = Math.abs(elapsed)

    let str = ''
    if (elapsedAbs < msPerMinute) {
        str = `${Math.round(elapsed / 1000)} seconds`
    } else if (elapsedAbs < msPerHour) {
        str = `${Math.round(elapsed / msPerMinute)} minutes`
    } else if (elapsedAbs < msPerDay) {
        str = `${Math.round(elapsed / msPerHour)} hours`
    } else if (elapsedAbs < msPerMonth) {
        str = `${Math.round(elapsed / msPerDay)} days`
    } else if (elapsedAbs < msPerYear) {
        str = `${Math.round(elapsed / msPerMonth)} months`
    } else {
        str = `${Math.round(elapsed / msPerYear)} years`
    }

    if (elapsed > 0) {
        return `${str} ago`
    } else {
        return `in ${str}`
    }
}