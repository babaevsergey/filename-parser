function isImmediate() {
    const immediate = document.getElementById('immediate');
    if (immediate.checked) {
        return true;
    }

    return false;
}

export default isImmediate;