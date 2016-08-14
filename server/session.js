import session from 'express-session';
export default session({
    secret: process.env.SECRET || 'kappa kappa'
});
