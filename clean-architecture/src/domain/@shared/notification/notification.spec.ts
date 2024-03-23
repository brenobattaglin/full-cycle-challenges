import Notification from './notification';

describe('unit tests for notification', () => {
    it('should create errors', () => {
        const notification = new Notification();
        const error = {
            message: 'error message',
            context: 'customer'
        };
        notification.addError(error);
        expect(notification.messages('customer')).toBe('customer: error message, ');

        const error2 = {
            message: 'error2',
            context: 'customer'
        };

        notification.addError(error2);
        expect(notification.messages('customer')).toBe('customer: error message, customer: error2, ');

        const error3 = {
            message: 'error3',
            context: 'order'
        };

        notification.addError(error3);
        expect(notification.messages('customer')).toBe('customer: error message, customer: error2, ');
        expect(notification.messages()).toBe('customer: error message, customer: error2, order: error3, ');
    });

    it('should check if notifications has at least one error', () => {
        const notification = new Notification();
        const error = {
            message: 'error message',
            context: 'customer'
        };
        notification.addError(error);

        expect(notification.hasErrors()).toBe(true);
    });

    it('should get all errors props', () => {
        const notification = new Notification();
        const error = {
            message: 'error message',
            context: 'customer'
        };
        notification.addError(error);
        expect(notification.getErrors()).toEqual([error]);
    });
});