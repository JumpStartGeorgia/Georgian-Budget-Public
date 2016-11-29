const React = require('react')
const Helmet = require('react-helmet')

const TimePeriodSelect = require('./components/TimePeriodSelect')
const AppErrorsDisplay = require('./components/AppErrorsDisplay')
const ExploreDetails = require('./components/Details/index')
const ExploreList = require('./components/List/index')
const UrlQueryUpdater = require('./components/UrlQueryUpdater')
const BudgetItemTypeInitializer = require('./components/BudgetItemTypeInitializer')
const FinanceTypeInitializer = require('./components/FinanceTypeInitializer')
const TimePeriodsInitializer = require('./components/TimePeriodsInitializer')
const SelectedIdsInitializer = require('./components/SelectedIdsInitializer')

const Explore = React.createClass({
  render () {
    return (
      <div>
        <Helmet title='Explore' />

        <BudgetItemTypeInitializer />
        <FinanceTypeInitializer />
        <TimePeriodsInitializer />
        <SelectedIdsInitializer />

        <UrlQueryUpdater />

        <TimePeriodSelect />

        <AppErrorsDisplay />

        <div className='gb-Explore-content'>
          <ExploreList />
          <ExploreDetails />
        </div>
      </div>
    )
  }
})

module.exports = Explore
