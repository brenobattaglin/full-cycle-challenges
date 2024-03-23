export type NotificationErrorProps = {
    message: string;
    context: string;
};

export default class Notification {
    private errors: NotificationErrorProps[] = [];

    addError(error: NotificationErrorProps) {
        this.errors.push(error);
    }

    messages(context?: string): string {
        let messages = "";
        this.errors.forEach((error) => {
            if (context === undefined || error.context === context) {
                messages += `${error.context}: ${error.message}, `;
            }
        });
        return messages;
    }

    hasErrors(): boolean {
        return this.errors.length > 0;
    }

    getErrors(): NotificationErrorProps[] {
        return this.errors;
    }
}
