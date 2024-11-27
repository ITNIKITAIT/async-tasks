const asyncMapDebounced = (array, fn, cb, delay = 0) => {
    const results = [];
    const errors = [];
    let counter = 0;

    for (const item of array) {
        const startTime = Date.now();
        fn(item, (error, value) => {
            const expired = Date.now() - startTime;
            const timeLeft = Math.max(0, delay - expired);

            setTimeout(() => {
                if (error) errors.push(error);
                else results.push(value);

                counter++;
                if (counter === array.length) {
                    if (!errors.length) cb(null, results);
                    else cb(errors, results);
                }
            }, timeLeft);
        });
    }
};

const run = () => {
    const numbers = [1, 2, 3, 4, 5];

    const asyncSquare = (num, callback) => {
        setTimeout(() => {
            let error = null;

            if (error) callback(error);
            else callback(null, num ** 2);
        }, 1000);
    };

    asyncMapDebounced(
        numbers,
        asyncSquare,
        (error, result) => {
            console.log(error, result);
        },
        5000
    );
};

run();
