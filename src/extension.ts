// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode"
import { DebugMessage } from "./debug-message"
import { JSDebugMessage } from "./debug-message/js"
import { ExtensionProperties, Message } from "./entities"
import { LineCodeProcessing } from "./line-code-processing"
import { JSLineCodeProcessing } from "./line-code-processing/js"

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const jsLineCodeProcessing: LineCodeProcessing = new JSLineCodeProcessing()
    const jsDebugMessage: DebugMessage = new JSDebugMessage(jsLineCodeProcessing)
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "quick-ray-dumper" is now active!')

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand("quick-ray-dumper.helloWorld", () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage("Hello World from Quick Ray Dumper test 1234!")
    })

    // Insert debug message
    vscode.commands.registerCommand("quick-ray-dumper.displayLogMessage", async () => {
        const editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor
        if (!editor) {
            return
        }
        const tabSize: number | string = getTabSize(editor.options.tabSize)
        const document: vscode.TextDocument = editor.document
        const config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("quickRayDumper")
        const properties: ExtensionProperties = getExtensionProperties(config)
        for (let index = 0; index < editor.selections.length; index++) {
            const selection: vscode.Selection = editor.selections[index]
            const selectedVar: string = document.getText(selection)
            const lineOfSelectedVar: number = selection.active.line
            // Check if the selection line is not the last one in the document and the selected variable is not empty
            if (selectedVar.trim().length !== 0) {
                await editor.edit((editBuilder) => {
                    const logMessageLine = jsDebugMessage.line(document, lineOfSelectedVar, selectedVar)
                    jsDebugMessage.msg(
                        editBuilder,
                        document,
                        selectedVar,
                        lineOfSelectedVar,
                        properties.wrapLogMessage,
                        properties.logMessagePrefix,
                        properties.quote,
                        properties.insertEnclosingClass,
                        properties.insertEnclosingFunction,
                        properties.delimiterInsideMessage,
                        properties.includeFileNameAndLineNum,
                        tabSize
                    )
                })
            }
        }
    })

    context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {}

function getExtensionProperties(workspaceConfig: vscode.WorkspaceConfiguration) {
    const wrapLogMessage = workspaceConfig.wrapLogMessage || false
    const logMessagePrefix = workspaceConfig.logMessagePrefix ? workspaceConfig.logMessagePrefix : ""
    const addSemicolonInTheEnd = workspaceConfig.addSemicolonInTheEnd || false
    const insertEnclosingClass = workspaceConfig.insertEnclosingClass
    const insertEnclosingFunction = workspaceConfig.insertEnclosingFunction
    const quote = workspaceConfig.quote || '"'
    const delimiterInsideMessage = workspaceConfig.delimiterInsideMessage || "~"
    const includeFileNameAndLineNum = workspaceConfig.includeFileNameAndLineNum || false
    const extensionProperties: ExtensionProperties = {
        wrapLogMessage,
        logMessagePrefix,
        addSemicolonInTheEnd,
        insertEnclosingClass,
        insertEnclosingFunction,
        quote,
        delimiterInsideMessage,
        includeFileNameAndLineNum,
    }
    return extensionProperties
}

const getTabSize = (tabSize: string | number | undefined): number => {
    if (tabSize && typeof tabSize === "number") {
        return tabSize
    } else if (tabSize && typeof tabSize === "string") {
        return parseInt(tabSize)
    } else {
        return 4
    }
}
