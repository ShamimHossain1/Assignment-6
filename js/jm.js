
const shortData = [
    { name: shamim, published_in: 10 / 02 / 2021 },
    { name: shamim, published_in: 10 / 02 / 2021 },
    { name: shamim, published_in: 10 / 02 / 2021 },
    { name: shamim, published_in: 10 / 02 / 2023 },
]
customShort = (a, b) => {
    const dateA = new Date(a.published_in);
    const dateB = new Date(b.published_in);
    if (dateA < dateB) return 1;
    else if (dateA > dateB) return -1;
    return 0;
}
console.log(shortData.short(customShort));