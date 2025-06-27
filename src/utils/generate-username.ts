import { faker } from '@faker-js/faker';

function getSeedFromString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function generateUsername(email: string) {
  faker.seed(getSeedFromString(email));
  return faker.internet.username();
}
