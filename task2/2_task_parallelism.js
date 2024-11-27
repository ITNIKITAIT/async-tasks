const asyncMapParallel = async (array, fn) => {
    const promises = array.map(fn);

    const results = await Promise.allSettled(promises);

    const fulfilled = results
        .filter((res) => res.status === 'fulfilled')
        .map((r) => r.value);
    const rejected = results
        .filter((res) => res.status === 'rejected')
        .map((r) => r.reason);

    return { fulfilled, rejected };
};

const asyncSquare = async (num) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, num ** 2);
    });
};

const numbers = [1, 2, 3, 4, 5];

(async () => {
    const response = await asyncMapParallel(numbers, asyncSquare);
    console.log(response);
})();
