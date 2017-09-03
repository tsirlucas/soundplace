import { h, Component } from 'preact';
import queryString from 'query-string';

import Card from '../../components/Card';
import Button from '../../components/Button';
import { SPOTIFY_AUTH } from '../../core/api/api.constants';

export default class Login extends Component {

  componentWillMount() {
    const {route} = this.context.router;
    const params = queryString.parse(route.location.search);
    console.log(params);
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
