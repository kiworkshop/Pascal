export function deepcopy(o) {
    return JSON.parse(JSON.stringify(o));
}