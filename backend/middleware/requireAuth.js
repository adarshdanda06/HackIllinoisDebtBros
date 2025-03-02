const jwt = require('jsonwebtoken');

const requireAuth = async (req, res, next) => {
    // Verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { username } = jwt.verify(token, process.env.SECRET);

        const session = driver.session();
        const result = await session.run(
            `MATCH (u:User) WHERE u.username = $username 
            RETURN u.username AS username`,
            { username }
        );

        await session.close();

        if (result.records.length === 0) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = { username }; 
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = requireAuth;
