const { UserModel:User } = require("../models")

module.exports = function checkPermission(requiredPermission) {
    return async (req, res, next) => {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const userPermissions = user.role?.permissions.map(p => p.name);


        if (!userPermissions?.includes(requiredPermission)) {
            return res.status(403).json({ message: `Forbidden: Missing permission '${requiredPermission}'` });
        }

        next();
    };
};
