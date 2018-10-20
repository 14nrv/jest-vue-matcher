import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils'

let w

const toHaveText = (selector, text) => {
  const el = w.find(selector)
  const elHtml = el.html()
  const pass = elHtml.includes(text)

  return {
    actual: selector,
    message: () =>
      `${matcherHint(pass ? '.not.toHaveText' : '.toHaveText')}\n\n` +
      'Expected string (using .includes):\n' +
      `  ${printExpected(elHtml)}\n` +
      `To ${pass ? 'not ' : ''}contains value:\n` +
      `  ${printReceived(text)}`,
    pass
  }
}

const toBeVisible = selector => {
  const el = w.find(selector)
  const pass = el.isVisible()

  return {
    message: () =>
      `${matcherHint(pass ? '.not.toBeVisible' : '.toBeVisible')}\n\n` +
      `Expected value to ${pass ? 'not ' : ''}be (using ===):\n` +
      `  ${!pass}\n` +
      'Received:\n' +
      `  ${pass}`,
    pass
  }
}

const toBeADomElement = selector => {
  const pass = w.contains(selector)

  return {
    message: () =>
      `${matcherHint(pass ? '.not.toBeADomElement' : '.toBeADomElement')}\n\n` +
      `Expected value to ${pass ? 'not ' : ''}be (using ===):\n` +
      `  ${!pass}\n` +
      'Received:\n' +
      `  ${pass}`,
    pass
  }
}

const getSelector = selector => {
  try {
    const isWrapper = selector.isVueInstance()
    return isWrapper && w
  } catch (error) {
    return w.find(selector)
  }
}

const toHaveAClass = (selector, className) => {
  const elClassName = getSelector(selector).classes()
  const pass = elClassName.includes(className)

  return {
    message: () =>
      `${matcherHint(pass ? '.not.toHaveAClass' : '.toHaveAClass')}\n\n` +
      'Expected array:\n' +
      `  ${printExpected(elClassName)}\n` +
      `To ${pass ? 'not ' : ''}contains value:\n` +
      `  ${printReceived(className)}`,
    pass
  }
}

const toHaveAttribute = (selector, attr, value) => {
  const el = w.find(selector)
  const elAttr = el.attributes()[attr]
  const pass = elAttr === value

  return {
    message: () =>
      `${matcherHint(pass ? '.not.toHaveAttribute' : '.toHaveAttribute')}\n\n` +
      `Expected value to ${pass ? 'not ' : ''}be (using ===):\n` +
      `  ${printExpected(elAttr)}\n` +
      'Received:\n' +
      `  ${printReceived(value)}`,
    pass
  }
}

const toHaveValue = (selector, value) => {
  const el = w.find(selector)
  const elValue = el.element.value
  const pass = elValue === value

  return {
    message: () =>
      `${matcherHint(pass ? '.not.toHaveValue' : '.toHaveValue')}\n\n` +
      `Expected value to ${pass ? 'not ' : ''}be (using ===):\n` +
      `  ${printExpected(elValue)}\n` +
      'Received:\n' +
      `  ${printReceived(value)}`,
    pass
  }
}

const toEmit = (selector = w, event) => {
  const eventValue = selector.emitted()[event]
  const pass = !!eventValue

  return {
    message: () =>
      `${matcherHint(pass ? '.not.toEmit' : '.toEmit')}\n\n` +
      `Expected value to be ${pass ? 'falsy' : 'truthy'}, instead received:\n` +
      `  ${printExpected(eventValue)}`,
    pass
  }
}

const isDataInArray = (array, data) =>
  data.some(d =>
    array.some(x => x.includes(d)))

const isDataInObject = (array, data) =>
  array.some(ev => {
    const keys = Object.keys(data)
    const values = Object.values(data)
    return keys.some(k => ev.hasOwnProperty(k) && ev[k] === values[0])
  })

const toEmitWith = (selector = w, event, ...data) => {
  let eventValue, pass

  try {
    eventValue = selector.emitted()[event][0]
  } catch (error) {
    pass = false
  }

  pass !== false && (pass = data.some(d =>
    Array.isArray(d)
      ? isDataInArray(eventValue, d)
      : d instanceof Object
        ? isDataInObject(eventValue, d)
        : eventValue.includes(d)
  ))

  return {
    message: () =>
      `${matcherHint(pass ? '.not.toEmitWith' : '.toEmitWith')}\n\n` +
      'Expected array:\n' +
      `  ${printExpected(eventValue)}\n` +
      `To ${pass ? 'not ' : ''}contains value:\n` +
      `  ${printReceived(data)}`,
    pass
  }
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
    toEmit,
    toEmitWith
  }
}

export default matchers
