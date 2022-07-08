
export type NotificationErrorProps = {
    message: string,
    context: string
}

export default class Notification {
    private errorList: NotificationErrorProps[] = [];

    addError(error: NotificationErrorProps) {
        this.errorList.push(error);
    }

    messages(context?: string): string {

        return this.errorList
            .filter((error) => error.context === context || context === undefined)
            .map((error) => `${error.context}: ${error.message}`)
            .join(",")
    }

    hasErrors(): boolean {
        return this.errorList.length > 0;
    }

    get errors(): NotificationErrorProps[] {
        return this.errorList
    }
}