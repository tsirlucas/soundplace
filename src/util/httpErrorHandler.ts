import {concat, of, throwError} from 'rxjs';

const httpErrorHandler = (error, handler) => concat(of(handler()), throwError(error));

export default httpErrorHandler;
