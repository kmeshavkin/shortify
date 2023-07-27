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
exports.__esModule = true;
exports.authRouter = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var config_1 = __importDefault(require("config"));
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var googleapis_1 = require("googleapis");
var User_1 = require("../models/User");
var auth_middleware_1 = require("../middleware/auth.middleware");
var OAuth2 = googleapis_1.google.auth.OAuth2;
var _a = config_1["default"].get('google'), clientID = _a.clientID, clientSecret = _a.clientSecret, redirectPath = _a.redirectPath, scope = _a.scope;
var oauth2Client = new OAuth2(clientID, clientSecret, "".concat(config_1["default"].get('frontendHost'), "/").concat(redirectPath));
var router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('email', 'Email cannot be empty').exists({ checkFalsy: true }),
    (0, express_validator_1.check)('email', 'Wrong email format').isEmail(),
    (0, express_validator_1.check)('password', 'Password cannot be empty').exists({ checkFalsy: true }),
], function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, email, password, user, isMatch, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({
                            errors: errors.array(),
                            message: 'Incorrect login credentials'
                        })];
                }
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, User_1.UserModel.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).json({ message: 'Email not found' })];
                isMatch = bcryptjs_1["default"].compareSync(password, user.password);
                if (!isMatch) {
                    return [2 /*return*/, res.status(400).json({ message: 'Incorrect password' })];
                }
                // Don't use req.session.regenerate here, I need session after login to save links
                req.session.userId = user.id;
                res.json({ done: true });
                return [2 /*return*/, next()];
            case 2:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({ message: 'Something went wrong' })];
            case 3: return [2 /*return*/];
        }
    });
}); }, auth_middleware_1.AfterAuthMiddleware);
router.post('/google/redirect', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var session, _a, code, error, tokens, people, data, externalId, email, candidate, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                session = req.session;
                _a = req.query, code = _a.code, error = _a.error;
                if (error)
                    throw new Error(error.toString());
                return [4 /*yield*/, oauth2Client.getToken(code.toString())];
            case 1:
                tokens = (_b.sent()).tokens;
                oauth2Client.setCredentials(tokens);
                people = googleapis_1.google.people({ version: 'v1', auth: oauth2Client });
                return [4 /*yield*/, people.people.get({
                        resourceName: 'people/me',
                        personFields: 'emailAddresses,externalIds'
                    })];
            case 2:
                data = (_b.sent()).data;
                externalId = data.etag;
                email = data.emailAddresses[0].value;
                return [4 /*yield*/, User_1.UserModel.findOneAndUpdate({ $or: [{ googleId: externalId }, { email: email }] }, { email: email, password: '', googleId: externalId }, // TODO: make so it doesn't replace existing password
                    { upsert: true, "new": true })];
            case 3:
                candidate = _b.sent();
                session.userId = candidate.id;
                res.json({ done: true });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(500).json({ message: 'Something went wrong' })];
            case 5: return [2 /*return*/, next()];
        }
    });
}); }, auth_middleware_1.AfterAuthMiddleware);
router.post('/logout', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            // Destroying session is not necessary, just in case
            return [2 /*return*/, req.session.destroy(function () { return res.json({ done: true }); })];
        }
        catch (error) {
            console.log(error);
            return [2 /*return*/, res.status(500).json({ message: 'Something went wrong' })];
        }
        return [2 /*return*/];
    });
}); });
router.post('/register', [
    (0, express_validator_1.check)('email', 'Email cannot be empty').exists({ checkFalsy: true }),
    (0, express_validator_1.check)('email', 'Wrong email format').isEmail(),
    (0, express_validator_1.check)('password', 'Password length should be at least 6').isLength({
        min: 6
    }),
    (0, express_validator_1.check)('password', 'Password length should be less than 40').isLength({
        max: 40
    }),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, email, password, candidate, hashedPassword, user, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({
                            errors: errors.array(),
                            message: 'Incorrect credentials'
                        })];
                }
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, User_1.UserModel.findOne({ email: email })];
            case 1:
                candidate = _b.sent();
                if (candidate) {
                    return [2 /*return*/, res.status(400).json({ message: 'Email already exists' })];
                }
                return [4 /*yield*/, bcryptjs_1["default"].hash(password, bcryptjs_1["default"].genSaltSync())];
            case 2:
                hashedPassword = _b.sent();
                user = new User_1.UserModel({ email: email, password: hashedPassword });
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                return [2 /*return*/, res.status(201).json({ done: true })];
            case 4:
                error_3 = _b.sent();
                console.log(error_3);
                return [2 /*return*/, res.status(500).json({ message: 'Something went wrong' })];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post('/session', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var session, loginLink;
    return __generator(this, function (_a) {
        try {
            session = req.session;
            loginLink = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: scope
            });
            return [2 /*return*/, res.json({ loginLink: loginLink, loggedIn: session.userId })];
        }
        catch (e) {
            return [2 /*return*/, res.json({ loggedIn: false })];
        }
        return [2 /*return*/];
    });
}); });
exports.authRouter = router;
