import * as vscode from 'vscode'
// @ts-ignore
import { dataToTs } from '@jl-org/data-to-ts'
import { getConfig, writeCode } from './tool'


export function activate(context: vscode.ExtensionContext) {

    const disposable = vscode.commands.registerCommand('extension.jtt', async () => {
        const rawJSON = await vscode.env.clipboard.readText()
        const enableExport = getConfig<boolean>('export'),
            enableType = getConfig<boolean>('type'),
            needSemicolons = getConfig<boolean>('semicolon'),
            rootName = getConfig<string>('rootName')

        try {
            const ts = dataToTs(rawJSON, {
                useTypeAlias: enableType,
                enableExport,
                needSemicolons,
                rootName
            })

            writeCode(ts.join('\n\n'))
        }
        catch (error) {
            vscode.window.showErrorMessage(`非法 JSON：${rawJSON}`)
        }
    })

    context.subscriptions.push(disposable)
}

export function deactivate() { }