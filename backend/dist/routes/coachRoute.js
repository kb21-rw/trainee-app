"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coachController_1 = require("../controllers/coachController");
const authenticate_1 = require("../middlewares/authenticate");
const router = (0, express_1.Router)();
router.get("/all", authenticate_1.verifyJWT, coachController_1.get_coaches);
exports.default = router;
