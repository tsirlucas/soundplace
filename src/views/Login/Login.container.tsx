import Cookie from 'js-cookie';
import {Component, h} from 'preact';
import queryString from 'query-string';

import {Button} from '../../components/Button';
import {SPOTIFY_AUTH} from '../../core/api/api.constants';

const secure = process.env.NODE_ENV === 'production';

export class Login extends Component<null, null> {
  componentWillMount() {
    const {route} = this.context.router;
    const params = queryString.parse(route.location.search);
    if (params['access_token']) {
      const expires = params['expires_in'] / (60 * 60 * 24);
      Cookie.set('token', params['access_token'], {secure, expires});
      window.location.reload();
    }
  }

  render() {
    return (
      <section className="section full-height" id="login">
        <Button href={SPOTIFY_AUTH} className="button-spotify">
          Conecte-se com Spotify
        </Button>
      </section>
    );
  }
}
