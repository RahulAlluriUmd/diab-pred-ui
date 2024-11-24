export class DialogData {
    title: string;
    message: string;
    closeButtonName: string;

    constructor(title: string,
        message: string,
        closeButtonName: string
    ) {
        this.title = title;
        this.message = message;
        this.closeButtonName = closeButtonName
    }
}