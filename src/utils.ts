export function isValidSearchInput(input: string): boolean {
  if (input.match(/[0-9$&+:;=?@#|<>^*()%!~[\]{}\\/]/) || !input) return false;
  else return true;
}
