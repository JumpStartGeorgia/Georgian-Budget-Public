const { createSelector } = require('reselect')
const rootSelector = require('./rootSelector')

const SET_BUDGET_ITEMS = 'georgianBudget/budgetItems/data/SET_BUDGET_ITEMS'

const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_BUDGET_ITEMS:
      return action.data
    default: {
      return state
    }
  }
}

reducer.setBudgetItems = function (budgetItems) {
  return {
    type: SET_BUDGET_ITEMS,
    data: budgetItems
  }
}

reducer.getBudgetItemsData = createSelector(
  rootSelector,
  ({budgetItems}) => budgetItems
)

module.exports = reducer
