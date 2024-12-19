const asyncMap = (array, fn, cb) => {
    const results = [];
    const errors = [];
    let counter = 0;

    for (const item of array) {
        fn(item, (error, value) => {
            if (error) errors.push(error);
            else results.push(value);

            counter++;
            if (counter === array.length) {
                if (!errors.length) cb(null, results);
                else cb(new AggregateError(errors), results);
            }
        });
    }
};

const run = () => {
    const numbers = [1, 2, 3, 4, 5];

    const asyncSquare = (num, callback) => {
        setTimeout(() => {
            let error = true;

            if (error) callback(error);
            else callback(null, num ** 2);
        }, 1000);
    };

    asyncMap(numbers, asyncSquare, (error, result) => {
        console.log(error, result);
    });
};

run();
