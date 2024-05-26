
export default class ApplicationError extends Error{

    constructor(message,errCode)
    {
        super(message);
        this.errorCode=errCode;
    }

}