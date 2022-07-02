import * as vscode from "vscode"

enum EAction {
    SHOW_QUERIES = "showQueries",
    SHOW_QUERIES_CALLBACK = "showQueriesCallback",
    STOP_SHOWING_QUERIES = "stopShowingQueries",
    COUNT_QUERIES = "countQueries",
    SHOW_DUPLICATE_QUERIES = "showDuplicateQueries",
    STOP_SHOWING_DUPLICATE_QUERIES = "stopShowingDuplicateQueries",
    SHOW_DUPLICATE_QUERIES_CALLBACK = "showDuplicateQueriesCallback",
    SHOW_SLOW_QUERIES = "showSlowQueries",
    SHOW_SLOW_QUERIES_CALLBACK = "showSlowQueriesCallback",
    SHOW_EVENTS = "showEvents",
    STOP_SHOWING_EVENTS = "stopShowingEvents",
    SHOW_EVENTS_CALLBACK = "showEventsCallback",
    SHOW_JOBS = "showJobs",
    STOP_SHOWING_JOBS = "stopShowingJobs",
    SHOW_JOBS_CALLBACK = "showJobsCallback",
    SHOW_CACHE = "showCache",
    STOP_SHOWING_CACHE = "stopShowingCache",
    SHOW_HTTP_CLIENT_REQUESTS = "showHttpClientRequests",
    STOP_SHOWING_HTTP_CLIENT_REQUESTS = "stopShowingHttpClientRequests",
    SHOW_HTTP_CLIENT_REQUESTS_CALLBACK = "showHttpClientRequestsCallback",
    SHOW_VIEWS = "showViews",
    SHOW_ENV = "showEnv",
    SHOW_REQUESTS = "showRequests",
    MODEL = "model",
    RAY_VARIABLE = "rayVariable",
    RAY_CARBON = "rayCarbon",
    RAY_CLASSNAME = "rayClassname",
    RAY_BACKTRACE = "rayBacktrace",
    RAY_CALLER = "rayCaller",
    RAY_CLEAR_SCREEN = "rayClearScreen",
    RY_CLEAR_ALL = "rayClearAll",
    RAY_COUNT = "rayCount",
    RAY_MEASURE = "rayMeasure",
    RAY_PAUSE = "rayPause",
    RAY_PHP_INFO = "rayPhpInfo",
    RAY_SEPARATOR = "raySeparator",
    RAY_TRACE = "rayTrace",
    RAY_EXCEPTION = "rayException",
    RAY_HTML = "rayHtml",
    RAY_IMAGE = "rayImage",
    RAY_JSON = "rayJson",
    RAY_TEXT = "rayText",
    RAY_XML = "rayXml",
}

