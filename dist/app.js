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
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var config_1 = __importDefault(require("config"));
var express_session_1 = __importDefault(require("express-session"));
var compression_1 = __importDefault(require("compression"));
var auth_1 = require("./api/auth");
var link_1 = require("./api/link");
var redirect_1 = require("./api/redirect");
var _a = config_1["default"].get('session'), name = _a.name, secret = _a.secret, maxAge = _a.maxAge;
var MongoStore = connect_mongo_1["default"](express_session_1["default"]);
var app = express_1["default"]();
app.use(express_1["default"].json());
app.use(compression_1["default"]());
app.use(express_session_1["default"]({
    name: name,
    secret: secret,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose_1["default"].connection }),
    cookie: { maxAge: maxAge, sameSite: true }
}));
// Routes setup
// TODO: should be also 'secure: true' (production only, read here: https://github.com/expressjs/session#cookiesecure)
app.use('/api/auth', auth_1.authRouter);
app.use('/api/link', link_1.linkRouter);
app.use('/t', redirect_1.redirectRouter);
if (process.env.NODE_ENV !== 'development') {
    app.use('/', express_1["default"].static(path_1["default"].join(__dirname, 'build')));
    app.get('*', function (req, res) {
        res.sendFile(path_1["default"].resolve(__dirname, 'build', 'index.html'));
    });
}
// Mongo setup and project run point
var PORT = config_1["default"].get('port');
(function start() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1["default"].connect(config_1["default"].get('mongoURL'), {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        useCreateIndex: true,
                        useFindAndModify: false
                    })];
                case 1:
                    _a.sent();
                    // TODO: Somehow access sessions schema and add hook to remove all links linked to expired session
                    // mongoose.model('sessions').collection.watch().stream().on('data', (data) => {
                    //     console.log(data.operationType);
                    // });
                    app.listen(PORT, function () { return console.log("Started on port " + PORT); });
                    return [2 /*return*/];
            }
        });
    });
})();
