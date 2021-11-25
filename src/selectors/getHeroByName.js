import { heroes } from "../data/heroes";

export const getHeroByName = (name = "") => {
  if (name.length === 0) {
    return [];
  }
  name = name.toLocaleLowerCase();

  return heroes.filter((hero) =>
    hero.superhero.toLocaleLowerCase().includes(name)
  );
};
