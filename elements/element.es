var ElementPrototype = window.Element.prototype // see bottom of this file

const Element = function
  //https://gist.github.com/allenwb/53927e46b31564168a1d
  // https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
  // https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839

 ( tag, CustomElementRegistry = window.customElements )
{ tag = tag [0]

  return function (HTMLElement) // https://en.wikipedia.org/wiki/Higher-order_function
  { // Should this be a class❓❓❓❓

    const context = this === window ? {} : this

//  try
//    { return new CustomElementRegistry.get (tag) }

//  catch (_)
//    { /* console.warn('Defining Element `'+tag+'` (class {})') */ }

    class HTMLCustomElement extends // mixins

      EventTarget ( ParentNode ( GlobalEventHandlers ( HTMLElement )))

    { // exotic object - https://github.com/whatwg/html/issues/1704

      constructor () { super ()
        this.context = context

        super.initialize && super.initialize ()
      }

      get context ()
        { return self }

      set context (value)
        { self = value }

      get templates ()
        { return Array.from (this.selectAll ('template[name]')) }

      render () {
        // template = super.render ()
        // Where should this insert?
        // What about the meta elements (i.e. script, style, meta)

        this.tokens.bind (this)

        templatize.call (this, this.templates)

        function templatize (templates) {
          templates.forEach (template => {
            (new Template ([template.getAttribute ('name')]))
              .bind (this [template.getAttribute ('name')] || [])
          })
        }
      }

      // custom element reactions
      connectedCallback () {
        void ( super.constructor.onconnect
          || super.connectedCallback
          || function noop () {}
        ).call (this)

        this.render ()
      }
    }

//  try
//    {
        CustomElementRegistry.define (tag, HTMLCustomElement)
//    }

//  finally
//    {
        return CustomElementRegistry.get (tag)
//    }
  }
}

// Assign `window.Element.prototype` in case of feature checking on `Element`
Element.prototype = ElementPrototype
  // http://2ality.com/2013/09/window.html
  // http://tobyho.com/2013/03/13/window-prop-vs-global-var
  // https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-es5-loader.js#L19
