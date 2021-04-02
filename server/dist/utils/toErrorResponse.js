"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toErrorResponse = void 0;
var toErrorResponse = function (errors) {
    var data = errors.map(function (error) { return ({
        field: error.param,
        message: error.msg,
    }); });
    return {
        status: "fail",
        data: data,
    };
};
exports.toErrorResponse = toErrorResponse;
