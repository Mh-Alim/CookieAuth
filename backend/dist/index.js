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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const JWT_SECRET = "XYZ";
const PORT = 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173",
}));
app.post("/sign-in", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // do db call and get id
    const token = yield jsonwebtoken_1.default.sign({
        id: 1,
    }, JWT_SECRET);
    res.cookie("token", token);
    res.json({
        message: "Logged in Successful",
    });
}));
app.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.cookies);
        const decod = (yield jsonwebtoken_1.default.verify(req.cookies.token, JWT_SECRET));
        res.json({
            id: decod.id,
        });
    }
    catch (e) {
        console.log("Error is: ", e.message);
    }
}));
app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "Logout Successful",
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
