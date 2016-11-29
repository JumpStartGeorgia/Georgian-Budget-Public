const React = require('react')

const BudgetItemTypeInitializer = require('./components/BudgetItemTypeInitializer')
const FinanceTypeInitializer = require('./components/FinanceTypeInitializer')
const TimePeriodsInitializer = require('./components/TimePeriodsInitializer')
const SelectedIdsInitializer = require('./components/SelectedIdsInitializer')

const Initializers = () => (
  <div>
    <BudgetItemTypeInitializer />
    <FinanceTypeInitializer />
    <TimePeriodsInitializer />
    <SelectedIdsInitializer />
  </div>
)

module.exports = Initializers
