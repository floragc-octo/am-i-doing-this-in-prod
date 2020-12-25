const defaultSetting = { config: [] }
const _numberOfElement = () => document.getElementById('input-form-container').childElementCount

function _createInput({ value, name, id, type }) {
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
    Promise.resolve()
}

const removeEnv = ({ target }) => {
    const elementToDelete = target.parentNode
    const parent = elementToDelete.parentNode
    parent.removeChild(elementToDelete)
}

const addEnv = ({ site = "localhost", color = "#CCCCCC", label = "ENV" }, id = _numberOfElement()) => {
    const form = document.getElementById('input-form-container')
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
    env.style = "background-color: " + color + "40"

    env.appendChild(labelElement)
    env.appendChild(colorElement)
    env.appendChild(siteElement)
    env.appendChild(removeButton)
    form.appendChild(env)
}

const getConfiguration = (dom_element, i) => {
    const site = dom_element.querySelector("[field=site]").value
    const label = dom_element.querySelector("[field=label]").value
    const color = dom_element.querySelector("[field=color]").value
    return {
        site,
        label,
        color,
        id: `a${i}`
    }
}

const getAllEnv = () => {
    const configuration_dom_dom_list = document.querySelectorAll('#input-form-container fieldset')
    const configuration_dom_list = Array.prototype.slice.call(configuration_dom_dom_list)
    const configuration_list = configuration_dom_list.map((configuration_dom, i) => getConfiguration(configuration_dom, i))
    return configuration_list
}

const userSettings = (settings) => {
    const { ribbon_color } = settings
    ribbonColorDOM.value = ribbon_color
}

const retrieveSettings = () => store.get(defaultSetting, ({ config }) => {
    config.forEach((configuration, index) => addEnv(configuration, index))
})

// DOM event listeners
document.addEventListener('DOMContentLoaded', retrieveSettings)
document.getElementById('custom-form').addEventListener('submit', saveSettings)
document.getElementById('add-env').addEventListener('click', addEnv)
