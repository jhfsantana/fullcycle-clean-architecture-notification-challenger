import Notification from "./notification";

describe('Unit tests for notifications', () => {


    it('should create errors', () => {

        const notification = new Notification();

        const error = {
            message: 'Error message',
            context: 'customer'
        };

        notification.addError(error);

        expect(notification.messages('customer')).toBe('customer: Error message');


        const error2 = {
            message: 'Error message (2)',
            context: 'customer'
        };

        notification.addError(error2);

        expect(notification.messages('customer')).toBe('customer: Error message,customer: Error message (2)');

        const error3 = {
            message: 'Error message (3)',
            context: 'product'
        };

        notification.addError(error3);

        expect(notification.messages('customer')).toBe('customer: Error message,customer: Error message (2)');

        expect(notification.messages()).toBe('customer: Error message,customer: Error message (2),product: Error message (3)');
    });

    it('should check if notificatio has error', () => {

        const notification = new Notification();

        const error = {
            message: 'Error message (3)',
            context: 'product'
        };

        notification.addError(error);

        expect(notification.hasErrors()).toBe(true);
    });
});