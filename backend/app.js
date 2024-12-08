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
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const routes_1 = __importDefault(require("./src/routes"));
const track_1 = __importDefault(require("./src/routes/track"));
const recommendations_1 = __importDefault(require("./src/routes/recommendations"));
const spotify_1 = __importDefault(require("./src/auth/spotify"));
const preview_1 = __importDefault(require("./src/routes/preview"));
const playlist_1 = require("./src/core/spotify/playlist");
const swagger_1 = require("./src/swagger");
const app = (0, express_1.default)();
const port = 5000;
app.use((0, express_session_1.default)({ secret: "your_secret_key", resave: true, saveUninitialized: true }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_1.default.json());
app.use("/auth/spotify", spotify_1.default);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, routes_1.default)();
        res.send(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
app.get("/track/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, track_1.default)(req.params.id);
        res.send(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}));
app.get("/recommendations/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, recommendations_1.default)(req.params.token);
        res.send(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
app.get("/preview/:trackName/:artistName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const result = yield (0, preview_1.default)(req.params.trackName, req.params.artistName);
        res.send(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
app.post("/playlist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const result = yield (0, playlist_1.createPlaylist)(req.body.accessToken, req.body.userId, req.body.playlistName);
        res.send(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
(0, swagger_1.setupSwagger)(app);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
