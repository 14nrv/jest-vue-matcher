// @ts-ignore
import matcher from 'expect/build/matchers'

let w

// utils
const getSelector = selector =>
  selector.vm
    ? w
    : w.find(selector)

// matcher
const toHaveText = (selector, text) =>
  matcher.toContain(w.find(selector).text(), text)

const toBeADomElement = selector =>
  matcher.toBeTruthy(w.find(selector).exists())

const toHaveClass = (selector, className) =>
  matcher.toContain(getSelector(selector).attributes('class'), className)

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
    toBeADomElement,
    toHaveClass,
    toHaveAttribute,
    toHaveValue,
    toHaveProp,
    toEmit,
    toEmitWith
  }
}

export default matchers
