

const cleanString = intext => {
    const uttext = intext.replace(/(\r\n|\n|\r)/gm, '').replace(/\s+/g, ' ').replace(new RegExp('> ', 'g'), '>').replace(new RegExp(' <', 'g'), '<')
    return uttext
  }
  
  const getElementWithNS = function (xml, xpath, ns, defaultText) {
    let result
    if (defaultText == null) defaultText = ''
  
    try {
      result = cleanString(xml.get(xpath, ns).text())
    } catch (err) {
      result = cleanString(defaultText);
    }
  
    return result
  }
  
  const getAttributeWithNS = function (xml, xpath, ns, defaultText) {
    let result
    if (defaultText == null) defaultText = ''
  
    try {
      result = cleanString(xml.get(xpath, ns).value())
    } catch (err) {
      result = defaultText
    }
  
    return result
  }

  
  export { cleanString, getElementWithNS, getAttributeWithNS }