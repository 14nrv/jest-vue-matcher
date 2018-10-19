import { mount } from '@vue/test-utils'
import Questions from '@/components/Questions.vue'
import matchers from '@/matchers'

const inputTitle = 'input[name=title]'
let wrapper

const setInputValue = (selector, value) => wrapper.find(selector).setValue(value)
const trigger = (selector, event = 'click') => wrapper.find(selector).trigger(event)

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

    it('can success', () => {
      expect(selector).toHaveText(sentence)

      const { pass, message } = matchers(wrapper).toHaveText(selector, sentence)
      expect(pass).toBeTruthy()
      expect(message().includes('To not contains')).toBeTruthy()
    })

    it('can fail', () => {
      const { pass, message } = matchers(wrapper).toHaveText(selector, `not ${sentence}`)
      expect(pass).toBeFalsy()
      expect(message().includes('To contains')).toBeTruthy()
    })

    it('can reverse', () => {
      expect(selector).not.toHaveText(`not ${sentence}`)
    })
  })

  describe('toHaveValue', () => {
    const selector = inputTitle
    const sentence = 'hello'

    it('can success', () => {
      setInputValue(selector, sentence)

      expect(selector).toHaveValue(sentence)

      const { pass, message } = matchers(wrapper).toHaveValue(selector, sentence)
      expect(pass).toBeTruthy()
      expect(message().includes('to not be')).toBeTruthy()
    })

    it('can fail', () => {
      setInputValue(selector, sentence)

      const { pass, message } = matchers(wrapper).toHaveValue(selector, `not ${sentence}`)
      expect(pass).toBeFalsy()
      expect(message().includes('to be')).toBeTruthy()
    })

    it('can reverse', () => {
      setInputValue(selector, sentence)

      expect(selector).not.toHaveValue(`not ${sentence}`)
    })
  })

  describe('toEmit', () => {
    const eventName = 'isEditing'
    const selector = '.edit'

    it('can success', () => {
      trigger(selector)
      trigger('.update')

      expect(wrapper).toEmit(eventName)

      const { pass, message } = matchers(wrapper).toEmit(undefined, eventName)
      expect(pass).toBeTruthy()
      expect(message().includes('falsy')).toBeTruthy()
    })

    it('can fail', () => {
      trigger(selector)

      const { pass, message } = matchers(wrapper).toEmit(wrapper, `not ${eventName}`)
      expect(pass).toBeFalsy()
      expect(message().includes('truthy')).toBeTruthy()
    })

    it('can reverse', () => {
      trigger(selector)

      expect(wrapper).not.toEmit(`not ${eventName}`)
    })
  })

  describe('toEmitWith', () => {
    const eventName = 'isEditing'
    const eventValue = 40
    const selector = '.edit'

    it('can success', () => {
      trigger(selector)
      expect(wrapper).toEmitWith(eventName, eventValue)

      wrapper.vm.fireStatus()

      const { pass, message } = matchers(wrapper).toEmitWith(undefined, eventName, eventValue)
      expect(pass).toBeTruthy()
      expect(message().includes('To not contains')).toBeTruthy()
    })

    it('can fail', () => {
      trigger(selector)

      const { pass, message } = matchers(wrapper).toEmitWith(wrapper, `not ${eventName}`, eventValue)
      expect(pass).toBeFalsy()
      expect(message().includes('To contains')).toBeTruthy()
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

    it('can success', () => {
      expect(selector).toBeADomElement()

      const { pass, message } = matchers(wrapper).toBeADomElement(selector)
      expect(pass).toBeTruthy()
      expect(message().includes('to not be')).toBeTruthy()
    })

    it('can fail', () => {
      const { pass, message } = matchers(wrapper).toBeADomElement(`not-${selector}`)
      expect(pass).toBeFalsy()
      expect(message().includes('to be')).toBeTruthy()
    })

    it('can reverse', () => {
      expect(`not-${selector}`).not.toBeADomElement()
    })
  })

  describe('toBeVisible', () => {
    const selector = '.display-4'

    it('can success', () => {
      expect(selector).toBeVisible()

      const { pass, message } = matchers(wrapper).toBeVisible(selector)
      expect(pass).toBeTruthy()
      expect(message().includes('to not be')).toBeTruthy()
    })

    it('can fail', () => {
      const { pass, message } = matchers(wrapper).toBeVisible('ul')
      expect(pass).toBeFalsy()
      expect(message().includes('to be')).toBeTruthy()
    })

    it('can reverse', () => {
      expect('ul').not.toBeVisible()
    })
  })

  describe('toHaveAClass', () => {
    const selector = 'button'
    const className = 'edit'

    it('can success', () => {
      expect(wrapper).toHaveAClass('container')

      const { pass, message } = matchers(wrapper).toHaveAClass(selector, className)
      expect(pass).toBeTruthy()
      expect(message().includes('To not contains')).toBeTruthy()
    })

    it('can fail', () => {
      const { pass, message } = matchers(wrapper).toHaveAClass(selector, `not-${className}`)
      expect(pass).toBeFalsy()
      expect(message().includes('To contains')).toBeTruthy()
    })

    it('can reverse', () => {
      expect(selector).not.toHaveAClass(`not-${className}`)
    })
  })

  describe('toHaveAttribute', () => {
    const selector = '.container h2'
    const className = 'display-4'
    const attrName = 'class'

    it('can success', () => {
      expect(selector).toHaveAttribute(attrName, className)

      const { pass, message } = matchers(wrapper).toHaveAttribute(selector, attrName, className)
      expect(pass).toBeTruthy()
      expect(message().includes('to not be')).toBeTruthy()
    })

    it('can fail', () => {
      const { pass, message } = matchers(wrapper).toHaveAttribute(selector, attrName, `not-${className}`)
      expect(pass).toBeFalsy()
      expect(message().includes('to be')).toBeTruthy()
    })

    it('can reverse', () => {
      expect(selector).not.toHaveAttribute(attrName, `not-${className}`)
    })
  })
})