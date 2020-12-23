const defaultGetter = {
  config: [],
}

store.get(defaultGetter, ({ config }) => {
  const event = new CustomEvent('plugin_loaded', { detail: config })
  document.dispatchEvent(event)
})
