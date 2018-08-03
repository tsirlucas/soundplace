import Cookie from 'js-cookie';
import {Component, h} from 'preact';
import queryString from 'query-string';

import {Button} from '../../components/Button';
import {YOUTUBE_AUTH} from '../../core/api/api.constants';

const secure = process.env.NODE_ENV === 'production';

export class Login extends Component<null, null> {
  componentWillMount() {
    const {route} = this.context.router;
    const params = queryString.parse(route.location.search);

    if (!!params['token']) {
      const expires = 100 * 365 * 24 * 60 * 60;
      Cookie.set('token', params['token'], {secure, expires});
      window.location.reload();
    }
  }

  render() {
    return (
      <section className="section full-height" id="login">
        <Button href={YOUTUBE_AUTH} className="button-youtube">
          Conecte-se com Youtube
        </Button>
      </section>
    );
  }
}
