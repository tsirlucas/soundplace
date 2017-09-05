import { h, Component } from 'preact';
import queryString from 'query-string';
import Cookie from 'js-cookie';

import Card from '../../components/Card';
import Button from '../../components/Button';
import { SPOTIFY_AUTH } from '../../core/api/api.constants';

export default class Login extends Component {

  componentWillMount() {
    const { route } = this.context.router;
    const params = queryString.parse(route.location.search);
    if (params.success) {
      Cookie.set('token', params['access_token'], { secure: true, expires: params['exp'] });
    }
  }

  render(props, state) {
    return (
      <section className="section full-height" id="login">
        <Card>
          <Button
            href={SPOTIFY_AUTH}
            className="button-spotify">
            Conecte-se com Spotify
          </Button>
        </Card>
      </section>
    );
  }
}
