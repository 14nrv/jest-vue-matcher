[![NPM Version](https://img.shields.io/npm/v/jest-vue-matcher.svg)](https://www.npmjs.com/package/jest-vue-matcher)
[![Build Status](https://travis-ci.org/14nrv/jest-vue-matcher.svg?branch=dev)](https://travis-ci.org/14nrv/jest-vue-matcher)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c384581e3c664076d319/test_coverage)](https://codeclimate.com/github/14nrv/jest-vue-matcher/test_coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

# jest-vue-matcher
Additional jest matchers for vue

## Install
```
yarn add jest-vue-matcher -D
```

## Setup
```js
import { mount } from '@vue/test-utils'
import matchers from 'jest-vue-matcher'
import MyComponent from '@/components/MyComponent.vue'

let wrapper

describe('MyComponent', () => {
  beforeEach(() => {
    wrapper = mount(MyComponent)
    expect.extend(matchers(wrapper))
  })

  // ...
})
```

## Matchers available
* toHaveText(text)
  ```js
  expect('h1').toHaveText('My title')
  expect('h1').not.toHaveText('Not my title')
  ```
* toBeADomElement()
  ```js
  expect('h1').toBeADomElement()
  expect('notH1').not.toBeADomElement()
  ```
* toBeVisible()
  ```js
  expect('h1').toBeVisible()
  expect('not-h1').not.toBeVisible()
  ```
* toHaveAClass(className)
  ```js
  expect('h1').toHaveAClass('title')
  expect('h1').not.toHaveAClass('not-title')
  ```
* toHaveAttribute(attributeName, attributeValue)
  ```js
  expect('h1').toHaveAttribute('class', 'title')
  expect('h1').not.toHaveAClass('class', 'not-title')
  ```
* toHaveValue(value)
  ```js
  expect('input[type=text]').toHaveValue('plop')
  expect('input[type=text]').not.toHaveValue('not plop')
  ```
* toEmit(eventName)
  ```js
  expect(wrapper).toEmit('eventName')
  expect(wrapper).not.toEmit('not eventName')
  ```
* toEmitWith(eventName, eventValue)

  eventValue can be a string, an object or an array
  ```js
  expect(wrapper).toEmitWith('eventName', 'eventValue')
  expect(wrapper).not.toEmitWith('not eventName', { data: 'eventValue' })
  ```

## Inspiration

Inspirated by [mwangaben-vthelpers](https://github.com/mwangaben/mwangaben-vthelpers)
