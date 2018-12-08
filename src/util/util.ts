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

export const range = (min: number, max: number): number[] => {
  const nums: number[] = []
  for (let i = min; i <= max; i += 1) {
    nums.push(i)
  }
  return nums
}
