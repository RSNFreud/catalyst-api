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
var ftp = __importStar(require("basic-ftp"));
var fs = __importStar(require("fs"));
var path_1 = __importDefault(require("path"));
var static_1 = __importDefault(require("@fastify/static"));
require('dotenv').config();
var filePath = path_1.default.join(__dirname, 'vault');
var lastUpdate = new Date();
var init = function () {
    return new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
        var client, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new ftp.Client();
                    if (!fs.existsSync(__dirname + '/vault')) return [3 /*break*/, 2];
                    return [4 /*yield*/, fs.promises.rm(__dirname + '/vault', { recursive: true, force: true })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    console.log(process.env.PORT);
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 9, , 10]);
                    return [4 /*yield*/, client.access({
                            host: process.env.HOST,
                            port: parseInt(process.env.PORT),
                            user: process.env.USER,
                            password: process.env.PASSWORD,
                            secure: false
                        })];
                case 4:
                    _a.sent();
                    console.log('Creating folder...');
                    return [4 /*yield*/, fs.promises.mkdir(filePath)];
                case 5:
                    _a.sent();
                    console.log('Downloading player files...');
                    return [4 /*yield*/, client.downloadToDir(filePath, '/playerSnapshots')];
                case 6:
                    _a.sent();
                    console.log('Creating whitelist.json');
                    return [4 /*yield*/, fs.promises.writeFile(filePath + '/whitelist.json', '')];
                case 7:
                    _a.sent();
                    console.log('Inserting data into whitelist');
                    return [4 /*yield*/, client.downloadTo(filePath + '/whitelist.json', 'whitelist.json')];
                case 8:
                    _a.sent();
                    console.log('Complete!');
                    lastUpdate = new Date();
                    res('');
                    return [3 /*break*/, 10];
                case 9:
                    err_1 = _a.sent();
                    console.log(err_1);
                    rej(err_1);
                    return [3 /*break*/, 10];
                case 10:
                    client.close();
                    return [2 /*return*/];
            }
        });
    }); });
};
fs.promises.access(path_1.default.join(__dirname, 'vault', 'whitelist.json'), fs.constants.F_OK).catch(function (err) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!err.message.includes('no such file or directory')) return [3 /*break*/, 2];
                return [4 /*yield*/, init()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
setInterval(function () {
    init();
}, 3600000);
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
fastify.get("/api/refresh", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        init();
        res.send('Refreshing data...');
        return [2 /*return*/];
    });
}); });
var getData = function () {
    return new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
        var err_2, whitelist, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 5]);
                    return [4 /*yield*/, fs.promises.access(path_1.default.join(__dirname, 'vault', 'whitelist.json'), fs.constants.F_OK)];
                case 1:
                    _c.sent();
                    return [3 /*break*/, 5];
                case 2:
                    err_2 = _c.sent();
                    console.log('No whitelist found...');
                    if (!err_2.message.includes('no such file or directory')) return [3 /*break*/, 4];
                    return [4 /*yield*/, init()];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4: return [3 /*break*/, 5];
                case 5:
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, fs.promises.readFile(path_1.default.join(__dirname, 'vault', 'whitelist.json'), 'utf8')];
                case 6:
                    whitelist = _b.apply(_a, [_c.sent()]).map(function (_a) {
                        var uuid = _a.uuid;
                        return uuid;
                    });
                    fs.readdir(path_1.default.join(__dirname, 'vault'), function (err, files) { return __awaiter(void 0, void 0, void 0, function () {
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
                                    return [4 /*yield*/, fs.promises.readFile(path_1.default.join(__dirname, 'vault', fileName), 'utf8')];
                                case 3:
                                    data = _a.sent();
                                    json = JSON.parse(data);
                                    if (!whitelist.includes(json.playerUUID))
                                        return [3 /*break*/, 5];
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
            }
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
