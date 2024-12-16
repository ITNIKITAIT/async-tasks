const asyncMap = (array, fn) => {
    return new Promise((resolve, reject) => {
        const results = [];
        const errors = [];
        let counter = 0;

        for (const item of array) {
            fn(item)
                .then((value) => {
                    results.push(value);
                })
                .catch((error) => {
                    errors.push(error);
                })
                .finally(() => {
                    counter++;

                    if (counter === array.length) {
                        if (!errors.length) resolve(results);
                        else reject(errors);
                    }
                });
        }
    });
};

const asyncSquare = (num) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, num ** 2);
    });
};

const numbers = [1, 2, 3, 4, 5];

asyncMap(numbers, asyncSquare).then(console.log).catch(console.error);
