function randomArray(arrSource) {
    const index = Math.floor(Math.random() * arrSource.length);
    const randomVal = arrSource[index];

    return randomVal;
}

module.exports = {
    randomArray,
};