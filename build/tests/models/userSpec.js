"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var index_1 = __importDefault(require("../../index"));
var dotenv_1 = __importDefault(require("dotenv"));
require('dotenv').config({ path: '.env' });
dotenv_1.default.config();
var request = (0, supertest_1.default)(index_1.default);
var SECRET = process.env.TOKEN_SECRECT;
describe('User Handler', function () {
    var userData = {
        username: 'ViTieu988',
        firstname: 'Vi',
        lastname: 'Tieu',
        password: 'password12345',
    };
    var token, userId = 1;
    it('gets the create endpoint of user', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var res, body, status, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post('/users').send(userData)];
                case 1:
                    res = _a.sent();
                    body = res.body, status = res.status;
                    token = body;
                    user = jsonwebtoken_1.default.verify(token, SECRET).user;
                    userId = user.id;
                    expect(status).toBe(200);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets the index endpoint of user of user', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/users').set('Authorization', 'bearer ' + token)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets the read endpoint of user', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/users/".concat(userId)).set('Authorization', 'bearer ' + token)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets the auth endpoint of user', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .post('/users/authenticate')
                        .send({
                        username: userData.username,
                        password: userData.password,
                    })
                        .set('Authorization', 'bearer ' + token)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets the auth endpoint with wrong password of user', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .post('/users/authenticate')
                        .send({
                        username: userData.username,
                        password: 'trtdtxcfcf',
                    })
                        .set('Authorization', 'bearer ' + token)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(401);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets the update endpoint of user', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var newUserData, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newUserData = {
                        id: userId,
                        username: "ViTieu988",
                        firstname: 'Vi',
                        lastname: 'Tien123',
                        password: 'password6789'
                    };
                    return [4 /*yield*/, request
                            .put("/users")
                            .send(newUserData)
                            .set('Authorization', 'bearer ' + token)];
                case 1:
                    res = _a.sent();
                    userData.username = newUserData.username;
                    userData.password = newUserData.password;
                    expect(res.status).toBe(200);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets the delete endpoint of user', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.delete("/users/".concat(userId)).set('Authorization', 'bearer ' + token)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
});
