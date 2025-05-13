export function sleep(delayInMs: number) {
    return new Promise(resolve => setTimeout(resolve, delayInMs));
}
