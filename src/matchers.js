import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils'

const matchers = wrapper => ({
  toHaveText (selector, text) {
    const el = wrapper.find(selector)
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
  },
  toBeVisible (selector) {
    const el = wrapper.find(selector)
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
  },
  toBeADomElement (selector) {
    const pass = wrapper.contains(selector)

    return {
      message: () =>
        `${matcherHint(pass ? '.not.toBeADomElement' : '.toBeADomElement')}\n\n` +
        `Expected value to ${pass ? 'not ' : ''}be (using ===):\n` +
        `  ${!pass}\n` +
        'Received:\n' +
        `  ${pass}`,
      pass
    }
  },
  toHaveAClass (selector, className) {
    const getSelector = () => {
      try {
        const isWrapper = selector.isVueInstance()
        return isWrapper && wrapper
      } catch (error) {
        return wrapper.find(selector)
      }
    }

    const elClassName = getSelector().classes()
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
  },
  toHaveAttribute (selector, attr, value) {
    const el = wrapper.find(selector)
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
  },
  toHaveValue (selector, value) {
    const el = wrapper.find(selector)
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
  },
  toEmit (selector = wrapper, event) {
    const eventValue = selector.emitted()[event]
    const pass = !!eventValue

    return {
      message: () =>
        `${matcherHint(pass ? '.not.toEmit' : '.toEmit')}\n\n` +
        `Expected value to be ${pass ? 'falsy' : 'truthy'}, instead received:\n` +
        `  ${printExpected(eventValue)}`,
      pass
    }
  },
  toEmitWith (selector = wrapper, event, ...data) {
    let eventValue, pass

    try {
      eventValue = selector.emitted()[event][0]
    } catch (error) {
      pass = false
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
})

export default matchers
