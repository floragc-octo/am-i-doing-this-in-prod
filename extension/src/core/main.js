const MAXIMUM_Z_INDEX = 2147483647

const hexaToRGB = (color) => {
  const [, r1, r2, g1, g2, b1, b2] = color
  return {
    r: parseInt(r1 + r2, 16),
    g: parseInt(g1 + g2, 16),
    b: parseInt(b1 + b2, 16),
  }
}
const getBrightness = ({ r, g, b }) => (r * 299 + g * 587 + b * 114) / 1000
const checkColorRatio = (backgroundColorRGB, colorRGB) => {
  // devnote : following calculations from from https://www.w3.org/TR/AERT/#color-contrast
  // devnote: https://ux.stackexchange.com/questions/99697/accessibility-color-difference-best-practices
  const brightnessDifference = getBrightness(colorRGB) - getBrightness(backgroundColorRGB)
  if (Math.abs(brightnessDifference) < 125) return false
  const colorDifference = Math.max(backgroundColorRGB.r, colorRGB.r)
      - Math.min(backgroundColorRGB.r, colorRGB.r)
      + Math.max(backgroundColorRGB.g, colorRGB.g) - Math.min(backgroundColorRGB.g, colorRGB.g)
      + Math.max(backgroundColorRGB.b, colorRGB.b) - Math.min(backgroundColorRGB.b, colorRGB.b)
  return colorDifference > 500
}

const newInvertColor = (color) => {
  const RGB = hexaToRGB(color)
  if (checkColorRatio(RGB, { r: 255, g: 255, b: 255 })) return '#FFFFFF'
  return '#000000'
}

const generateCss = ({ color, id }) => `#env-ribbon.${id} { background-color: ${color}; color: ${newInvertColor(color)};}`

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
