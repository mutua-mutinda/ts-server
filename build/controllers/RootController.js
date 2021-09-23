"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("./decorators");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send("Dead End");
}
var RootController = /** @class */ (function () {
    function RootController() {
    }
    RootController.prototype.getRoot = function (req, res) {
        if (req.session && req.session.loggedIn) {
            res.send("\n          <div>\n          <div>You're logged in</div> <br>\n          <a href=\"/auth/logout\"><u>log out</u></a>\n          </div>\n          ");
        }
        else {
            res.send("\n          <div>\n          <div>You're not logged in</div> <br>\n          <a href=\"/auth/login\"><u>log in</u></a>\n          </div>");
        }
    };
    RootController.prototype.getProtected = function (req, res, next) {
        res.send("\n    <div>\n    <div>Welcome to the protected route</div> <br>\n    <div>Have some Matcha tea</div>\n    <img style=\"height:70px; width:70px;\" src=\"https://images.japancentre.com/recipes/pics/16/main/matcha-latte.jpg?1469572822\"</img>\n    </div>\n    ");
    };
    __decorate([
        decorators_1.get("/"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], RootController.prototype, "getRoot", null);
    __decorate([
        decorators_1.get("/protected"),
        decorators_1.use(requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", void 0)
    ], RootController.prototype, "getProtected", null);
    RootController = __decorate([
        decorators_1.controller("")
    ], RootController);
    return RootController;
}());
