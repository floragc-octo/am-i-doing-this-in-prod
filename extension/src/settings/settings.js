const defaultSetting = { config: [] }
const ribbonColorDOM = document.getElementById('ribbon-color')

const saveSettings = () => {
    store.set({ config: getAllEnv() })

    Promise.resolve()
}

function _create_input({ value, name, id, type }) {
    const label = document.createElement('label')
    const input = document.createElement('input')
    const container = document.createElement('div')
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
const _number_of_element = () => document.getElementById('input-form-container').childElementCount
const _updateLegendValue = ({ target }) => {
    const { value } = target
    target.parentNode.parentNode.children[0].innerText = value
}

const removeEnv = ({ target }) => {
    const elementToDelete = target.parentNode
    const parent = elementToDelete.parentNode
    parent.removeChild(elementToDelete)
} 

const addEnv = ({ site = "http://google.com", color = "black", label = "newenv" }, id = _number_of_element()) => {
    const form = document.getElementById('input-form-container')
    const env = document.createElement('fieldset')
    const legend = document.createElement('legend')
    const removeButton = document.createElement('button')
    removeButton.type = "button"
    removeButton.innerText = "X"

    removeButton.onclick = removeEnv
    legend.textContent = label

    const colorElement = _create_input({
        value: color,
        name: "color",
        id,
        type: "color",
    })
    const siteElement = _create_input({
        value: site,
        name: "site",
        id,
        type: "text",
    })
    const labelElement = _create_input({
        value: label,
        name: "label",
        id,
        type: "text",
    })
    labelElement.onkeyup = _updateLegendValue

    env.appendChild(legend)
    env.appendChild(labelElement)
    env.appendChild(siteElement)
    env.appendChild(colorElement)
    env.appendChild(removeButton)
    form.appendChild(env)
}
const get_configuration = (dom_element, i) => {
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
    const configuration_list = configuration_dom_list.map((configuration_dom, i) => get_configuration(configuration_dom, i))
    return configuration_list
}
// Getting user's settings' values
const userSettings = (settings) => {
    const { ribbon_color } = settings
    ribbonColorDOM.value = ribbon_color
}
const retrieveSettings = () => store.get(defaultSetting, ({ config }) => config.forEach((configuration, index) => addEnv(configuration, index)))

const defaultSettings = () => {
    const { ribbon_color } = defaultSetting
    ribbonColorDOM.value = ribbon_color
}

// DOM event listeners
document.addEventListener('DOMContentLoaded', retrieveSettings)
document.getElementById('custom-form').addEventListener('submit', saveSettings)
document.getElementById('add-env').addEventListener('click', addEnv)
