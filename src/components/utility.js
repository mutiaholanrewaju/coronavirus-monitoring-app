export const sortData =  (data) => {
    const sortedData = [...data];

    //using ternary to return true or false if cases a is greater than cases b
    return sortedData.sort((a, b) => a.cases > b.cases? -1: 1);
};
