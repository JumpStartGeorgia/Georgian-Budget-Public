// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const budgetItems = require('js/ducks/data/budgetItems')

describe('budget items reducer', () => {
  it('handles SET_BUDGET_ITEMS action', () => {
    const previousState = [{
      id: '1',
      value: '2',
    }]

    const action = {
      type: 'SET_BUDGET_ITEMS',
      budgetItems: [
        {
          id: 5
        },
        {
          id: 44,
          value: 6
        }
      ]
    }

    const newState = budgetItems(previousState, action)

    const expectedState = [
      {
        id: 5
      },
      {
        id: 44,
        value: 6
      }
    ]

    expect(newState).to.deep.equal(expectedState)
  })
})
