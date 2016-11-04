const { beginLoadingBudgetItems, finishLoadingBudgetItems } = require('../ducks/budgetItems/loading')

const { addBudgetItemsError, clearBudgetItemsErrors } = require('../ducks/budgetItems/errors')

const { setBudgetItems } = require('../ducks/budgetItems/data')

const georgianBudgetAPI = require('js/services/georgianBudgetAPI')

const fetchBudgetItems = () => (dispatch, getState) => {
  const state = getState()
  const locale = state.locale
  const budgetItemType = state.filters.budgetItemType.value
  const financeType = state.filters.financeType.value
  const budgetItemIds = state.filters.budgetItems.selectedIds
  const timePeriodType = 'quarterly'

  if (budgetItemIds.length === 0) {
    dispatch(setBudgetItems([]))
    return
  }

  const requiredState = [
    locale,
    budgetItemType,
    financeType,
    timePeriodType,
    budgetItemIds
  ]

  for (let i = 0; i < requiredState.length; i++) {
    if (requiredState[i].length === 0) return
  }

  dispatch(clearBudgetItemsErrors())
  dispatch(beginLoadingBudgetItems())

  georgianBudgetAPI.get(locale, 'v1', {
    params: {
      filters: {
        budgetItemType: budgetItemType,
        financeType: financeType,
        timePeriodType: timePeriodType
      },
      budgetItemIds: budgetItemIds
    }
  }).then((response) => {
    dispatch(finishLoadingBudgetItems())

    if (!response || !response.data || typeof response.data !== 'object') {
      dispatch(addBudgetItemsError('Error communicating with API'))
      return
    }

    const { errors, budgetItems } = response.data

    errors.forEach((error) => {
      dispatch(addBudgetItemsError(error.text))
    })

    dispatch(setBudgetItems(budgetItems))
  })
}

module.exports = fetchBudgetItems
