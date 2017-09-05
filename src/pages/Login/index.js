import { h, Component } from 'preact';
import queryString from 'query-string';
import Cookies from 'js-cookie';

import Card from '../../components/Card';
import Button from '../../components/Button';
import { SPOTIFY_AUTH } from '../../core/api/api.constants';
import { browserHistory } from '../../routes/routes.config';

const secure = process.env.NODE_ENV === 'production';

export default class Login extends Component {

  componentWillMount() {
    const { route } = this.context.router;
    const params = queryString.parse(route.location.search);
    if (params.success) {

      // TODO Ask Lucas for the exp time
      Cookies.set('token', params['access_token'], { secure, expires: 30 });
      window.location.reload();
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
