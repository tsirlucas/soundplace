import {h} from 'preact';

import {Button} from '../../components/Button';
import {YOUTUBE_AUTH} from '../../core/api/api.constants';

export const Login = () => (
  <section className="section full-height" id="login">
    <Button href={YOUTUBE_AUTH} className="button-youtube">
      Conecte-se com Youtube
    </Button>
  </section>
);
