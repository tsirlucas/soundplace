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
    const params = queryString.parse(route.location.hash);
    if (params['access_token']) {

      // TODO Ask Lucas for the exp time. Its ms, do the math.
      const expires = params['expires_in'] / (60 * 60 * 24);
      Cookie.set('token', params['access_token'], { secure, expires });
      window.location.reload();
    }
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
