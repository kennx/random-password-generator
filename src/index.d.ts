import { FIRST_CHARACTERS } from "./enum";

export interface IConfig {
  length: number;
  upper: boolean;
  lower: boolean;
  numeric: boolean;
  symbol: boolean;
  first: FIRST_CHARACTERS;
  size?: number;
}


export interface ICharacterSet {
  name: 'uppper' | 'lower' | 'numeric' | 'symbol';
  characters: string;
  active: boolean;
  first?: boolean;
  size?: number;
}
