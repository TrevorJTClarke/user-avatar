/**
 * user-avatar
 *
 * A re-usable avatar component with multiple styles && options.
 *
 * REF: https://developers.google.com/web/fundamentals/primers/customelements/
 * FALLBACK: https://github.com/webcomponents/custom-elements/blob/master/custom-elements.min.js
 *
 * @markup
 * <user-avatar src="String"></user-avatar>
 * <user-avatar src="String" size="lg"></user-avatar>
 * <user-avatar src="String" size="xs" border="light"></user-avatar>
 * <user-avatar size="xs" border="dark" initials="tc"></user-avatar>
 *
 * @options
 *  - src - String containing needed avatar url (see below) REQUIRED unless initials
 *  - size - xs, sm, md (DEFAULT), lg, xl
 *  - fallback - changes default background image, if error occurs
 *  - initials - shows user initials instead of image if no image found
 *  - border - light, dark
 */
'use strict';
window.customElements.define('user-avatar', class extends HTMLElement {

  setDefaults() {
    var _this = this
    var optKeys = ['src', 'size', 'border']
    var options = {}

    optKeys.forEach(function (item) {
      var optVal = _this.attributes.getNamedItem(item)
      options[item] = (optVal && optVal.value) ? optVal.value : null
      _this[`set${item}`](options[item])
    })
  }

  // Only watch what we need to
  static get observedAttributes() {
    return ['src', 'size', 'border']
  }

  // Only called for the observedAttributes
  attributeChangedCallback(key, o, n) {
    // assign attribute changes based on key
    this[`set${key}`](n)
  }

  setsrc(url) {
    let _this = this
    let img = this._shadowRoot.querySelector('img')
    url = url || 'img/avatar.svg'

    // add a new image, fade in, remove old
    if (_this.srcLoaded || img.src) {
      let tmpNewImg = document.createElement('img')
      tmpNewImg.src = url
      tmpNewImg.classList = tmpNewImg.classList + ' new'
      this._shadowRoot.appendChild(tmpNewImg)

      setTimeout(() => {
        tmpNewImg.classList = tmpNewImg.classList + ' loaded'
      }, 1)
      setTimeout(() => {
        _this._shadowRoot.removeChild(img)
      }, 230)
      setTimeout(() => {
        tmpNewImg.classList = ''
      }, 240)
    } else {
      img.src = url
      _this.srcLoaded = true
    }
  }

  setsize(key) {
    let baseSize = 48
    key = key || 'md'

    // Avatar sizing
    // can be px or em, or rem based (DEFAULT: px)
    let sizes = {
      xs: baseSize - 20,
      sm: baseSize - 12,
      md: baseSize,
      lg: baseSize + 37,
      xl: baseSize * 3
    }

    this.size = sizes[key] || baseSize
    this.style.width = this.size + 'px'
    this.style.height = this.size + 'px'
  }

  /**
   * @attribute border
   * @param: light(DEFAULT), dark (, scaling???)
   */
  setborder(val) {
    if (!val) return;
    // TODO: Finish this
    console.log('HERE', val)
    this.style.border = '2px solid #ccc'
  }

  constructor() {
    super()

    this._shadowRoot = this.attachShadow({mode: 'open'})
    // TODO: Load from either compiled source, or outside cdn
    this._shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          overflow: hidden;
          will-change: all;
          transition: all 160ms ease-in-out;
        }
        img {
          display: block;
          width: 100%;
          height: 100%;
          opacity: 1;
          border-radius: 50%;
          overflow: hidden;
          will-change: opacity;
          transition: opacity 220ms ease-in-out;
        }
        .new {
          opacity: 0;
          display: block;
          position: absolute;
          left:0px;
          top:0px;
          z-index: 10;
        }
        .loaded {
          opacity: 1;
        }
      </style>
      <img/>
    `;

    this.setDefaults()
  }
})
