let currentURL = null

const defaultSetting = { config: [] }
const _numberOfElement = () => document.querySelector('#cs-container').childElementCount

const COLOR_INPUT = {
  field: 'color',
  type: 'color',
}
const SITE_INPUT = {
  field: 'site',
  size: 50,
  type: 'text',
}
const LABEL_INPUT = {
  field: 'label',
  size: 10,
  maxLength: 10,
  type: 'text',
}
const REMOVE_BUTTON = {
  type: 'button',
  className: 'remove-button secondary',
  innerText: 'X',
}

const createElement = (tagName, params = {}) => {
  const domElement = document.createElement(tagName)
  Object.keys(params).forEach((key) => {
    domElement.setAttribute(key, params[key])
    domElement[key] = params[key]
  })
  return domElement
}
const appendChildren = (parent, children) => children.forEach((child) => parent.appendChild(child))

const _createInput = (params) => {
  const { field, i } = params
  const id = field + i
  const container = createElement('span')
  container.appendChild(createElement('label', { for: id, innerText: field }))
  container.appendChild(createElement('input', { ...params, id }))
  return container
}

const domToList = (domList) => Array.prototype.slice.call(domList)
const getEnvList = () => domToList(document.querySelectorAll('#cs-container fieldset'))

const generateConfigurationLine = (domElement, i) => {
  const site = domElement.querySelector('[field=site]').value
  const label = domElement.querySelector('[field=label]').value
  const color = domElement.querySelector('[field=color]').value
  return {
    site,
    label,
    color,
    id: `a${i}`,
  }
}

const generateConfiguration = () => getEnvList().map((env, i) =>
  generateConfigurationLine(env, i))

const saveSettings = ({ config = generateConfiguration() } = {}) =>
  chrome.storage.sync.set({ config })

const removeEnv = ({ target }) => {
  const elementToDelete = target.parentNode
  const parent = elementToDelete.parentNode
  parent.removeChild(elementToDelete)
}

const addEnv = ({ site = currentURL, color = '#CCCCCC', label = 'ENV LABEL' },
  i = _numberOfElement()) => {
  const form = document.querySelector('#cs-container')
  const env = createElement('fieldset', { style: `border: 1px solid transparent; background-color: ${color}20; border-radius: 0.5rem;` })
  const removeButton = createElement('button', { ...REMOVE_BUTTON, onclick: removeEnv })
  const colorElement = _createInput({ ...COLOR_INPUT, value: color, i })
  const siteElement = _createInput({ ...SITE_INPUT, value: site, i })
  const labelElement = _createInput({ ...LABEL_INPUT, value: label, i })
  siteElement.style = 'display: block;'
  appendChildren(env, [labelElement, colorElement, siteElement, removeButton])
  form.insertBefore(env, form.firstChild)
}

const addDefaultEnv = () => addEnv({ site: 'replace by url', label: 'DEFAULT' })

const getPageURL = async () => new Promise((resolve) =>
  chrome.tabs.query({ active: true }, (tabs) => resolve(new URL(tabs[0].url).host)))

const setPageUrl = async () => { currentURL = await getPageURL() }

const loadSettingsFromStorageAndDisplay = () =>
  chrome.storage.sync.get(defaultSetting, ({ config }) =>
    config.forEach((configuration, index) => addEnv(configuration, index)))

const updateExportLink = () => {
  const dataStr = JSON.stringify(generateConfiguration())
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`
  const exportFileDefaultName = 'amidoingthisinprod_export.json'

  const link = document.querySelector('#cs-export')
  link.href = dataUri
  link.download = exportFileDefaultName
}

const addJsonSettingToDOM = (textFile) => {
  const values = JSON.parse(textFile)
  values.forEach((value) => addEnv(value))
}

const loadAndSave = (result) => {
  addJsonSettingToDOM(result)
  saveSettings()
}

const retrieveSettingsFromFile = (event) => {
  event.preventDefault()
  const fr = new FileReader()
  const inputFile = document.querySelector('#cr-file')
  if (inputFile.files[0]) {
    fr.onload = () => loadAndSave(fr.result)
    fr.readAsText(inputFile.files[0])
  }
}

// DOM event listeners
document.addEventListener('DOMContentLoaded', loadSettingsFromStorageAndDisplay)
document.querySelector('#config-setter').addEventListener('submit', saveSettings)
document.querySelector('#config-retriever').addEventListener('submit', retrieveSettingsFromFile)
document.querySelector('#add-env').addEventListener('click', addEnv)
document.querySelector('#add-default-env').addEventListener('click', addDefaultEnv)
document.querySelector('#cs-export').addEventListener('click', updateExportLink)

setPageUrl()
