import express from 'express';
import Validateusers from '../Middleware/validateUsers';
import Usercontroller from '../Controllers/users';
import Propertycontroller from '../Controllers/properties';
import Auth from '../Middleware/Authenticate';
import ValidateProperties from '../Middleware/validateProperties';

const router = express.Router();

router.post('/api/v1/auth/signup', Validateusers.signUpDetails, Validateusers.signUpValidation, Usercontroller.signUp);
router.post('/api/v1/auth/signin', Validateusers.signIn, Usercontroller.signIn);

router.post('/api/v1property', Auth.verifyToken, ValidateProperties.postProperty, Propertycontroller.postProperty);
router.patch('/api/v1/property/:property_id', Auth.verifyToken, ValidateProperties.updateProperty, Propertycontroller.updateProperty);

router.patch('/api/v1/property/:property_id/sold', Auth.verifyToken, Propertycontroller.markPropertySold);
router.delete('/api/v1/property/:property_id', Auth.verifyToken, Propertycontroller.deleteProperty);
router.get('/api/v1/property', Auth.verifyToken, Propertycontroller.getAllProperty);
router.get('/api/v1/property/:property_id', Auth.verifyToken, ValidateProperties.getAProperty, Propertycontroller.getAProperty);

export default router;
