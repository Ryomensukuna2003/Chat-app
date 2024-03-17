function testMiddleware(filename) {
    return (req, res, next) => {
        next();
    }
}

export { testMiddleware };
