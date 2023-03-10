import {
  LOWER_CHARACTERS,
  NUMERIC_CHARACTERS,
  SYMBOL_CHARACTERS,
  UPPER_CHARACTERS,
} from './character-sets';
import { FIRST_CHARACTERS } from './enum';
import { IConfig, ICharacterSet } from './index.d';

class PasswordGenerator {
  config: IConfig = {
    length: 12,
    upper: true,
    lower: true,
    numeric: true,
    symbol: true,
    first: FIRST_CHARACTERS.DEFAULT,
    size: 1,
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
    return this.handleCharacterSets();
  }

  private handleCharacterSets(): string {
    let result = '';
    let _str = '';
    let _first = '';
    const _sets = this.characterSets.filter((set) => set.active);
    _sets.map((set) => {
      _str = this.shuttleString(set.characters).substring(0, set.size!);
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
    _str = this.shuttleString(_str);
    result += _str;
    return _first + this.shuttleString(result);
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

  _shuttle = (array: Array<string>) => {
    return array.sort(() => Math.random() - Math.random());
  };

  private shuttleArray(array: Array<any>): Array<any> {
    if (array.length > 1) {
      return array.sort(() => Math.random() - Math.random());
    }
    return array;
  }

  private shuttleString(characters: string): string {
    if (characters && characters.length > 1) {
      const _array = characters.split('');
      return this.shuttleArray(_array).join('');
    }
    return characters;
  }
}

export default PasswordGenerator;
