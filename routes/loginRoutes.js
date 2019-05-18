"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = require("../config/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Models
const usuarioModel_1 = require("../models/usuarioModel");
const maestrosModel_1 = require("../models/maestrosModel");
const loginRouter = express_1.Router();
// =================================================================
//-- Login con el metodo normal
// =================================================================
loginRouter.post('/', (req, resp) => {
    var body = req.body;
    usuarioModel_1.usuarioModel.findOne({ correo: body.correo }, (error, usuarioDB) => {
        if (error) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'Error al logearse'
            });
        }
        if (!usuarioDB) {
            return resp.status(400).json({
                ok: false,
                message: `No contamos con un usuario registrado con el correo: ${body.correo}`,
            });
        }
        if (!bcrypt_1.default.compareSync(body.password, usuarioDB.password)) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas',
                errors: error
            });
        }
        // Crear un token
        usuarioDB.password = 'encryptpassword';
        var token = jsonwebtoken_1.default.sign({ usuario: usuarioDB }, config_1.SEED, { expiresIn: 36000 });
        resp.status(200).json({
            ok: true,
            token: token,
            usuario: usuarioDB,
        });
    });
});
loginRouter.post('/maestros', (req, resp) => {
    var body = req.body;
    maestrosModel_1.maestroModel.findOne({ correo: body.correo }, (error, maestroDB) => {
        if (error) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'Error al logearse'
            });
        }
        if (!maestroDB) {
            return resp.status(400).json({
                ok: false,
                message: `No contamos con un maestro registrado con el correo: ${body.correo}`,
            });
        }
        if (!bcrypt_1.default.compareSync(body.password, maestroDB.password)) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas',
                errors: error
            });
        }
        // Crear un token
        maestroDB.password = 'encryptpassword';
        var token = jsonwebtoken_1.default.sign({ usuario: maestroDB }, config_1.SEED, { expiresIn: 36000 });
        resp.status(200).json({
            ok: true,
            token: token,
            maestro: maestroDB,
        });
    });
});
exports.default = loginRouter;
