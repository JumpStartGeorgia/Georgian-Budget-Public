const React = require('react')
const { string } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')

const { getBudgetItemName } = require('src/data/modules/entities/budgetItem')
const { getDetailsItemId } = require('src/data/ducks/explore')
const appMessages = require('src/messages/app')

const Meta = require('src/components/shared/Meta')

const MetaContainer = React.createClass({
  propTypes: {
    budgetItemName: string,
    siteName: string,
    pathname: string,
    search: string,
    shareImagePath: string
  },

  getInitialState () {
    return {
      host: ''
    }
  },

  componentDidMount () {
    this.setState({
      host: window.location.origin
    })
  },

  url () {
    let url = ''

    if (!this.props) return url
    if (this.state.host.length > 0) url = url + this.state.host
    if (this.props.pathname) url = url + this.props.pathname
    if (this.props.search) url = url + this.props.search
    return url
  },

  shareImage () {
    if (!this.state.host || !this.props.shareImagePath) return ''

    return `${this.state.host}${this.props.shareImagePath}`
  },

  title () {
    if (this.props.budgetItemName) return this.props.budgetItemName
    return this.props.siteName
  },

  render () {
    return <Meta
      title={this.title()}
      url={this.url()}
      shareImage={this.shareImage()}
      {...this.props}
    />
  }
})

const getShareImage = intl => {
  if (intl.locale === 'en') {
    return require('public/images/share_en.jpg')
  } else if (intl.locale === 'ka') {
    return require('public/images/share_ka.jpg')
  }
}

const mapStateToProps = (state, ownProps) => {
  const locationBeforeTransitions = (((state || {}).routing || {}).locationBeforeTransitions || {})
  const { intl } = ownProps

  return {
    budgetItemName: getBudgetItemName(state, getDetailsItemId(state)),
    siteName: intl.formatMessage(appMessages.name),
    pathname: locationBeforeTransitions.pathname,
    search: locationBeforeTransitions.search,
    shareImagePath: getShareImage(intl),
    description: intl.formatMessage(appMessages.description)
  }
}

module.exports = injectIntl(connect(mapStateToProps)(MetaContainer))
