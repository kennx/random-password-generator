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
    const _sortArr = _arr.shuttle();
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

  public generate(): string {
    this.setCharacterSets();
    this.setCharacterLength();
    const result = this.handleCharacterSets();
    return result;
  }

  private handleCharacterSets(): string {
    let result = '';
    let _str = '';
    let _first = '';
    const _sets = this.characterSets.filter((set) => set.active);
    _sets.map((set) => {
      _str = set.characters.shuttle().substring(0, set.size!);
      if (!set.first) {
        result += _str;
      } else {
        if (set.size && set.size > 1) {
          _first = _str.substring(0, 1);
          _str = _str.substring(1, _str.length);
        } else {
          _first = _str;
          _str = '';
        }
      }
    });
    _str = _str.shuttle();
    result += _str;
    return _first + result.shuttle();
  }

  private setCharacterLength() {
    const _sets = this.characterSets.filter((set) => set.active);
    const _average = Math.floor(this.config.length / _sets.length);
    const _resto = this.config.length % _sets.length;
    _sets.map((set) => (set.size = _average));
    if (!!_resto) {
      for (let i = _resto; i > 0; i--) {
        _sets[i].size! += 1;
      }
    }
  }

  private setCharacterSets() {
    this.characterSets = [];
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

export default PasswordGenerator;
