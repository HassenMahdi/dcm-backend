export class InterceptedHttpError extends Error {
    constructor() {
        super("Intercepted Error");
        // Set the prototype explicitly.
        // Object.setPrototypeOf(this, InterceptedHttpError.prototype);
    }
}