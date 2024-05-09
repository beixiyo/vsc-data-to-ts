import * as vscode from 'vscode'

export function writeCode(code: string) {
    const editor = vscode.window.activeTextEditor
    if (!editor) {
        return
    }

    editor.edit((editBuilder) => {
        const position = editor.selection.active
        editBuilder.insert(position, code)
    })
}

export function getConfig<T>(key: string) {
    return vscode.workspace.getConfiguration('dtt').get(key) as T
}