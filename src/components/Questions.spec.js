import { mount } from '@vue/test-utils'
import matchers from '@/matchers'
import Questions from '@/components/Questions.vue'

const inputTitle = 'input[name=title]'
let wrapper

const setInputValue = (selector, value) => wrapper.find(selector).setValue(value)
const trigger = (selector, event = 'click') => wrapper.find(selector).trigger(event)

const test = (action, matcher, selector, value) => {
  it('can success', () => {
    action && action()

    expect(selector)[matcher](value)

    const { pass } = matchers(wrapper)[matcher](selector, value)
    expect(pass).toBeTruthy()
  })

  it('can fail', () => {
    action && action()

    const { pass } = value
      ? matchers(wrapper)[matcher](selector, `not-${value}`)
      : matchers(wrapper)[matcher](`not-${selector}`)
    expect(pass).toBeFalsy()
  })

  it('can reverse', () => {
    action && action()

    value
      ? expect(selector).not[matcher](`not-${value}`)
      : expect(`not-${selector}`).not[matcher]()
  })
}

describe('Questions', () => {
  beforeEach(() => {
    wrapper = mount(Questions)
    expect.extend(matchers(wrapper))
  })

  afterEach(() => {
    wrapper.destroy()
  })

  describe('toHaveText', () => {
    const sentence = 'Where am i ?'
    const selector = 'h2'

    test(null, 'toHaveText', selector, sentence)
  })

  describe('toHaveValue', () => {
    const selector = inputTitle
    const sentence = 'hello'
    const action = () => setInputValue(selector, sentence)

    test(action, 'toHaveValue', selector, sentence)
  })

  describe('toHaveProp', () => {
    const prop = 'name'

    test(null, 'toHaveProp', wrapper, prop)
  })

  describe('toEmit', () => {
    const eventName = 'isEditing'
    const selector = '.edit'
    const action = () => trigger(selector)

    test(action, 'toEmit', wrapper, eventName)
  })

  describe('toEmitWith', () => {
    const eventName = 'isEditing'
    const eventValue = 40
    const selector = '.edit'

    it('can success', () => {
      trigger(selector)
      expect(wrapper).toEmitWith(eventName, eventValue)

      const { pass } = matchers(wrapper).toEmitWith(undefined, eventName, eventValue)
      expect(pass).toBeTruthy()
    })

    it('can fail', () => {
      trigger(selector)

      const { pass, message } = matchers(wrapper).toEmitWith(wrapper, `not ${eventName}`, eventValue)
      expect(pass).toBeFalsy()
      expect(message()).toBe(`Can't find event: 'not ${eventName}'`)
    })

    it('can reverse', () => {
      trigger(selector)

      expect(wrapper).not.toEmitWith(`not ${eventName}`, eventValue)
    })

    it('can success with an array as event value', () => {
      wrapper.vm.firePrices()

      expect(wrapper).toEmitWith('prices', [10, 20])
    })

    it('can success with an object as event value', () => {
      wrapper.vm.fireObject()

      expect(wrapper).toEmitWith('obj', { product: 'iPhone X' })
    })
  })

  describe('toBeADomElement', () => {
    const selector = 'h2'

    test(null, 'toBeADomElement', selector)
  })

  describe('toBeVisible', () => {
    const selector = '.display-4'

    it('can success', () => {
      expect(selector).toBeVisible()

      const { pass } = matchers(wrapper).toBeVisible(selector)
      expect(pass).toBeTruthy()
    })

    it('can fail', () => {
      const { pass } = matchers(wrapper).toBeVisible('ul')
      expect(pass).toBeFalsy()
    })

    it('can reverse', () => {
      expect('ul').not.toBeVisible()
    })
  })

  describe('toHaveAClass', () => {
    const selector = 'button'
    const className = 'edit'

    test(null, 'toHaveAClass', selector, className)

    it('can check class on wrapper', () => {
      expect(wrapper).toHaveAClass('container')
    })
  })

  describe('toHaveAttribute', () => {
    const selector = '.container h2'
    const className = 'display-4'
    const attrName = 'class'

    it('can success', () => {
      expect(selector).toHaveAttribute(attrName, className)

      const { pass } = matchers(wrapper).toHaveAttribute(selector, attrName, className)
      expect(pass).toBeTruthy()
    })

    it('can fail', () => {
      const { pass } = matchers(wrapper).toHaveAttribute(selector, attrName, `not-${className}`)
      expect(pass).toBeFalsy()
    })

    it('can reverse', () => {
      expect(selector).not.toHaveAttribute(attrName, `not-${className}`)
    })
  })
})
