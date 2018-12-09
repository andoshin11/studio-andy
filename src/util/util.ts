export const prerender = (href: string): void => {
  const elementId = 'prerendering-header'
  const _link = document.getElementById(elementId)

  if (_link) {
    const _href = _link.attributes.getNamedItem('href')
    if (_href && _href.value === href) return

    // remove previous link before creating new one
    _link.parentNode && _link.parentNode.removeChild(_link)
  }

  const link = document.createElement('link')
  link.id = elementId
  link.rel = 'prerender'
  link.href = href
  document.head && document.head.appendChild(link)
}

export const unique = <T>(data: T[]): T[] => {
  return data.filter((item, index, _data) => _data.indexOf(item) === index)
}

export const filterOutNull = <T>(array: (T | null)[]): T[] => {
  return array.filter((item): item is T => item !== null)
}
