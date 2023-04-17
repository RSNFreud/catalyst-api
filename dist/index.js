"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
        while (_) try {
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
var fs = __importStar(require("fs"));
var path_1 = __importDefault(require("path"));
var static_1 = __importDefault(require("@fastify/static"));
require('dotenv').config();
var Client = require('ssh2-sftp-client');
var filePath = path_1.default.join(__dirname, 'vault');
var lastUpdate = new Date();
var client = new Client();
var init = function () {
    return new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, client.connect({
                            host: process.env.HOST,
                            port: parseInt(process.env.PORT),
                            username: process.env.USER,
                            password: process.env.PASSWORD,
                        })];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, fs.promises.mkdir(filePath)];
                case 3:
                    _b.sent();
                    console.log('Creating folder...');
                    return [3 /*break*/, 5];
                case 4:
                    _a = _b.sent();
                    return [3 /*break*/, 5];
                case 5:
                    console.log('Downloading player files...');
                    return [4 /*yield*/, client.downloadDir("/playerSnapshots", filePath)];
                case 6:
                    _b.sent();
                    console.log('Complete!');
                    return [4 /*yield*/, client.end()];
                case 7:
                    _b.sent();
                    lastUpdate = new Date();
                    res('');
                    return [3 /*break*/, 9];
                case 8:
                    err_1 = _b.sent();
                    console.log(err_1);
                    rej(err_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); });
};
// const initSky = () => {
//     const skyPath = path.join(__dirname, 'sky_vaults')
//     return new Promise(async (res, rej) => {
//         try {
//             await client.connect({
//                 host: process.env.HOST,
//                 port: parseInt(process.env.PORT),
//                 username: process.env.USER_SKY,
//                 password: process.env.PASSWORD,
//             })
//             try {
//                 await fs.promises.mkdir(skyPath)
//                 console.log('Creating folder...');
//             } catch { }
//             console.log('Downloading player files...');
//             await client.downloadDir("/playerSnapshots", skyPath)
//             console.log('Complete!');
//             await client.end()
//             lastUpdate = new Date()
//             res('')
//         }
//         catch (err) {
//             console.log(err)
//             rej(err)
//         }
//     })
// }
setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, init()
                // await initSky()
            ];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }, 3600000);
var fastify = require('fastify')();
fastify.register(require('@fastify/cors'), {
// put your options here
});
// Declare a route
fastify.register(static_1.default, {
    root: __dirname,
});
fastify.get("/api/snapshots", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getData()];
            case 1:
                data = _a.sent();
                data.sort(function (_a, _b) {
                    var aLevel = _a.vaultLevel;
                    var bLevel = _b.vaultLevel;
                    return +bLevel - +aLevel;
                });
                res.send(data);
                return [2 /*return*/];
        }
    });
}); });
fastify.get("/api/sky/snapshots", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getSkyData()];
            case 1:
                data = _a.sent();
                data.sort(function (_a, _b) {
                    var aLevel = _a.vaultLevel;
                    var bLevel = _b.vaultLevel;
                    return +bLevel - +aLevel;
                });
                res.send(data);
                return [2 /*return*/];
        }
    });
}); });
fastify.get("/api/refresh", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, init()
                // await initSky()
            ];
            case 1:
                _a.sent();
                // await initSky()
                res.send('Refreshing data...');
                return [2 /*return*/];
        }
    });
}); });
var getData = function () {
    return new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            fs.readdir(path_1.default.join(__dirname, 'vault'), function (err, files) { return __awaiter(void 0, void 0, void 0, function () {
                var snapshots, i, fileName, data, json, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!files)
                                return [2 /*return*/];
                            snapshots = [];
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < files.length)) return [3 /*break*/, 6];
                            fileName = files[i];
                            if (fileName === "whitelist.json")
                                return [3 /*break*/, 5];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, fs.promises.readFile(path_1.default.join(__dirname, 'vault', fileName), 'utf8')];
                        case 3:
                            data = _a.sent();
                            json = JSON.parse(data);
                            snapshots.push(json);
                            return [3 /*break*/, 5];
                        case 4:
                            err_2 = _a.sent();
                            console.log(err_2);
                            return [3 /*break*/, 5];
                        case 5:
                            i++;
                            return [3 /*break*/, 1];
                        case 6:
                            res(snapshots);
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
};
var getSkyData = function () {
    return new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            fs.readdir(path_1.default.join(__dirname, 'sky_vaults'), function (err, files) { return __awaiter(void 0, void 0, void 0, function () {
                var snapshots, i, fileName, data, json, err_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!files)
                                return [2 /*return*/];
                            snapshots = [];
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < files.length)) return [3 /*break*/, 6];
                            fileName = files[i];
                            if (fileName === "whitelist.json")
                                return [3 /*break*/, 5];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, fs.promises.readFile(path_1.default.join(__dirname, 'sky_vaults', fileName), 'utf8')];
                        case 3:
                            data = _a.sent();
                            json = JSON.parse(data);
                            snapshots.push(json);
                            return [3 /*break*/, 5];
                        case 4:
                            err_3 = _a.sent();
                            console.log(err_3);
                            return [3 /*break*/, 5];
                        case 5:
                            i++;
                            return [3 /*break*/, 1];
                        case 6:
                            res(snapshots);
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
};
fastify.get("/api/last-update", function (req, res) {
    res.send(lastUpdate.toUTCString());
});
// Run the server!
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    var err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fastify.listen(4000)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                // console.log(err);
                fastify.log.error(err_4);
                process.exit(1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
start();
