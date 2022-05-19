import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flagEmoji',
})
export class FlagEmojiPipe implements PipeTransform {
  transform(value: string | undefined, ...args: unknown[]): unknown {
    if (value) {
      const codePoints = value
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt(0));
      return String.fromCodePoint(...codePoints);
    }
    return value;
  }
}
