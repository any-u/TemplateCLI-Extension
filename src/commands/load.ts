import * as vscode from "vscode";
import { DialogType, promptForOpenOutputChannel } from "../utils/uiUtils";
import { templateExecutor } from "../templateExecutor";

import { file } from "../utils/fileUtils";
import { localTemplateTreeDataProvider } from "../explorer/local/LocalTemplateTreeDataProvider";

export async function loadTemplate(): Promise<void> {
  try {
    const res: vscode.Uri[] | undefined = await vscode.window.showOpenDialog({
      canSelectFiles: true,
      canSelectFolders: false,
      canSelectMany: true,
      openLabel: "Select"
    });
    if (!res || !res.length) return;
    // generate local file
    file.mkdir(file.localDir());
    await Promise.all(res.map(item => templateExecutor.addSource(item.path)));

    // 生成本地config.json文件
    file.write(
      file.localConfigDir(),
      JSON.stringify(
        res.map((item: vscode.Uri) => {
          return {
            name: file.fullname(item.path)
          };
        })
      )
    );
    localTemplateTreeDataProvider.refresh()
  } catch (err) {
    await promptForOpenOutputChannel(
      "Failed to add templates. Please open the output channel for details.",
      DialogType.error
    );
  }
}