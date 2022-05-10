import * as vscode from "vscode"

enum EAction {
    SHOW_QUERIES = "showQueries",
    SHOW_QUERIES_CALLBACK = "showQueriesCallback",
    STOP_SHOWING_QUERIES = "stopShowingQueries",
}

export const activate = (context: vscode.ExtensionContext) => {
    context.subscriptions.push(
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.showQueries", () => handleAction(EAction.SHOW_QUERIES)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.showQueriesCallback", () => handleActionCallback(EAction.SHOW_QUERIES_CALLBACK)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.stopShowingQueries", () => handleAction(EAction.STOP_SHOWING_QUERIES))
    )
}

const handleAction = (action: string,) => {
    const editor = vscode.window.activeTextEditor

    const getAction = (action: string): string => {
        const actions: { [key: string]: string } = {
            [EAction.SHOW_QUERIES]: "ray()->showQueries();",
            [EAction.STOP_SHOWING_QUERIES]: "ray()->stopShowingQueries();",
        }

        return actions[action]
    }

    if (editor) {
        const position = editor.selection.active
        editor.edit((builder) => builder.insert(position, getAction(action)))
    }
}

const handleActionCallback = (action: string,) => {
    const editor = vscode.window.activeTextEditor

    if (editor) {
        const position = editor.selection.active

        if(action === EAction.SHOW_QUERIES_CALLBACK) {
            // editor.edit((builder) => builder.insert(position, getAction(action)))
        }
    }
}
