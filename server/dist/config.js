"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEBUG = exports.getEnv = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var result = dotenv_1.default.config();
if (result.error)
    throw result.error;
var getEnv = function (env) {
    var val = process.env[env];
    if (!val)
        throw new Error("Set the \"" + env + "\" variable.");
    return val;
};
exports.getEnv = getEnv;
exports.DEBUG = exports.getEnv("NODE_ENV") === "development";
