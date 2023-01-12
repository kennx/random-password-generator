export enum FIRST_CHARACTERS {
  DEFAULT = 'default',
  UPPER = 'upper',
  LOWER = 'lower',
  NUMERIC = 'numeric',
  SYMBOL = 'symbol',
}

export interface IConfig {
  length: number;
  upper: boolean;
  lower: boolean;
  numeric: boolean;
  symbol: boolean;
  first: FIRST_CHARACTERS;
}


export interface ICharacterSet {
  name: 'uppper' | 'lower' | 'numeric' | 'symbol';
  characters: string;
  active: boolean;
  first?: boolean;
  size?: number;
}
