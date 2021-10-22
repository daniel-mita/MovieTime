import { useEffect, useState } from "react"

type fnSignature = (() => any) | (() => Promise<any>)

function isPromise(obj: any): obj is Promise<any> {
    return typeof obj === "object" && "then" in obj;
}
//custom hook for asyncronous calls adapted to typescript. includes the cleanup function
export const useEffectAsync = (fn: fnSignature, deps: any[] = []) => {
    const [error, setError] = useState<any>(null);
    useEffect(() => {
        let cleanup = () => { };
        try {
            const fnResult = fn();
            if (fnResult) {
                if (isPromise(fnResult)) {
                    fnResult.then(cb => {
                        cleanup = cb;
                    }).catch(err => {
                        setError(err);
                    });
                } else {
                    if (typeof fnResult === "function")
                        cleanup = fnResult;
                }
            }
        } catch (e) {
            setError(e);
        }

        return cleanup;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
    return {
        error
    }
}

export async function delay(ms: number) {
    return new Promise<void>((r) => setTimeout(r, ms));
}
