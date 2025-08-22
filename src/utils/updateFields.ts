export function updateFields<T extends object>(original: T, update: Partial<T>){
    for (const [key, value] of Object.entries(original)){
        if (value !== undefined && value !== null){
            (update as any)[key] = value
        }
    } 
}