"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const mongodb_url = process.env.MONGODB_URL || "";
const app = (0, express_1.default)();
mongoose_1.default.connect(mongodb_url);
mongoose_1.default.connection.once("open", () => {
    app.listen(PORT, () => {
        console.log(`The app is running on port ${PORT}`);
    });
});
app.use(express_1.default.json());
app.use("/auth", authRoute_1.default);
