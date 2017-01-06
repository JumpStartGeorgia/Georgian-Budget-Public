const React = require('react')
const { string, func, array } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl, intlShape, defineMessages } = require('react-intl')
const budgetItemTypeMessages = require('src/messages/budgetItemTypes')
const snakeToCamel = require('src/utilities/snakeToCamel')
const { budgetItemTypes } = require('src/data/modules/entities/budgetItem')

const { getDetailsItemId } = require('src/data/ducks/explore')
const { setBudgetItemType } = require('src/data/ducks/filters')
const { getSelectedBudgetItemType } = require('src/data/ducks/filters')

const {
  getChildItemsOfTypeForItem
} = require('src/data/modules/entities/budgetItem')

const ButtonSelector = require('src/components/shared/ButtonSelector')

const messages = defineMessages({
  label: {
    id: 'app.filters.budgetItemType.label',
    description: 'Label text for budget item type filter',
    defaultMessage: 'Select budget item type'
  }
})

const BudgetItemTypeSelect = React.createClass({
  propTypes: {
    detailsItemId: string,
    selectedBudgetItemType: string,
    intl: intlShape,
    setBudgetItemType: func,
    options: array
  },

  handleChangeEvent (selectedBudgetItemType) {
    this.props.setBudgetItemType(selectedBudgetItemType)
  },

  render () {
    const { selectedBudgetItemType, intl, options } = this.props

    return (
      <ButtonSelector
        handleChangeEvent={this.handleChangeEvent}
        options={options}
        selectedValue={selectedBudgetItemType}
        labelText={intl.formatMessage(messages.label)}
      />
    )
  }
})

const getOptions = (state, ownProps) => {
  const { intl } = ownProps

  return budgetItemTypes
  .filter(budgetItemType =>
    getChildItemsOfTypeForItem(
      state,
      getDetailsItemId(state),
      budgetItemType
    ).length > 0
  )
  .map(budgetItemType => ({
    value: budgetItemType,
    label: intl.formatMessage(
      budgetItemTypeMessages[snakeToCamel(budgetItemType)].other
    )
  }))
}

const mapStateToProps = (state, ownProps) => ({
  detailsItemId: getDetailsItemId(state),
  selectedBudgetItemType: getSelectedBudgetItemType(state),
  options: getOptions(state, ownProps)
})

const mapDispatchToProps = (dispatch) => ({
  setBudgetItemType (selectedBudgetItemType) {
    dispatch(setBudgetItemType(selectedBudgetItemType))
  }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(BudgetItemTypeSelect))
