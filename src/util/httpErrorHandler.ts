import {Observable} from 'rxjs';

const httpErrorHandler = (error, handler) =>
  Observable.concat(Observable.of(handler()), Observable.throw(error));

export default httpErrorHandler;
