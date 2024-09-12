function uniqueValuesArray(array) {
    const uniqueArray = [];
    const seenArray = new Set();

    for (const element of array) {
        if (!seenArray.has(element)) {
            uniqueArray.push(element);
            seenArray.add(element);
        }
    }

    return uniqueArray;
}

export default uniqueValuesArray;