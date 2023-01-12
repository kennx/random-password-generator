import {
  LOWER_CHARACTERS,
  NUMERIC_CHARACTERS,
  SYMBOL_CHARACTERS,
  UPPER_CHARACTERS,
} from './character-sets';
import { IConfig, FIRST_CHARACTERS, ICharacterSet } from './types';

declare global {
  interface String {
    shuttle(): string;
  }
  interface Array<T> {
    shuttle(): Array<T>;
  }
}

Array.prototype.shuttle = function (): Array<any> {
  if (this.length > 1) {
    return this.sort(() => Math.random() - Math.random());
  }
  return this;
};

String.prototype.shuttle = function (): string {
  const _arr = this.split('');
  if (_arr.length > 0 && !!_arr.join('').trim()) {
    const _sortArr = _arr.sort(() => Math.random() - Math.random());
    return _sortArr.join('');
  }
  return _arr.join();
};

class PasswordGenerator {
  config: IConfig = {
    length: 12,
    upper: true,
    lower: true,
    numeric: true,
    symbol: true,
    first: FIRST_CHARACTERS.DEFAULT,
  };
  private characterSets: Array<ICharacterSet> = [];
  constructor(config?: IConfig) {
    if (config) {
      this.config = Object.assign(this.config, config);
    }
  }

  public generate() {
    this.setCharacterSets();
  }

  private setCharacterLength() {
    const _sets = this.characterSets.filter((set) => set.active);
    const _setsSize = _sets.length;
    const _length = this.config.length;
    const _avg = Math.floor(_length / _setsSize);
    _sets.map(set => set.size = _avg);
  }

  private setCharacterSets() {
    this.characterSets.push({
      name: 'uppper',
      characters: UPPER_CHARACTERS,
      active: this.config.upper,
      first: this.config.first === FIRST_CHARACTERS.UPPER,
    });
    this.characterSets.push({
      name: 'lower',
      characters: LOWER_CHARACTERS,
      active: this.config.lower,
      first: this.config.first === FIRST_CHARACTERS.LOWER,
    });
    this.characterSets.push({
      name: 'numeric',
      characters: NUMERIC_CHARACTERS,
      active: this.config.numeric,
      first: this.config.first === FIRST_CHARACTERS.NUMERIC,
    });
    this.characterSets.push({
      name: 'symbol',
      characters: SYMBOL_CHARACTERS,
      active: this.config.symbol,
      first: this.config.first === FIRST_CHARACTERS.SYMBOL,
    });
  }
}

const rpg = new PasswordGenerator();

export default PasswordGenerator;
