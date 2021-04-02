"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
var isAuth = function (req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({
            status: "fail",
            data: [
                {
                    message: "You are not authenticated.",
                },
            ],
        });
    }
    return next();
};
exports.isAuth = isAuth;
