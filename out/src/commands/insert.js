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
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const download = require("./download");
const utils_1 = require("../utils");
const templateChannel_1 = require("../templateChannel");
const TemplateNode_1 = require("../explorer/online/TemplateNode");
const LocalTemplateNode_1 = require("../explorer/local/LocalTemplateNode");
const MineTemplateNode_1 = require("../explorer/mine/MineTemplateNode");
function onlineInsert(node) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = utils_1.file.data(utils_1.file.onlineFile(node.fullname));
        if (res)
            return insertEditor(res);
        // 1. 下载文件
        yield download.installOneTemplate(node);
        return onlineInsert(node);
    });
}
function localInsert(node) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = utils_1.file.data(utils_1.file.localFile(node.fullname));
        if (res)
            return insertEditor(res);
    });
}
function mineInsert(node) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = utils_1.file.data(node.path);
        if (res)
            return insertEditor(res);
    });
}
function insertTemplate(node) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!node)
            return;
        if (node instanceof TemplateNode_1.TemplateNode)
            return yield onlineInsert(node);
        if (node instanceof LocalTemplateNode_1.LocalTemplateNode)
            return yield localInsert(node);
        if (node instanceof MineTemplateNode_1.MineTemplateNode)
            return yield mineInsert(node);
    });
}
exports.insertTemplate = insertTemplate;
function insertEditor(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                yield utils_1.promptForOpenOutputChannel("Failed to found Editor. Please open the Editor.", utils_1.DialogType.warning);
                return; // No open text editor
            }
            editor.edit(builder => {
                builder.insert(new vscode.Position(editor.selection.end.line, editor.selection.end.character), data);
            });
        }
        catch (error) {
            templateChannel_1.templateChannel.appendLine(error);
            yield utils_1.promptForOpenOutputChannel("Failed to insert templates. Please open the output channel for details.", utils_1.DialogType.error);
        }
    });
}
exports.insertEditor = insertEditor;
//# sourceMappingURL=insert.js.map