export interface Character {
  name: string;
  url: string;
  hair_color: string;
  eye_color: string;
  birth_year: string;
  homeworld: string;
  films: Array<string>;
  vehicles: Array<string>;
  starships: Array<string>;
}

export interface CharacterData extends Character {
  planet: string;
}
