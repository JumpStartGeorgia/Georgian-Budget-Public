const React = require('react')
const { arrayOf, object, shape, string, func } = React.PropTypes
const { connect } = require('react-redux')

const getLocationWithQuery = require('js/helpers/getLocationWithQuery')

const ClickableList = require('./ClickableList')

const {
  getSelectedBudgetItemIds,
  setSelectedBudgetItemIds
} = require('js/redux/ducks/explore')

const { getListedItems } = require('js/redux/ducks/explore/list')

const ExploreList = React.createClass({
  propTypes: {
    selectedIds: arrayOf(string).isRequired,
    listedItems: arrayOf(shape({
      id: string.isRequired,
      name: string.isRequired
    })).isRequired,
    setSelectedBudgetItemIds: func.isRequired
  },

  contextTypes: {
    router: object,
    location: object
  },

  updateURLWithSelectedIds (selectedIds) {
    this.context.router.push(
      getLocationWithQuery(
        this.context.location,
        {
          budgetItemIds: selectedIds
        }
      )
    )
  },

  handleClick (row) {
    const selectedIds = [row.props.data.id]
    this.props.setSelectedBudgetItemIds(selectedIds)
    this.updateURLWithSelectedIds(selectedIds)
  },

  rowClassName (row) {
    let className = 'gb-ExploreList-row'

    if (this.props.selectedIds.includes(row.id)) {
      className += ' is-selected'
    }

    return className
  },

  render () {
    return (
      <div className='gb-ExploreList'>
        <ClickableList
          listedItems={this.props.listedItems}
          columns={['name']}
          onRowClick={this.handleClick}
          rowMetadata={{ bodyCssClassName: this.rowClassName }}
          useGriddleStyles={false}
          showFilter
          enableInfiniteScroll
          bodyHeight='400'
        />
      </div>
    )
  }
})

const mapStateToProps = (state) => ({
  selectedIds: getSelectedBudgetItemIds(state),
  listedItems: getListedItems(state)
})

const mapDispatchToProps = dispatch => ({
  setSelectedBudgetItemIds: (ids) => { dispatch(setSelectedBudgetItemIds(ids)) }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(ExploreList)