export const activate = (context: vscode.ExtensionContext) => {
    context.subscriptions.push(
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.showQueries", () => handleAction(EAction.SHOW_QUERIES)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.showQueriesCallback", () => handleActionCallback(EAction.SHOW_QUERIES_CALLBACK)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.stopShowingQueries", () => handleAction(EAction.STOP_SHOWING_QUERIES)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.countQueries", () => handleActionCallback(EAction.COUNT_QUERIES)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.showDuplicateQueries", () => handleAction(EAction.SHOW_DUPLICATE_QUERIES)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.stopShowingDuplicateQueries", () => handleAction(EAction.STOP_SHOWING_DUPLICATE_QUERIES)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.showDuplicateQueriesCallback", () => handleActionCallback(EAction.SHOW_DUPLICATE_QUERIES_CALLBACK)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.showSlowQueries", () => handleAction(EAction.SHOW_SLOW_QUERIES)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.showSlowQueriesCallback", () => handleActionCallback(EAction.SHOW_SLOW_QUERIES_CALLBACK)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.showEvents", () => handleAction(EAction.SHOW_EVENTS)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.stopShowingEvents", () => handleAction(EAction.STOP_SHOWING_EVENTS)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.showEventsCallback", () => handleActionCallback(EAction.SHOW_EVENTS_CALLBACK)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.showJobs", () => handleAction(EAction.SHOW_JOBS)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.stopShowingJobs", () => handleAction(EAction.STOP_SHOWING_JOBS)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.showJobsCallback", () => handleActionCallback(EAction.SHOW_JOBS_CALLBACK)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.showCache", () => handleAction(EAction.SHOW_CACHE)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.stopShowingCache", () => handleAction(EAction.STOP_SHOWING_CACHE)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.showHttpClientRequests", () => handleAction(EAction.SHOW_HTTP_CLIENT_REQUESTS)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.stopShowingHttpClientRequests", () => handleAction(EAction.STOP_SHOWING_HTTP_CLIENT_REQUESTS)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.showHttpClientRequestsCallback", () => handleActionCallback(EAction.SHOW_HTTP_CLIENT_REQUESTS_CALLBACK)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.showViews", () => handleAction(EAction.SHOW_VIEWS)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.showEnv", () => handleAction(EAction.SHOW_ENV)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.showRequests", () => handleAction(EAction.SHOW_REQUESTS)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.model", () => handleActionFunction(EAction.MODEL)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.rayVariable", () => handleActionFunction(EAction.RAY_VARIABLE)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.rayCarbon", () => handleActionFunction(EAction.RAY_CARBON)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.rayClassname", () => handleActionFunction(EAction.RAY_CLASSNAME)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.rayBacktrace", () => handleAction(EAction.RAY_BACKTRACE)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.rayCaller", () => handleAction(EAction.RAY_CALLER)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.rayClearScreen", () => handleAction(EAction.RAY_CLEAR_SCREEN)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.rayClearAll", () => handleAction(EAction.RY_CLEAR_ALL)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.rayCount", () => handleAction(EAction.RAY_COUNT)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.rayMeasure", () => handleAction(EAction.RAY_MEASURE)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.rayPause", () => handleAction(EAction.RAY_PAUSE)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.rayPhpInfo", () => handleAction(EAction.RAY_PHP_INFO)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.raySeparator", () => handleAction(EAction.RAY_SEPARATOR)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.rayTrace", () => handleAction(EAction.RAY_TRACE)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.rayException", () => handleActionFunction(EAction.RAY_EXCEPTION)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.rayHtml", () => handleActionFunction(EAction.RAY_HTML)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.rayImage", () => handleActionFunction(EAction.RAY_IMAGE)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.rayJson", () => handleActionFunction(EAction.RAY_JSON)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.rayText", () => handleActionFunction(EAction.RAY_TEXT)),
        vscode.commands.registerTextEditorCommand("quick-ray-dumper.rayXml", () => handleActionFunction(EAction.RAY_XML))
    )
}

const handleAction = (action: string) => {
    const editor = vscode.window.activeTextEditor

    const getAction = (action: string): string => {
        const actions: { [key: string]: string } = {
            [EAction.SHOW_QUERIES]: "ray()->showQueries();",
            [EAction.STOP_SHOWING_QUERIES]: "ray()->stopShowingQueries();",
            [EAction.SHOW_DUPLICATE_QUERIES]: "ray()->showDuplicateQueries();",
            [EAction.STOP_SHOWING_DUPLICATE_QUERIES]: "ray()->stopShowingDuplicateQueries();",
            [EAction.SHOW_SLOW_QUERIES]: "ray()->showSlowQueries(100);",
            [EAction.SHOW_EVENTS]: "ray()->showEvents();",
            [EAction.STOP_SHOWING_EVENTS]: "ray()->stopShowingEvents();",
            [EAction.SHOW_JOBS]: "ray()->showJobs();",
            [EAction.STOP_SHOWING_JOBS]: "ray()->stopShowingJobs();",
            [EAction.SHOW_CACHE]: "ray()->showCache();",
            [EAction.STOP_SHOWING_CACHE]: "ray()->stopShowingCache();",
            [EAction.SHOW_HTTP_CLIENT_REQUESTS]: "ray()->showHttpClientRequests();",
            [EAction.STOP_SHOWING_HTTP_CLIENT_REQUESTS]: "ray()->stopShowingHttpClientRequests();",
            [EAction.SHOW_VIEWS]: "ray()->showViews();",
            [EAction.SHOW_ENV]: "ray()->env();",
            [EAction.SHOW_REQUESTS]: "ray()->showRequests();",
            [EAction.RAY_BACKTRACE]: "ray()->backtrace();",
            [EAction.RAY_CALLER]: "ray()->caller();",
            [EAction.RAY_CLEAR_SCREEN]: "ray()->clearScreen();",
            [EAction.RY_CLEAR_ALL]: "ray()->clearAll();",
            [EAction.RAY_COUNT]: "ray()->count();",
            [EAction.RAY_MEASURE]: "ray()->measure();",
            [EAction.RAY_PAUSE]: "ray()->pause();",
            [EAction.RAY_PHP_INFO]: "ray()->phpinfo();",
            [EAction.RAY_SEPARATOR]: "ray()->separator();",
            [EAction.RAY_TRACE]: "ray()->trace();",
        }

        return actions[action]
    }

    if (editor) {
        const position = editor.selection.active
        editor.edit((builder) => builder.insert(position, getAction(action)))
    }
}

