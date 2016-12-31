const React = require('react')
const { object, string } = React.PropTypes

const Helmet = require('react-helmet')
const MetaContainer = require('./components/MetaContainer')
const LocaleInitializer = require('./components/LocaleInitializer')
const Header = require('./components/Header/index')
const Footer = require('./components/Footer')

const Layout = React.createClass({
  propTypes: {
    locale: string,
    children: object
  },

  render () {
    return (
      <div className='gb-Layout'>
        <Helmet
          htmlAttributes={{'lang': this.props.locale}}
          title='Home'
          titleTemplate='%s | Georgian Budget'
        />
        <MetaContainer />
        <LocaleInitializer />

        <div>
          <Header />

          <main className='gb-Layout-mainContent'>
            {this.props.children}
          </main>
        </div>

        <Footer />
      </div>
    )
  }
})

module.exports = Layout
