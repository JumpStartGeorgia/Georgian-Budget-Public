const React = require('react')
const { Route, IndexRoute } = require('react-router')

const Explore = require('./Explore')
const Landing = require('./Landing')

const Routes = () => (
  <Route path='/ka'>
    <IndexRoute component={Landing} />
    <Route path='explore' component={Explore} />
  </Route>
)

module.exports = Routes
