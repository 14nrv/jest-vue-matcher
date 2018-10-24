// @ts-ignore
import matcher from 'expect/build/matchers'

let w

// utils
const getSelector = selector => {
  try {
    const isWrapper = selector.isVueInstance()
    return isWrapper && w
  } catch (error) {
    return w.find(selector)
  }
}

// matcher
const toHaveText = (selector, text) =>
  matcher.toContain(w.find(selector).html(), text)

const toBeVisible = selector =>
  matcher.toBeTruthy(w.find(selector).isVisible())

const toBeADomElement = selector =>
  matcher.toBeTruthy(w.contains(selector))

const toHaveAClass = (selector, className) =>
  matcher.toContain(getSelector(selector).classes(), className)

const toHaveAttribute = (selector, attr, value) =>
  matcher.toBe(w.find(selector).attributes()[attr], value)

const toHaveValue = (selector, value) =>
  matcher.toBe(w.find(selector).element.value, value)

const toHaveProp = (selector = w, propName) =>
  matcher.toHaveProperty(selector.props(), propName)

const toEmit = (selector = w, event) =>
  matcher.toBeTruthy(selector.emitted()[event])

const toEmitWith = (selector = w, event, data) => {
  let eventValue

  toEmit(selector, event)

  try {
    eventValue = selector.emitted()[event][0]
  } catch (error) {
    return {
      message: () => `Can't find event: '${event}'`,
      pass: false
    }
  }

  return Array.isArray(data)
    ? matcher.toEqual(eventValue[0], expect.arrayContaining(data))
    : data instanceof Object
      ? matcher.toEqual(eventValue[0], expect.objectContaining(data))
      : matcher.toContain(eventValue, data)
}

const matchers = wrapper => {
  w = wrapper

  return {
    toHaveText,
    toBeVisible,
    toBeADomElement,
    toHaveAClass,
    toHaveAttribute,
    toHaveValue,
    toHaveProp,
    toEmit,
    toEmitWith
  }
}

export default matchers
