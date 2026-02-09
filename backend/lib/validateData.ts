export function isValidItem(obj:Object){
  return obj && typeof obj === 'object' && 'id' in obj && 'name' in obj;
}