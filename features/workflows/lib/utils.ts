import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  type Config,
} from "unique-names-generator";

/**
 * Generates a random hyphenated slug composed of an adjective and an animal (e.g., "brave-otter").
 *
 * @param customConfig Optional configuration overrides for uniqueNamesGenerator.
 * @returns A hyphenated slug string.
 */
export function generateSlug(customConfig?: Partial<Config>): string {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: "-",
    style: "lowerCase",
    ...customConfig,
  });
}
