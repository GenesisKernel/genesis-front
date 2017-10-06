import { Middleware } from 'redux';

const logger: Middleware = ({ getState }) => {
    return next => action => {
        //console.log('will dispatch', action);

        // Call the next dispatch method in the middleware chain.
        let returnValue = next(action);

        //console.log('state after dispatch', getState());

        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue;
    }
};

export default logger;