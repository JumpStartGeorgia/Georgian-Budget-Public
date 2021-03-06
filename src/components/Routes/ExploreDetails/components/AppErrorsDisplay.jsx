const React = require('react')
const { array } = React.PropTypes
const ErrorsDisplay = require('src/components/shared/ErrorsDisplay')
const { getErrors } = require('src/data/ducks/errors')
const { connect } = require('react-redux')

const AppErrorsDisplay = (props) => {
  return <ErrorsDisplay errors={props.errors} />
}

AppErrorsDisplay.propTypes = {
  errors: array
}

const mapStateToProps = (state) => ({
  errors: getErrors(state)
})

module.exports = connect(mapStateToProps)(AppErrorsDisplay)
