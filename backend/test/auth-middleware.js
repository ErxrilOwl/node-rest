const { expect } = require('chai');
const authMiddleware = require('../middleware/auth');

describe('Auth Middleware', function() {
    it('should set isAuth to false if no authorization header is present', function() {
        const req = {
            get: function(headerName) {
                return null;
            }
        };
        
        authMiddleware(req, {}, () => {});
        
        expect(req).to.have.property('isAuth', false);
    });

    it('should set isAuth to false if the token cannot be verified', function() {
        const req = {
            get: function(headerName) {
                return 'Bearer xyz';
            }
        };
        
        authMiddleware(req, {}, () => {});
        
        expect(req).to.have.property('isAuth', false);
    });
});