import { Router } from 'express';
import { buySubscription, cancelSubscription, getAllPayments, getRazorpayApiKey, verifySubscription } from '../controllers/payment.controller';


const router = Router();

router
    .route('/razorpay-key')
    .get(isLoggedIn, authorizeRoles('ADMIN'), getRazorpayApiKey);

router
    .route('/subscribe')
    .post(isLoggedIn, buySubscription);

router
    .route('/verify-subscription')
    .post(isLoggedIn, verifySubscription);

router
    .route('/unsubscribe')
    .post(isLoggedIn, cancelSubscription);

router
    .route('/')
    .get(isLoggedIn, authorizeRoles('ADMIN'), getAllPayments);

export default router;







