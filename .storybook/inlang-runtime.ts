import {initRuntimeWithLanguageInformation} from "@inlang/sdk-js/runtime";

/**
 * helper function to create an inlang runtime instance like the sveltekit plugin does
 * @param {string} lang language to use, must exist in ./languages/{lang}.json
 */
export async function createRuntime(lang: string,variableReferencePattern = ['{','}']) {
    const langResource = await readResource(lang, variableReferencePattern);
    const languageInformation = {
        referenceLanguage: lang,
        languages: [lang],
        readResource: () => langResource
    }
    // @ts-ignore
    const runtime = initRuntimeWithLanguageInformation(languageInformation);
    await runtime.loadResource(languageInformation.referenceLanguage);
    runtime.switchLanguage(languageInformation.referenceLanguage);
    return runtime;
}

/**
 * Reading resources.
 */
async function readResource(lang:string, variableReferencePattern) {
    const messages = collectNestedSerializedMessages(await JSON.parse((await import(`../languages/${lang}.json?raw`)).default));
    return parseResource(messages, lang, variableReferencePattern)
}

/**
 * Parses a resource.
 *
 * @example parseResource(resource, en, 2,["{{", "}}"])
 */
function parseResource(
    serializedMessages,
    language: string,
    variableReferencePattern,
) {
    return {
        type: "Resource",
        languageTag: {
            type: "LanguageTag",
            name: language,
        },
        body: serializedMessages.map((serializedMessage) => {
            return parseMessage(serializedMessage, variableReferencePattern)
        }),
    }
}

/**
 * Parses a message.
 *
 * @example parseMessage("testId", "test", ["{{", "}}"])
 */
function parseMessage(
    serializedMessage,
    variableReferencePattern,
) {
    return {
        type: "Message",
        metadata: {
            fileName: serializedMessage.fileName,
            keyName: serializedMessage.keyName,
            parentKeys: serializedMessage.parentKeys,
        },
        id: {
            type: "Identifier",
            name: serializedMessage.id,
        },
        pattern: parsePattern(serializedMessage.text, variableReferencePattern),
    }
}


/**
 * Parses a message.
 *
 * @example parseMessage("testId", "test", ["{{", "}}"])
 */
function parsePattern(
    text: string,
    variableReferencePattern
) {
    // dependent on the variableReferencePattern, different regex
    // expressions are used for matching
    const placeholder = variableReferencePattern[1]
        ? new RegExp(
            `(\\${variableReferencePattern[0]}[^\\${variableReferencePattern[1]}]+\\${variableReferencePattern[1]})`,
            "g",
        )
        : new RegExp(`(${variableReferencePattern}\\w+)`, "g")

    const elements = text
        .split(placeholder)
        .filter((element) => element !== "")
        .map((element) => {
            if (placeholder.test(element)) {
                return {
                    type: "Placeholder",
                    body: {
                        type: "VariableReference",
                        name: variableReferencePattern[1]
                            ? element.slice(
                                variableReferencePattern[0].length,
                                // negative index, removing the trailing pattern
                                -variableReferencePattern[1].length,
                            )
                            : element.slice(variableReferencePattern[0].length),
                    },
                }
            } else {
                return {
                    type: "Text",
                    value: element,
                }
            }
        })

    return {
        type: "Pattern",
        elements,
    }
}

/**
 * Recursive function to collect all strings in an object.
 * It creates and array, that contains the string, the parents and the id.
 *
 * @example collectStringsWithParents(parsedResource)
 */
export const collectNestedSerializedMessages = (
    node: unknown,
    parents: string[] | undefined = [],
    fileName?: string,
) => {
    const result = []

    if (typeof node === "string") {
        result.push({
            text: node,
            parentKeys: parents.length > 1 ? parents.slice(0, -1) : undefined,
            id: fileName ? fileName + "." + parents.join(".") : parents.join("."),
            keyName: parents.at(-1)!,
        })
    } else if (typeof node === "object" && node !== null) {
        for (const key in node) {
            // eslint-disable-next-line no-prototype-builtins
            if (node.hasOwnProperty(key)) {
                const currentParents = [...parents, key]
                const childResults = collectNestedSerializedMessages(
                    node[key as keyof typeof node],
                    currentParents,
                    fileName,
                )
                result.push(...childResults)
            }
        }
    }
    return result
}
