"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
var fileRouter = express_1.Router();
fileRouter.use(express_fileupload_1.default());
fileRouter.post('/:seccion', (req, resp) => {
    var seccion = req.params.seccion;
    if (!req.files) {
        return resp.json({
            ok: true,
            mensaje: 'No hay archivo'
        });
    }
    var archivo = req.files.documento;
    var path = '/jajaja';
    resp.json({
        ok: true,
        archivo: archivo.name
    });
});
exports.default = fileRouter;
