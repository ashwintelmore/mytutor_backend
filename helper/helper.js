exports.isEmpty = (...args) => {

    for (let index = 0; index < args.length; index++) {
        const e = args[index];
        if (e == '')
            return 1;
    }
    return 0;
};