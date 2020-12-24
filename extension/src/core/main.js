const MAXIMUM_Z_INDEX = 2147483647
const generate_css = ({ color, id }) => `#env-ribbon.${id} { background-color: ${color}; }`

const add_ribbon = ({ detail: config }) => {
  ribbon = document.createElement("div")
  let isKnownSite = false

  let beginCSS = ""
  config.forEach((env_config) => {
    beginCSS += generate_css(env_config)

    if (window.location.toString().indexOf(env_config.site) != -1) {
      isKnownSite = true
      ribbon.className = env_config.id
      ribbon.textContent = env_config.label
    }
  })
  
  if (!isKnownSite) return

  ribbon.id = "env-ribbon"
  document.body.appendChild(ribbon)

  let CSS = `#env-ribbon {
        font-weight: bolder;
        box-shadow: 0 0 5px; 
        height: 3rem;
        letter-spacing: 8px;
        line-height: 3rem;
        position: fixed;
        right: -55px;
        text-align: center;
        transform: rotate(45deg);
        top: 48px;
        width: 250px;
        z-index: ${MAXIMUM_Z_INDEX};
      }`
  CSS += beginCSS

  const style = document.createElement("style")
  style.appendChild(document.createTextNode(CSS))
  document.getElementsByTagName("head")[0].appendChild(style)
}

document.addEventListener('plugin_loaded', add_ribbon)
