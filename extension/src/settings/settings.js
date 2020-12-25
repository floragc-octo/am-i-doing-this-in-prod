let currentURL = null

const defaultSetting = {config: []}
const _numberOfElement = () => document.getElementById('config-setter').childElementCount

const _createInput = ({value, name, id, type}) => {
    const label = document.createElement('label')
    const input = document.createElement('input')
    const container = document.createElement('span')
    label.htmlFor = name + id
    label.innerText = name
    input.setAttribute('field', name)
    input.id = name + id
    input.type = type
    input.value = value
    container.appendChild(label)
    container.appendChild(input)
    return container
}

const saveSettings = () => {
    store.set({ config: getAllEnv() })
}

const removeEnv = ({ target }) => {
    const elementToDelete = target.parentNode
    const parent = elementToDelete.parentNode
    parent.removeChild(elementToDelete)
}

const addEnv = (
    {site = currentURL || "localhost", color = "#CCCCCC", label = "ENV"},
    id = _numberOfElement()) => {
    const form = document.getElementById('cs-container')
    const env = document.createElement('fieldset')
    const removeButton = document.createElement('button')
    removeButton.type = "button"
    removeButton.className = "remove-button"
    removeButton.innerText = "X"

    removeButton.onclick = removeEnv

    const colorElement = _createInput({
        value: color,
        name: "color",
        id,
        type: "color",
    })
    const siteElement = _createInput({
        value: site,
        name: "site",
        id,
        type: "text",
    })
    const labelElement = _createInput({
        value: label,
        name: "label",
        id,
        type: "text",
    })

    labelElement.children[1].maxLength = 10
    labelElement.children[1].size = 10
    siteElement.style = "display: block;"
    siteElement.children[1].size = 30
    env.style = `background-color: ${color}40`

    env.appendChild(labelElement)
    env.appendChild(colorElement)
    env.appendChild(siteElement)
    env.appendChild(removeButton)
    form.insertBefore(env, form.firstChild)
}

const getPageURL = async () =>
    new Promise(resolve =>
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => resolve(new URL(tabs[0].url).host))
    )

const setPageUrl = async () => { currentURL = await getPageURL() }

const getConfiguration = (dom_element, i) => {
    const site = dom_element.querySelector("[field=site]").value
    const label = dom_element.querySelector("[field=label]").value
    const color = dom_element.querySelector("[field=color]").value
    return {
        site,
        label,
        color,
        id: `a${i}`,
    }
}

const getAllEnv = () => {
    const configuration_dom_dom_list = document.querySelectorAll('#cs-container fieldset')
    const configuration_dom_list = Array.prototype.slice.call(configuration_dom_dom_list)
    return configuration_dom_list.map((configuration_dom, i) => getConfiguration(configuration_dom, i))
}

const loadSettingsFromStorageAndDisplay = () => store.get(defaultSetting, ({config}) => {
    config.forEach((configuration, index) => addEnv(configuration, index))
})

const updateExportLink = () => {
    const dataStr = JSON.stringify(getAllEnv())
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = 'didacticbarnacle_export.json'

    const link = document.getElementById("cs-export")
    link.href = dataUri
    link.download = exportFileDefaultName
}

const retrieveSettingsFromFile = () => {
    const fr = new FileReader()
    fr.readAsText(document.getElementById("cr-file").files[0])
    fr.onload = () => JSONtoSettings(fr.result)
}

const JSONtoSettings = (textFile) => {
    const values = JSON.parse(textFile)
    values.map(value => addEnv(value))
    saveSettings()
}

// DOM event listeners
document.addEventListener('DOMContentLoaded', loadSettingsFromStorageAndDisplay)
document.getElementById('config-setter').addEventListener('submit', saveSettings)
document.getElementById('config-retriever').addEventListener('submit', retrieveSettingsFromFile)
document.getElementById('add-env').addEventListener('click', addEnv)
document.getElementById('cs-export').addEventListener('click', updateExportLink)

setPageUrl()
