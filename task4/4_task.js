const asyncMap = async (iterable, fn) => {
    const results = [];
    const errors = [];

    for await (const item of iterable) {
        try {
            const result = await fn(item);
            results.push(result);
        } catch (error) {
            errors.push(error);
        }
    }

    if (errors.length) throw new AggregateError(errors);

    return results;
};

async function* asyncGenerator(array) {
    for (const num of array) {
        yield new Promise((resolve) => {
            setTimeout(() => resolve(num), 200);
        });
    }
}

const square = async (num) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num ** 2);
        }, 300);
    });
};

(async () => {
    try {
        const numbers = [1, 2, 3, 4, 5];
        const iterable = asyncGenerator(numbers);

        const res = await asyncMap(iterable, square);
        console.log('Results:', res);
    } catch (error) {
        console.error(error);
    }
})();
