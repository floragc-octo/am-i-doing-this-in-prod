let currentURL = null

const defaultSetting = { config: [] }
const _numberOfElement = () => document.getElementById('cs-container').childElementCount

const COLOR_INPUT = {
    field: "color",
    type: "color",
}
const SITE_INPUT = {
    field: "site",
    size: 50,
    type: "text",
}
const LABEL_INPUT = {
    field: "label",
    size: 10,
    maxLength: 10,
    type: "text",
}
const REMOVE_BUTTON = {
    type: "button",
    className: "remove-button",
    innerText: "X",
}

const createElement = (elementName, params = {}, parent) => {
    const domElement = document.createElement(elementName)
    Object.keys(params).forEach(key => {
        domElement.setAttribute(key, params[key])
        domElement[key] = params[key]
    })
    return domElement
}
const appendChildren = (parent, children) => children.forEach(child => parent.appendChild(child))

const _createInput = (params) => {
    const { field, i } = params
    const id = field + i
    const container = createElement('span')
    container.appendChild(createElement('label', { for: id, innerText: field }))
    container.appendChild(createElement('input', { ...params, id }))
    return container
}

const saveSettings = ({ config = generateConfiguration() } = {}) => {
    store.set({ config })
}

const removeEnv = ({ target }) => {
    const elementToDelete = target.parentNode
    const parent = elementToDelete.parentNode
    parent.removeChild(elementToDelete)
}

const addEnv = (
    { site = currentURL, color = "#CCCCCC", label = "ENV LABEL" },
    i = _numberOfElement()
) => {
    const form = document.querySelector('#cs-container')
    const env = createElement('fieldset', { style: `background-color: ${color}40` })
    const removeButton = createElement('button', { ...REMOVE_BUTTON, onclick: removeEnv })
    const colorElement = _createInput({ ...COLOR_INPUT, value: color, i })
    const siteElement = _createInput({ ...SITE_INPUT, value: site, i })
    const labelElement = _createInput({ ...LABEL_INPUT, value: label, i })
    siteElement.style = "display: block;"
    appendChildren(env, [labelElement, colorElement, siteElement, removeButton])
    form.insertBefore(env, form.firstChild)
}

const getPageURL = async () => new Promise(resolve =>
    chrome.tabs.query({ active: true }, tabs => resolve(new URL(tabs[0].url).host))
)

const setPageUrl = async () => { currentURL = await getPageURL() }

const generateConfigurationLine = (domElement, i) => {
    const site = domElement.querySelector("[field=site]").value
    const label = domElement.querySelector("[field=label]").value
    const color = domElement.querySelector("[field=color]").value
    return { site, label, color, id: `a${i}` }
}

const domToList = (domList) => Array.prototype.slice.call(domList)
const getEnvList = () => domToList(document.querySelectorAll('#cs-container fieldset'))
const generateConfiguration = () => getEnvList().map((env, i) => generateConfigurationLine(env, i))

const loadSettingsFromStorageAndDisplay = () => store.get(defaultSetting, ({ config }) => {
    config.forEach((configuration, index) => addEnv(configuration, index))
})

const updateExportLink = () => {
    const dataStr = JSON.stringify(generateConfiguration())
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
    const exportFileDefaultName = 'didacticbarnacle_export.json'

    const link = document.querySelector("#cs-export")
    link.href = dataUri
    link.download = exportFileDefaultName
}

const retrieveSettingsFromFile = (event) => {
    event.preventDefault()
    const fr = new FileReader()
    const file = document.querySelector("#cr-file")
    if (file.files[0]) {
        fr.onload = () => loadAndSave(fr.result)
        const result = fr.readAsText(file.files[0])
    }
}

const loadAndSave = result => {
    JSONtoSettings(result)
    saveSettings()
}

const JSONtoSettings = (textFile) => {
    const values = JSON.parse(textFile)
    values.map(value => {
        addEnv(value)
    })
}

// DOM event listeners
document.addEventListener('DOMContentLoaded', loadSettingsFromStorageAndDisplay)
document.querySelector('#config-setter').addEventListener('submit', saveSettings)
document.querySelector('#config-retriever').addEventListener('submit', retrieveSettingsFromFile)
document.querySelector('#add-env').addEventListener('click', addEnv)
document.querySelector('#cs-export').addEventListener('click', updateExportLink)

setPageUrl()
