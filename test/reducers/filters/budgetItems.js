// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const budgetItemsFilter = require('../../../js/reducers/filters/budgetItems')
const initialState = require('../../../js/initialState').filters.budgetItems

describe('budget items filter reducer', () => {
  it('handles START_LOADING_BUDGET_ITEM_FILTER', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        loading: false
      }
    )

    const action = {
      type: 'START_LOADING_BUDGET_ITEM_FILTER'
    }

    const newState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        loading: true
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })

  it('handles FINISH_LOADING_BUDGET_ITEM_FILTER', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        loading: true
      }
    )

    const action = {
      type: 'FINISH_LOADING_BUDGET_ITEM_FILTER'
    }

    const newState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        loading: false
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })

  it('handles SET_BUDGET_ITEM_TYPE action when not budget item type is not total', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        options: [
          {value: 10, label: 'hello!' }
        ],
        hidden: true
      }
    )

    const action = {
      type: 'SET_BUDGET_ITEM_TYPE',
      value: 'woooo'
    }

    const newState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        options: [],
        hidden: false
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })

  it ('handles SET_BUDGET_ITEM_TYPE action when not budget item type is total', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        options: [
          { value: 3443, label: '2343' }
        ],
        hidden: false
      }
    )

    const action = {
      type: 'SET_BUDGET_ITEM_TYPE',
      value: 'total'
    }

    const newState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        options: [],
        hidden: true
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })

  it('handles SET_BUDGET_ITEM_FILTER_OPTIONS action', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        options: [
          { value: 10, label: 'helo' }
        ]
      }
    )

    const action = {
      type: 'SET_BUDGET_ITEM_FILTER_OPTIONS',
      options: [
        { value: 12, label: 'hello' },
        { value: 54, label: 'fdf' }
      ]
    }

    const newState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        options: [
          { value: 12, label: 'hello' },
          { value: 54, label: 'fdf' }
        ]
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })

  it('handles SET_SELECTED_BUDGET_ITEM_IDS action', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        selectedIds: [1]
      }
    )

    const action = {
      type: 'SET_SELECTED_BUDGET_ITEM_IDS',
      ids: [4, 6, 1]
    }

    const newState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        selectedIds: [4, 6, 1]
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })
})