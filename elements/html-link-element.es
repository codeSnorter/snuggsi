const HTMLLinkElement = function

  // http://w3c.github.io/webcomponents/spec/imports/#h-interface-import

(tag) {

  const
    proxy = {}
  , link  =
      document
        .querySelector // use CSS :any ?
          ('link#'+tag+'[rel=import], link[href*='+tag+'][rel=import]')

    Object
      .defineProperty (proxy, 'onload', {

        set (handler) {
          !!! link
            ? handler ({ target: proxy })

            : (HTMLImports.useNative)
                ? link.onload = handler

                : HTMLImports.whenReady // eww
                  // https://github.com/webcomponents/html-imports#htmlimports
                  ( _ => handler ({ target: link }) )
        }
      })

  return proxy
}

