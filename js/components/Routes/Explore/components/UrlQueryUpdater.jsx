const React = require('react')
const { arrayOf, object, string } = React.PropTypes
const { connect } = require('react-redux')

const { getSelectedBudgetItemIds } = require('js/redux/ducks/explore')
const { getSelectedBudgetItemType } = require('js/redux/ducks/filters')
const { getSelectedFinanceType } = require('js/redux/ducks/filters')

const UrlQueryUpdater = React.createClass({
  contextTypes: {
    location: object,
    router: object
  },

  propTypes: {
    budgetItemType: string.isRequired,
    budgetItemIds: arrayOf(string).isRequired,
    financeType: string.isRequired
  },

  newQueryObject () {
    const {
      budgetItemIds,
      budgetItemType,
      financeType
    } = this.props

    const newQueryObject = {}

    if (budgetItemIds && budgetItemIds.length > 0) {
      newQueryObject.budgetItemIds = budgetItemIds
    }

    if (budgetItemType) newQueryObject.budgetItemType = budgetItemType
    if (financeType) newQueryObject.financeType = financeType

    return newQueryObject
  },

  updateQuery () {
    const { location, router } = this.context

    router.push(
      Object.assign(
        {},
        location,
        {
          query: Object.assign(
            {},
            location.query,
            this.newQueryObject()
          )
        }
      )
    )
  },

  componentDidUpdate () {
    if (!window) return
    this.updateQuery()
  },

  componentDidMount () {
    this.updateQuery()
  },

  render () {
    return null
  }
})

const mapStateToProps = (state) => ({
  budgetItemType: getSelectedBudgetItemType(state),
  budgetItemIds: getSelectedBudgetItemIds(state),
  financeType: getSelectedFinanceType(state)
})

module.exports = connect(mapStateToProps)(UrlQueryUpdater)
