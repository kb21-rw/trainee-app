"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const traineeRoute_1 = __importDefault(require("./routes/traineeRoute"));
const coachRoute_1 = __importDefault(require("./routes/coachRoute"));
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
app.use((0, cors_1.default)({ origin: "*", credentials: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/auth", authRoute_1.default);
app.use("/users", userRoute_1.default);
app.use("/trainees", traineeRoute_1.default);
app.use("/coaches", coachRoute_1.default);
