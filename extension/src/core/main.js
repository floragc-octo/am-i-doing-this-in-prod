const MAXIMUM_Z_INDEX = 2147483647
const generateCss = ({ color, id }) => `#env-ribbon.${id} { background-color: ${color}; }`

const addRibbon = ({ detail: configuration }) => {
  const ribbon = document.createElement('div')
  let isKnownSite = false

  let beginCSS = ''
  configuration.forEach((configurationLine) => {
    beginCSS += generateCss(configurationLine)

    if (window.location.toString().indexOf(configurationLine.site) !== -1) {
      isKnownSite = true
      ribbon.className = configurationLine.id
      ribbon.textContent = configurationLine.label
    }
  })

  if (!isKnownSite) return

  ribbon.id = 'env-ribbon'
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

  const style = document.createElement('style')
  style.appendChild(document.createTextNode(CSS))
  document.getElementsByTagName('head')[0].appendChild(style)
}

document.addEventListener('plugin_loaded', addRibbon)
