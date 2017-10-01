import Cookie from 'js-cookie';
import { h, Component } from 'preact';
import queryString from 'query-string';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import Button from '../../components/Button';
import { SPOTIFY_AUTH } from '../../core/api/api.constants';
import { importUserData } from '../../core/user/user.actions';

const secure = process.env.NODE_ENV === 'production';


function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ importUserData }, dispatch) };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends Component {

  componentWillMount() {
    const { route } = this.context.router;
    const params = queryString.parse(route.location.search);
    if (params.success) {

      // TODO Ask Lucas for the exp time. Its ms, do the math.
      Cookie.set('token', params['access_token'], { secure, expires: 30 });
      this.props.actions.importUserData('/');
    }
  }

  componentDidMount() {
    document.querySelector('.button-spotify').onclick = function (e) {
      if (e) e.preventDefault();
      window.location = this.getAttribute("href");
      return false;
    };
  }

  render(props, state) {
    return (
      <section className="section full-height" id="login">
        <Button
          href={SPOTIFY_AUTH}
          className="button-spotify">
          Conecte-se com Spotify
        </Button>
      </section>
    );
  }
}