const handleActionCallback = async (action: string) => {
    const getAction = (action: string): string => {
        const actions: { [key: string]: string } = {
            [EAction.SHOW_QUERIES_CALLBACK]: "ray()->showQueries(",
            [EAction.COUNT_QUERIES]: "ray()->countQueries(",
            [EAction.SHOW_DUPLICATE_QUERIES_CALLBACK]: "ray()->showDuplicateQueries(",
            [EAction.SHOW_SLOW_QUERIES_CALLBACK]: "ray()->showSlowQueries(100, ",
            [EAction.SHOW_EVENTS_CALLBACK]: "ray()->showEvents(",
            [EAction.SHOW_JOBS_CALLBACK]: "ray()->showJobs(",
            [EAction.SHOW_HTTP_CLIENT_REQUESTS_CALLBACK]: "ray()->showHttpClientRequests(",
        }

        return actions[action]
    }

    var { editor, startLine, endLine, selection } = await processSelection()

    await editor!.edit((currentText) => {
        currentText.replace(startLine.range.union(endLine.range), surroundWith(selection, getAction(action)))
    })
}

const handleActionFunction = async (action: string) => {
    const getActionFunction = (action: string): string => {
        const actions: { [key: string]: string } = {
            [EAction.MODEL]: "ray()->model(",
            [EAction.RAY_VARIABLE]: "ray(",
            [EAction.RAY_CARBON]: "ray()->carbon(",
            [EAction.RAY_CLASSNAME]: "ray()->className(",
            [EAction.RAY_EXCEPTION]: "ray()->exception(",
            [EAction.RAY_HTML]: "ray()->html(",
            [EAction.RAY_IMAGE]: "ray()->image(",
            [EAction.RAY_JSON]: "ray()->json(",
            [EAction.RAY_TEXT]: "ray()->text(",
            [EAction.RAY_XML]: "ray()->xml(",
        }

        return actions[action]
    }

    var { editor, selection, dest } = await processSelection()

    let selectedText = editor!.document.getText(selection)
    const line = editor!.document.lineAt(selection.active.line)

    const startSpace = " ".repeat(line.firstNonWhitespaceCharacterIndex)
    if (Array.from(selectedText)[0] !== "$") {
        selectedText = "$" + selectedText
    }

    const ray = "\n" + startSpace + `${getActionFunction(action)}${selectedText});`
    dest = dest.translate(0, line.text.length)

    editor!.edit((editBuilder) => {
        editBuilder.insert(dest, ray)
    })
}

const processSelection = async () => {
    const editor = vscode.window.activeTextEditor

    let selection = editor!.selection
    if (selection!.isEmpty) {
        selection = getCurrentLineSelection(selection)
    }
    let lines = getSelectLines(selection)
    const startLine = lines[0]
    let endLine = lines[lines.length - 1]
    if (selection.end.character === 0) {
        await editor!.edit((currentText) => {
            editor!.selection = new vscode.Selection(new vscode.Position(startLine.lineNumber, 0), new vscode.Position(endLine.lineNumber - 1, endLine.range.end.character))
        })
        selection = editor!.selection
        lines = getSelectLines(selection)
        endLine = lines[lines.length - 1]
    }

    let dest = selection.active

    return { editor, startLine, endLine, selection, lines, dest }
}

const surroundWith = (selection: vscode.Selection, type: string) => {
    let lines = getSelectLines(selection)
    const { prefix } = getPrefixAndIndent(lines[0])
    return [`${prefix}${type}function() {`, ...indentLines(lines), `${prefix}});`].join("\n")
}

const indentLines = (lines: vscode.TextLine[]) => {
    const { tabSize, insertSpaces } = vscode.window.activeTextEditor!.options
    let prefix = insertSpaces ? new Array((tabSize as number) + 1).join(" ") : "\t"
    return lines.map((line) => prefix + line.text)
}

const getPrefixAndIndent = (line: vscode.TextLine) => {
    let indentLength = line.firstNonWhitespaceCharacterIndex
    const { tabSize, insertSpaces } = vscode.window.activeTextEditor!.options
    return {
        indent: new Array((tabSize as number) + 1).join(insertSpaces ? " " : "\t"),
        prefix: new Array(indentLength + 1).join(insertSpaces ? " " : "\t"),
    }
}

const getCurrentLineSelection = (selection: vscode.Selection) => {
    const pos = selection.active
    let line = vscode.window.activeTextEditor!.document.lineAt(pos.line)
    return line.range as vscode.Selection
}

const getSelectLines = (selection: vscode.Selection): vscode.TextLine[] => {
    let lines = []
    for (let i = selection.start.line; i < selection.end.line + 1; i++) {
        lines.push(vscode.window.activeTextEditor!.document.lineAt(i))
    }
    return lines
}
