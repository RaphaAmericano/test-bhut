import { ZodError } from "zod";
function formatErrorString(error: ZodError): string{
    return error.issues.map((issue) => {
        return `${issue.path.join('.')}: ${issue.message}`;
    }).join('. ');
}

export {
    formatErrorString
}
