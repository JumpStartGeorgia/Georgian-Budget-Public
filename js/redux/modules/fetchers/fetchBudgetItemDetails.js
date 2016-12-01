const { normalize, arrayOf } = require('normalizr')
const budgetItem = require('js/redux/schemas/budgetItem')

const { addError } = require('js/redux/ducks/errors')

const { mergeBudgetItems } = require('js/redux/ducks/budgetItems')
const { mergeSpentFinances } = require('js/redux/ducks/spentFinances')
const { mergePlannedFinances } = require('js/redux/ducks/plannedFinances')

const { getLocale } = require('js/redux/ducks/locale')

const georgianBudgetAPI = require('js/services/georgianBudgetAPI')

const fetchBudgetItemDetails = (itemId) => (dispatch, getState) => {
  const state = getState()
  const locale = getLocale(state)

  const requiredState = [
    locale
  ]

  for (let i = 0; i < requiredState.length; i++) {
    if (requiredState[i].length === 0) return
  }

  georgianBudgetAPI.get(locale, 'v1', {
    params: {
      budgetItemFields: 'id,code,name,spent_finances,planned_finances',
      budgetItemIds: [itemId]
    }
  }).then((response) => {
    if (!response || !response.data || typeof response.data !== 'object') return

    response.data.errors.forEach((error) => {
      dispatch(addError(error.text))
    })

    const normalized = normalize(response.data, {
      budgetItems: arrayOf(budgetItem)
    })

    const { budgetItems, spentFinances, plannedFinances } = normalized.entities

    dispatch(mergeSpentFinances(spentFinances))
    dispatch(mergePlannedFinances(plannedFinances))

    Object.keys(budgetItems).forEach(budgetItemId => {
      budgetItems[budgetItemId].loaded = budgetItems[budgetItemId].loaded.concat('details')
    })

    dispatch(mergeBudgetItems(budgetItems))
  })
}

module.exports = fetchBudgetItemDetails