import {
  __yieldStar
} from "./chunk-E7DWTVYE.js";

// node_modules/.pnpm/@decimalturn+toml-patch@0.5.2/node_modules/@decimalturn/toml-patch/dist/toml-patch.es.js
var NodeType;
(function(NodeType2) {
  NodeType2["Document"] = "Document";
  NodeType2["Table"] = "Table";
  NodeType2["TableKey"] = "TableKey";
  NodeType2["TableArray"] = "TableArray";
  NodeType2["TableArrayKey"] = "TableArrayKey";
  NodeType2["KeyValue"] = "KeyValue";
  NodeType2["Key"] = "Key";
  NodeType2["String"] = "String";
  NodeType2["Integer"] = "Integer";
  NodeType2["Float"] = "Float";
  NodeType2["Boolean"] = "Boolean";
  NodeType2["DateTime"] = "DateTime";
  NodeType2["InlineArray"] = "InlineArray";
  NodeType2["InlineItem"] = "InlineItem";
  NodeType2["InlineTable"] = "InlineTable";
  NodeType2["Comment"] = "Comment";
})(NodeType || (NodeType = {}));
function isDocument(node) {
  return node.type === NodeType.Document;
}
function isTable(node) {
  return node.type === NodeType.Table;
}
function isTableKey(node) {
  return node.type === NodeType.TableKey;
}
function isTableArray(node) {
  return node.type === NodeType.TableArray;
}
function isTableArrayKey(node) {
  return node.type === NodeType.TableArrayKey;
}
function isKeyValue(node) {
  return node.type === NodeType.KeyValue;
}
function isString$1(node) {
  return node.type === NodeType.String;
}
function isDateTime(node) {
  return node.type === NodeType.DateTime;
}
function isInlineArray(node) {
  return node.type === NodeType.InlineArray;
}
function isInlineItem(node) {
  return node.type === NodeType.InlineItem;
}
function isInlineTable(node) {
  return node.type === NodeType.InlineTable;
}
function isComment(node) {
  return node.type === NodeType.Comment;
}
function hasItems(node) {
  return isDocument(node) || isTable(node) || isTableArray(node) || isInlineTable(node) || isInlineArray(node);
}
function hasItem(node) {
  return isTableKey(node) || isTableArrayKey(node) || isInlineItem(node);
}
function isBlock(node) {
  return isKeyValue(node) || isTable(node) || isTableArray(node) || isComment(node);
}
function iterator(value) {
  return value[Symbol.iterator]();
}
var Cursor = class {
  constructor(iterator2) {
    this.iterator = iterator2;
    this.index = -1;
    this.value = void 0;
    this.done = false;
    this.peeked = null;
  }
  next() {
    var _a;
    if (this.done)
      return done();
    const result = this.peeked || this.iterator.next();
    this.index += 1;
    this.value = result.value;
    this.done = (_a = result.done) !== null && _a !== void 0 ? _a : false;
    this.peeked = null;
    return result;
  }
  peek() {
    if (this.done)
      return done();
    if (this.peeked)
      return this.peeked;
    this.peeked = this.iterator.next();
    return this.peeked;
  }
  [Symbol.iterator]() {
    return this;
  }
};
function done() {
  return { value: void 0, done: true };
}
function getSpan(location) {
  return {
    lines: location.end.line - location.start.line + 1,
    columns: location.end.column - location.start.column
  };
}
function createLocate(input) {
  const lines = findLines(input);
  return (start, end) => {
    return {
      start: findPosition(lines, start),
      end: findPosition(lines, end)
    };
  };
}
function findPosition(input, index) {
  const lines = Array.isArray(input) ? input : findLines(input);
  const line = lines.findIndex((line_index) => line_index >= index) + 1;
  const column = index - (lines[line - 2] + 1 || 0);
  return { line, column };
}
function getLine$1(input, position) {
  const lines = findLines(input);
  const start = lines[position.line - 2] || 0;
  const end = lines[position.line - 1] || input.length;
  return input.substr(start, end - start);
}
function findLines(input) {
  const BY_NEW_LINE2 = /\r\n|\n/g;
  const indexes = [];
  let match;
  while ((match = BY_NEW_LINE2.exec(input)) != null) {
    indexes.push(match.index + match[0].length - 1);
  }
  indexes.push(input.length + 1);
  return indexes;
}
function clonePosition(position) {
  return { line: position.line, column: position.column };
}
function cloneLocation(location) {
  return { start: clonePosition(location.start), end: clonePosition(location.end) };
}
function zero() {
  return { line: 1, column: 0 };
}
var ParseError = class extends Error {
  constructor(input, position, message) {
    let error_message = `Error parsing TOML (${position.line}, ${position.column + 1}):
`;
    if (input) {
      const line = getLine$1(input, position);
      const pointer = `${whitespace(position.column)}^`;
      if (line)
        error_message += `${line}
${pointer}
`;
    }
    error_message += message;
    super(error_message);
    this.line = position.line;
    this.column = position.column;
  }
};
function whitespace(count, character = " ") {
  return character.repeat(count);
}
var TokenType;
(function(TokenType2) {
  TokenType2["Bracket"] = "Bracket";
  TokenType2["Curly"] = "Curly";
  TokenType2["Equal"] = "Equal";
  TokenType2["Comma"] = "Comma";
  TokenType2["Dot"] = "Dot";
  TokenType2["Comment"] = "Comment";
  TokenType2["Literal"] = "Literal";
})(TokenType || (TokenType = {}));
var IS_WHITESPACE = /\s/;
var IS_NEW_LINE = /(\r\n|\n)/;
var DOUBLE_QUOTE = `"`;
var SINGLE_QUOTE = `'`;
var SPACE = " ";
var ESCAPE = "\\";
var IS_VALID_LEADING_CHARACTER = /[\w,\d,\",\',\+,\-,\_]/;
function* tokenize(input) {
  const cursor = new Cursor(iterator(input));
  cursor.next();
  const locate = createLocate(input);
  while (!cursor.done) {
    if (IS_WHITESPACE.test(cursor.value)) ;
    else if (cursor.value === "[" || cursor.value === "]") {
      yield specialCharacter(cursor, locate, TokenType.Bracket);
    } else if (cursor.value === "{" || cursor.value === "}") {
      yield specialCharacter(cursor, locate, TokenType.Curly);
    } else if (cursor.value === "=") {
      yield specialCharacter(cursor, locate, TokenType.Equal);
    } else if (cursor.value === ",") {
      yield specialCharacter(cursor, locate, TokenType.Comma);
    } else if (cursor.value === ".") {
      yield specialCharacter(cursor, locate, TokenType.Dot);
    } else if (cursor.value === "#") {
      yield comment$1(cursor, locate);
    } else {
      const multiline_char = checkThree(input, cursor.index, SINGLE_QUOTE) || checkThree(input, cursor.index, DOUBLE_QUOTE);
      if (multiline_char) {
        yield multiline(cursor, locate, multiline_char, input);
      } else {
        yield string$1(cursor, locate, input);
      }
    }
    cursor.next();
  }
}
function specialCharacter(cursor, locate, type) {
  return { type, raw: cursor.value, loc: locate(cursor.index, cursor.index + 1) };
}
function comment$1(cursor, locate) {
  const start = cursor.index;
  let raw = cursor.value;
  while (!cursor.peek().done && !IS_NEW_LINE.test(cursor.peek().value)) {
    cursor.next();
    raw += cursor.value;
  }
  return {
    type: TokenType.Comment,
    raw,
    loc: locate(start, cursor.index + 1)
  };
}
function multiline(cursor, locate, multiline_char, input) {
  const start = cursor.index;
  let quotes = multiline_char + multiline_char + multiline_char;
  let raw = quotes;
  cursor.next();
  cursor.next();
  cursor.next();
  while (!cursor.done && (!checkThree(input, cursor.index, multiline_char) || CheckMoreThanThree(input, cursor.index, multiline_char))) {
    raw += cursor.value;
    cursor.next();
  }
  if (cursor.done) {
    throw new ParseError(input, findPosition(input, cursor.index), `Expected close of multiline string with ${quotes}, reached end of file`);
  }
  raw += quotes;
  cursor.next();
  cursor.next();
  return {
    type: TokenType.Literal,
    raw,
    loc: locate(start, cursor.index + 1)
  };
}
function string$1(cursor, locate, input) {
  if (!IS_VALID_LEADING_CHARACTER.test(cursor.value)) {
    throw new ParseError(input, findPosition(input, cursor.index), `Unsupported character "${cursor.value}". Expected ALPHANUMERIC, ", ', +, -, or _`);
  }
  const start = cursor.index;
  let raw = cursor.value;
  let double_quoted = cursor.value === DOUBLE_QUOTE;
  let single_quoted = cursor.value === SINGLE_QUOTE;
  const isFinished = (cursor2) => {
    if (cursor2.peek().done)
      return true;
    const next_item = cursor2.peek().value;
    return !(double_quoted || single_quoted) && (IS_WHITESPACE.test(next_item) || next_item === "," || next_item === "." || next_item === "]" || next_item === "}" || next_item === "=" || next_item === "#");
  };
  while (!cursor.done && !isFinished(cursor)) {
    cursor.next();
    if (cursor.value === DOUBLE_QUOTE)
      double_quoted = !double_quoted;
    if (cursor.value === SINGLE_QUOTE && !double_quoted)
      single_quoted = !single_quoted;
    raw += cursor.value;
    if (cursor.peek().done)
      break;
    let next_item = cursor.peek().value;
    if (double_quoted && cursor.value === ESCAPE) {
      if (next_item === DOUBLE_QUOTE) {
        raw += DOUBLE_QUOTE;
        cursor.next();
      } else if (next_item === ESCAPE) {
        raw += ESCAPE;
        cursor.next();
      }
    }
  }
  if (double_quoted || single_quoted) {
    throw new ParseError(input, findPosition(input, start), `Expected close of string with ${double_quoted ? DOUBLE_QUOTE : SINGLE_QUOTE}`);
  }
  return {
    type: TokenType.Literal,
    raw,
    loc: locate(start, cursor.index + 1)
  };
}
function checkThree(input, current, check) {
  if (!check) {
    return false;
  }
  const has3 = input[current] === check && input[current + 1] === check && input[current + 2] === check;
  if (!has3) {
    return false;
  }
  const precedingText = input.slice(0, current);
  const backslashes = precedingText.match(/\\+$/);
  if (!backslashes) {
    return check;
  }
  const isEscaped = backslashes[0].length % 2 !== 0;
  return isEscaped ? false : check;
}
function CheckMoreThanThree(input, current, check) {
  if (!check) {
    return false;
  }
  return input[current] === check && input[current + 1] === check && input[current + 2] === check && input[current + 3] === check;
}
function last(values) {
  return values[values.length - 1];
}
function blank() {
  return /* @__PURE__ */ Object.create(null);
}
function isString(value) {
  return typeof value === "string";
}
function isInteger(value) {
  return typeof value === "number" && value % 1 === 0 && isFinite(value) && !Object.is(value, -0);
}
function isFloat(value) {
  return typeof value === "number" && (!isInteger(value) || !isFinite(value) || Object.is(value, -0));
}
function isBoolean(value) {
  return typeof value === "boolean";
}
function isDate(value) {
  return Object.prototype.toString.call(value) === "[object Date]";
}
function isObject(value) {
  return value && typeof value === "object" && !isDate(value) && !Array.isArray(value);
}
function isIterable(value) {
  return value != null && typeof value[Symbol.iterator] === "function";
}
function has(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}
function arraysEqual(a, b) {
  if (a.length !== b.length)
    return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i])
      return false;
  }
  return true;
}
function datesEqual(a, b) {
  return isDate(a) && isDate(b) && a.toISOString() === b.toISOString();
}
function pipe(value, ...fns) {
  return fns.reduce((value2, fn) => fn(value2), value);
}
function stableStringify(object) {
  if (isObject(object)) {
    const key_values = Object.keys(object).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(object[key])}`);
    return `{${key_values.join(",")}}`;
  } else if (Array.isArray(object)) {
    return `[${object.map(stableStringify).join(",")}]`;
  } else {
    return JSON.stringify(object);
  }
}
function merge(target, values) {
  const original_length = target.length;
  const added_length = values.length;
  target.length = original_length + added_length;
  for (let i = 0; i < added_length; i++) {
    target[original_length + i] = values[i];
  }
}
function isMultilineString(raw) {
  return raw.startsWith('"""') || raw.startsWith("'''");
}
var TRIPLE_DOUBLE_QUOTE = `"""`;
var TRIPLE_SINGLE_QUOTE = `'''`;
var LF = "\\n";
var CRLF = "\\r\\n";
var IS_CRLF = /\r\n/g;
var IS_LF = /\n/g;
var IS_LEADING_NEW_LINE = /^(\r\n|\n)/;
var IS_LINE_ENDING_BACKSLASH = new RegExp("(?<!\\\\)(?:\\\\\\\\)*(\\\\\\s*[\\n\\r\\n]\\s*)", "g");
function parseString(raw) {
  if (raw.startsWith(TRIPLE_SINGLE_QUOTE)) {
    return pipe(trim(raw, 3), trimLeadingWhitespace);
  } else if (raw.startsWith(SINGLE_QUOTE)) {
    return trim(raw, 1);
  } else if (raw.startsWith(TRIPLE_DOUBLE_QUOTE)) {
    return pipe(trim(raw, 3), trimLeadingWhitespace, lineEndingBackslash, escapeNewLines, escapeDoubleQuotes, unescapeLargeUnicode);
  } else if (raw.startsWith(DOUBLE_QUOTE)) {
    return pipe(trim(raw, 1), unescapeLargeUnicode);
  } else {
    return raw;
  }
}
function escapeDoubleQuotes(value) {
  let result = "";
  let precedingBackslashes = 0;
  for (let i = 0; i < value.length; i++) {
    const char = value[i];
    if (char === '"' && precedingBackslashes % 2 === 0) {
      result += '\\"';
    } else {
      result += char;
    }
    if (char === "\\") {
      precedingBackslashes++;
    } else {
      precedingBackslashes = 0;
    }
  }
  return result;
}
function unescapeLargeUnicode(escaped) {
  const LARGE_UNICODE = /\\U[a-fA-F0-9]{8}/g;
  const json_escaped = escaped.replace(LARGE_UNICODE, (value) => {
    const code_point = parseInt(value.replace("\\U", ""), 16);
    const as_string = String.fromCodePoint(code_point);
    return trim(JSON.stringify(as_string), 1);
  });
  const fixed_json_escaped = escapeTabsForJSON(json_escaped);
  const parsed = JSON.parse(`"${fixed_json_escaped}"`);
  return parsed;
}
function escapeTabsForJSON(value) {
  return value.replace(/\t/g, "\\t");
}
function trim(value, count) {
  return value.slice(count, value.length - count);
}
function trimLeadingWhitespace(value) {
  return value.replace(IS_LEADING_NEW_LINE, "");
}
function escapeNewLines(value) {
  return value.replace(IS_CRLF, CRLF).replace(IS_LF, LF);
}
function lineEndingBackslash(value) {
  return value.replace(IS_LINE_ENDING_BACKSLASH, (match, group) => match.replace(group, ""));
}
var DateFormatHelper = class _DateFormatHelper {
  /**
   * Creates a custom date/time object that preserves the original TOML date/time format.
   *
   * This method detects the TOML date/time format from the raw string and returns an appropriate
   * custom date/time instance (e.g., LocalDate, LocalTime, LocalDateTime, OffsetDateTime) or a Date,
   * using the provided new JavaScript Date value.
   *
   * @param {Date} newJSDate - The new JavaScript Date object representing the updated
   * date/time value. This is used as the source for constructing the custom date/time object.
   * In some cases, this may be a custom date/time object (e.g., LocalTime) instead of a native Date.
   * @param {string} originalRaw - The original TOML date/time string as it appeared in the input.
   * Used to detect the specific TOML date/time format and to extract formatting details (e.g., separator, offset).
   *
   * @returns {Date | LocalDate | LocalTime | LocalDateTime | OffsetDateTime}
   * Returns a custom date/time object that matches the original TOML format:
   * - LocalDate for date-only values (e.g., "2024-01-15")
   * - LocalTime for time-only values (e.g., "10:30:00")
   * - LocalDateTime for local datetimes (e.g., "2024-01-15T10:30:00" or "2024-01-15 10:30:00")
   * - OffsetDateTime for datetimes with offsets (e.g., "2024-01-15T10:30:00+02:00")
   * - Date (native JS Date) as a fallback if the format is unrecognized
   *
   * Format-specific behavior:
   * - Date-only: Returns a LocalDate constructed from the date part of newJSDate.
   * - Time-only: Returns a LocalTime, either from newJSDate (if already LocalTime) or constructed from its time part.
   * - Local datetime: Returns a LocalDateTime, preserving the separator (T or space).
   * - Offset datetime: Returns an OffsetDateTime, reconstructing the date/time with the original offset and separator.
   * - Fallback: Returns newJSDate as-is.
   */
  static createDateWithOriginalFormat(newJSDate, originalRaw) {
    if (_DateFormatHelper.IS_DATE_ONLY.test(originalRaw)) {
      if (newJSDate.getUTCHours() !== 0 || newJSDate.getUTCMinutes() !== 0 || newJSDate.getUTCSeconds() !== 0 || newJSDate.getUTCMilliseconds() !== 0) {
        if (newJSDate instanceof OffsetDateTime) {
          return newJSDate;
        }
        let isoString = newJSDate.toISOString().replace("Z", "");
        isoString = isoString.replace(/\.000$/, "");
        return new LocalDateTime(isoString, false);
      }
      const dateStr = newJSDate.toISOString().split("T")[0];
      return new LocalDate(dateStr);
    } else if (_DateFormatHelper.IS_TIME_ONLY.test(originalRaw)) {
      if (newJSDate instanceof LocalTime) {
        return newJSDate;
      } else {
        const msMatch = originalRaw.match(/\.(\d+)\s*$/);
        const isoString = newJSDate.toISOString();
        if (isoString && isoString.includes("T")) {
          let newTime = isoString.split("T")[1].split("Z")[0];
          if (msMatch) {
            const msDigits = msMatch[1].length;
            const [h, m, sMs] = newTime.split(":");
            const [s] = sMs.split(".");
            const ms = String(newJSDate.getUTCMilliseconds()).padStart(3, "0").slice(0, msDigits);
            newTime = `${h}:${m}:${s}.${ms}`;
          }
          return new LocalTime(newTime, originalRaw);
        } else {
          const hours = String(newJSDate.getUTCHours()).padStart(2, "0");
          const minutes = String(newJSDate.getUTCMinutes()).padStart(2, "0");
          const seconds = String(newJSDate.getUTCSeconds()).padStart(2, "0");
          const milliseconds = newJSDate.getUTCMilliseconds();
          let timeStr;
          if (msMatch) {
            const msDigits = msMatch[1].length;
            let ms = String(milliseconds).padStart(3, "0").slice(0, msDigits);
            timeStr = `${hours}:${minutes}:${seconds}.${ms}`;
          } else if (milliseconds > 0) {
            const ms = String(milliseconds).padStart(3, "0").replace(/0+$/, "");
            timeStr = `${hours}:${minutes}:${seconds}.${ms}`;
          } else {
            timeStr = `${hours}:${minutes}:${seconds}`;
          }
          return new LocalTime(timeStr, originalRaw);
        }
      }
    } else if (_DateFormatHelper.IS_LOCAL_DATETIME_T.test(originalRaw)) {
      const msMatch = originalRaw.match(/\.(\d+)\s*$/);
      let isoString = newJSDate.toISOString().replace("Z", "");
      if (msMatch) {
        const msDigits = msMatch[1].length;
        const [datePart, timePart] = isoString.split("T");
        const [h, m, sMs] = timePart.split(":");
        const [s] = sMs.split(".");
        const ms = String(newJSDate.getUTCMilliseconds()).padStart(3, "0").slice(0, msDigits);
        isoString = `${datePart}T${h}:${m}:${s}.${ms}`;
      }
      return new LocalDateTime(isoString, false, originalRaw);
    } else if (_DateFormatHelper.IS_LOCAL_DATETIME_SPACE.test(originalRaw)) {
      const msMatch = originalRaw.match(/\.(\d+)\s*$/);
      let isoString = newJSDate.toISOString().replace("Z", "").replace("T", " ");
      if (msMatch) {
        const msDigits = msMatch[1].length;
        const [datePart, timePart] = isoString.split(" ");
        const [h, m, sMs] = timePart.split(":");
        const [s] = sMs.split(".");
        const ms = String(newJSDate.getUTCMilliseconds()).padStart(3, "0").slice(0, msDigits);
        isoString = `${datePart} ${h}:${m}:${s}.${ms}`;
      }
      return new LocalDateTime(isoString, true, originalRaw);
    } else if (_DateFormatHelper.IS_OFFSET_DATETIME_T.test(originalRaw) || _DateFormatHelper.IS_OFFSET_DATETIME_SPACE.test(originalRaw)) {
      const offsetMatch = originalRaw.match(/([+-]\d{2}:\d{2}|[Zz])$/);
      const originalOffset = offsetMatch ? offsetMatch[1] === "z" ? "Z" : offsetMatch[1] : "Z";
      const useSpaceSeparator = _DateFormatHelper.IS_OFFSET_DATETIME_SPACE.test(originalRaw);
      const msMatch = originalRaw.match(/\.(\d+)(?:[Zz]|[+-]\d{2}:\d{2})\s*$/);
      const utcTime = newJSDate.getTime();
      let offsetMinutes = 0;
      if (originalOffset !== "Z") {
        const sign = originalOffset[0] === "+" ? 1 : -1;
        const [hours2, minutes2] = originalOffset.slice(1).split(":");
        offsetMinutes = sign * (parseInt(hours2) * 60 + parseInt(minutes2));
      }
      const localTime = new Date(utcTime + offsetMinutes * 6e4);
      const year = localTime.getUTCFullYear();
      const month = String(localTime.getUTCMonth() + 1).padStart(2, "0");
      const day = String(localTime.getUTCDate()).padStart(2, "0");
      const hours = String(localTime.getUTCHours()).padStart(2, "0");
      const minutes = String(localTime.getUTCMinutes()).padStart(2, "0");
      const seconds = String(localTime.getUTCSeconds()).padStart(2, "0");
      const milliseconds = localTime.getUTCMilliseconds();
      const separator = useSpaceSeparator ? " " : "T";
      let timePart = `${hours}:${minutes}:${seconds}`;
      if (msMatch) {
        const msDigits = msMatch[1].length;
        const ms = String(milliseconds).padStart(3, "0").slice(0, msDigits);
        timePart += `.${ms}`;
      } else if (milliseconds > 0) {
        const ms = String(milliseconds).padStart(3, "0").replace(/0+$/, "");
        timePart += `.${ms}`;
      }
      const newDateTimeString = `${year}-${month}-${day}${separator}${timePart}${originalOffset}`;
      return new OffsetDateTime(newDateTimeString, useSpaceSeparator);
    } else {
      return newJSDate;
    }
  }
};
DateFormatHelper.IS_DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
DateFormatHelper.IS_TIME_ONLY = /^\d{2}:\d{2}:\d{2}(?:\.\d+)?$/;
DateFormatHelper.IS_LOCAL_DATETIME_T = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?$/;
DateFormatHelper.IS_LOCAL_DATETIME_SPACE = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:\.\d+)?$/;
DateFormatHelper.IS_OFFSET_DATETIME_T = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:[Zz]|[+-]\d{2}:\d{2})$/;
DateFormatHelper.IS_OFFSET_DATETIME_SPACE = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:\.\d+)?(?:[Zz]|[+-]\d{2}:\d{2})$/;
DateFormatHelper.IS_FULL_DATE = /(\d{4})-(\d{2})-(\d{2})/;
DateFormatHelper.IS_FULL_TIME = /(\d{2}):(\d{2}):(\d{2})/;
var LocalDate = class extends Date {
  constructor(value) {
    super(value);
  }
  toISOString() {
    const year = this.getUTCFullYear();
    const month = String(this.getUTCMonth() + 1).padStart(2, "0");
    const day = String(this.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
};
var LocalTime = class extends Date {
  constructor(value, originalFormat) {
    super(`1970-01-01T${value}Z`);
    this.originalFormat = originalFormat;
  }
  toISOString() {
    const hours = String(this.getUTCHours()).padStart(2, "0");
    const minutes = String(this.getUTCMinutes()).padStart(2, "0");
    const seconds = String(this.getUTCSeconds()).padStart(2, "0");
    const milliseconds = this.getUTCMilliseconds();
    const originalHadMs = this.originalFormat && this.originalFormat.includes(".");
    if (originalHadMs) {
      const msMatch = this.originalFormat.match(/\.(\d+)\s*$/);
      const msDigits = msMatch ? msMatch[1].length : 3;
      const ms = String(milliseconds).padStart(3, "0").slice(0, msDigits);
      return `${hours}:${minutes}:${seconds}.${ms}`;
    } else if (milliseconds > 0) {
      const ms = String(milliseconds).padStart(3, "0").replace(/0+$/, "");
      return `${hours}:${minutes}:${seconds}.${ms}`;
    }
    return `${hours}:${minutes}:${seconds}`;
  }
};
var LocalDateTime = class extends Date {
  constructor(value, useSpaceSeparator = false, originalFormat) {
    super(value.replace(" ", "T") + "Z");
    this.useSpaceSeparator = false;
    this.useSpaceSeparator = useSpaceSeparator;
    this.originalFormat = originalFormat || value;
  }
  toISOString() {
    const year = this.getUTCFullYear();
    const month = String(this.getUTCMonth() + 1).padStart(2, "0");
    const day = String(this.getUTCDate()).padStart(2, "0");
    const hours = String(this.getUTCHours()).padStart(2, "0");
    const minutes = String(this.getUTCMinutes()).padStart(2, "0");
    const seconds = String(this.getUTCSeconds()).padStart(2, "0");
    const milliseconds = this.getUTCMilliseconds();
    const datePart = `${year}-${month}-${day}`;
    const separator = this.useSpaceSeparator ? " " : "T";
    const originalHadMs = this.originalFormat && this.originalFormat.includes(".");
    if (originalHadMs) {
      const msMatch = this.originalFormat.match(/\.(\d+)\s*$/);
      const msDigits = msMatch ? msMatch[1].length : 3;
      const ms = String(milliseconds).padStart(3, "0").slice(0, msDigits);
      return `${datePart}${separator}${hours}:${minutes}:${seconds}.${ms}`;
    } else if (milliseconds > 0) {
      const ms = String(milliseconds).padStart(3, "0").replace(/0+$/, "");
      return `${datePart}${separator}${hours}:${minutes}:${seconds}.${ms}`;
    }
    return `${datePart}${separator}${hours}:${minutes}:${seconds}`;
  }
};
var OffsetDateTime = class extends Date {
  constructor(value, useSpaceSeparator = false) {
    super(value.replace(" ", "T"));
    this.useSpaceSeparator = false;
    this.useSpaceSeparator = useSpaceSeparator;
    this.originalFormat = value;
    const offsetMatch = value.match(/([+-]\d{2}:\d{2}|[Zz])$/);
    if (offsetMatch) {
      this.originalOffset = offsetMatch[1] === "z" ? "Z" : offsetMatch[1];
    }
  }
  toISOString() {
    if (this.originalOffset) {
      const utcTime = this.getTime();
      let offsetMinutes = 0;
      if (this.originalOffset !== "Z") {
        const sign = this.originalOffset[0] === "+" ? 1 : -1;
        const [hours2, minutes2] = this.originalOffset.slice(1).split(":");
        offsetMinutes = sign * (parseInt(hours2) * 60 + parseInt(minutes2));
      }
      const localTime = new Date(utcTime + offsetMinutes * 6e4);
      const year = localTime.getUTCFullYear();
      const month = String(localTime.getUTCMonth() + 1).padStart(2, "0");
      const day = String(localTime.getUTCDate()).padStart(2, "0");
      const hours = String(localTime.getUTCHours()).padStart(2, "0");
      const minutes = String(localTime.getUTCMinutes()).padStart(2, "0");
      const seconds = String(localTime.getUTCSeconds()).padStart(2, "0");
      const milliseconds = localTime.getUTCMilliseconds();
      const datePart = `${year}-${month}-${day}`;
      const separator = this.useSpaceSeparator ? " " : "T";
      const originalHadMs = this.originalFormat && this.originalFormat.includes(".");
      if (originalHadMs) {
        const msMatch = this.originalFormat.match(/\.(\d+)(?:[Zz]|[+-]\d{2}:\d{2})\s*$/);
        const msDigits = msMatch ? msMatch[1].length : 3;
        const ms = String(milliseconds).padStart(3, "0").slice(0, msDigits);
        return `${datePart}${separator}${hours}:${minutes}:${seconds}.${ms}${this.originalOffset}`;
      } else if (milliseconds > 0) {
        const ms = String(milliseconds).padStart(3, "0").replace(/0+$/, "");
        return `${datePart}${separator}${hours}:${minutes}:${seconds}.${ms}${this.originalOffset}`;
      }
      return `${datePart}${separator}${hours}:${minutes}:${seconds}${this.originalOffset}`;
    }
    const isoString = super.toISOString();
    if (this.useSpaceSeparator) {
      return isoString.replace("T", " ");
    }
    return isoString;
  }
};
var dateFormatHelper = DateFormatHelper;
var TRUE = "true";
var FALSE = "false";
var HAS_E = /e/i;
var IS_DIVIDER = /\_/g;
var IS_INF = /inf/;
var IS_NAN = /nan/;
var IS_HEX = /^0x/;
var IS_OCTAL = /^0o/;
var IS_BINARY = /^0b/;
function* parseTOML(input) {
  const tokens = tokenize(input);
  const cursor = new Cursor(tokens);
  while (!cursor.next().done) {
    yield* __yieldStar(walkBlock(cursor, input));
  }
}
function* continueParsingTOML(existingAst, remainingString) {
  for (const item of existingAst) {
    yield item;
  }
  for (const item of parseTOML(remainingString)) {
    yield item;
  }
}
function* walkBlock(cursor, input) {
  if (cursor.value.type === TokenType.Comment) {
    yield comment(cursor);
  } else if (cursor.value.type === TokenType.Bracket) {
    yield table(cursor, input);
  } else if (cursor.value.type === TokenType.Literal) {
    yield* __yieldStar(keyValue(cursor, input));
  } else {
    throw new ParseError(input, cursor.value.loc.start, `Unexpected token "${cursor.value.type}". Expected Comment, Bracket, or String`);
  }
}
function* walkValue$1(cursor, input) {
  if (cursor.value.type === TokenType.Literal) {
    if (cursor.value.raw[0] === DOUBLE_QUOTE || cursor.value.raw[0] === SINGLE_QUOTE) {
      yield string(cursor);
    } else if (cursor.value.raw === TRUE || cursor.value.raw === FALSE) {
      yield boolean(cursor);
    } else if (dateFormatHelper.IS_FULL_DATE.test(cursor.value.raw) || dateFormatHelper.IS_FULL_TIME.test(cursor.value.raw)) {
      yield datetime(cursor, input);
    } else if (!cursor.peek().done && cursor.peek().value.type === TokenType.Dot || IS_INF.test(cursor.value.raw) || IS_NAN.test(cursor.value.raw) || HAS_E.test(cursor.value.raw) && !IS_HEX.test(cursor.value.raw)) {
      yield float(cursor, input);
    } else {
      yield integer(cursor);
    }
  } else if (cursor.value.type === TokenType.Curly) {
    yield inlineTable(cursor, input);
  } else if (cursor.value.type === TokenType.Bracket) {
    const [inline_array, comments] = inlineArray(cursor, input);
    yield inline_array;
    yield* __yieldStar(comments);
  } else {
    throw new ParseError(input, cursor.value.loc.start, `Unrecognized token type "${cursor.value.type}". Expected String, Curly, or Bracket`);
  }
}
function comment(cursor) {
  return {
    type: NodeType.Comment,
    loc: cursor.value.loc,
    raw: cursor.value.raw
  };
}
function table(cursor, input) {
  const type = !cursor.peek().done && cursor.peek().value.type === TokenType.Bracket ? NodeType.TableArray : NodeType.Table;
  const is_table = type === NodeType.Table;
  if (is_table && cursor.value.raw !== "[") {
    throw new ParseError(input, cursor.value.loc.start, `Expected table opening "[", found ${cursor.value.raw}`);
  }
  if (!is_table && (cursor.value.raw !== "[" || cursor.peek().value.raw !== "[")) {
    throw new ParseError(input, cursor.value.loc.start, `Expected array of tables opening "[[", found ${cursor.value.raw + cursor.peek().value.raw}`);
  }
  const key = is_table ? {
    type: NodeType.TableKey,
    loc: cursor.value.loc
  } : {
    type: NodeType.TableArrayKey,
    loc: cursor.value.loc
  };
  cursor.next();
  if (type === NodeType.TableArray)
    cursor.next();
  if (cursor.done) {
    throw new ParseError(input, key.loc.start, `Expected table key, reached end of file`);
  }
  key.item = {
    type: NodeType.Key,
    loc: cloneLocation(cursor.value.loc),
    raw: cursor.value.raw,
    value: [parseString(cursor.value.raw)]
  };
  while (!cursor.peek().done && cursor.peek().value.type === TokenType.Dot) {
    cursor.next();
    const dot = cursor.value;
    cursor.next();
    const before = " ".repeat(dot.loc.start.column - key.item.loc.end.column);
    const after = " ".repeat(cursor.value.loc.start.column - dot.loc.end.column);
    key.item.loc.end = cursor.value.loc.end;
    key.item.raw += `${before}.${after}${cursor.value.raw}`;
    key.item.value.push(parseString(cursor.value.raw));
  }
  cursor.next();
  if (is_table && (cursor.done || cursor.value.raw !== "]")) {
    throw new ParseError(input, cursor.done ? key.item.loc.end : cursor.value.loc.start, `Expected table closing "]", found ${cursor.done ? "end of file" : cursor.value.raw}`);
  }
  if (!is_table && (cursor.done || cursor.peek().done || cursor.value.raw !== "]" || cursor.peek().value.raw !== "]")) {
    throw new ParseError(input, cursor.done || cursor.peek().done ? key.item.loc.end : cursor.value.loc.start, `Expected array of tables closing "]]", found ${cursor.done || cursor.peek().done ? "end of file" : cursor.value.raw + cursor.peek().value.raw}`);
  }
  if (!is_table)
    cursor.next();
  key.loc.end = cursor.value.loc.end;
  let items = [];
  while (!cursor.peek().done && cursor.peek().value.type !== TokenType.Bracket) {
    cursor.next();
    merge(items, [...walkBlock(cursor, input)]);
  }
  return {
    type: is_table ? NodeType.Table : NodeType.TableArray,
    loc: {
      start: clonePosition(key.loc.start),
      end: items.length ? clonePosition(items[items.length - 1].loc.end) : clonePosition(key.loc.end)
    },
    key,
    items
  };
}
function keyValue(cursor, input) {
  const key = {
    type: NodeType.Key,
    loc: cloneLocation(cursor.value.loc),
    raw: cursor.value.raw,
    value: [parseString(cursor.value.raw)]
  };
  while (!cursor.peek().done && cursor.peek().value.type === TokenType.Dot) {
    cursor.next();
    cursor.next();
    key.loc.end = cursor.value.loc.end;
    key.raw += `.${cursor.value.raw}`;
    key.value.push(parseString(cursor.value.raw));
  }
  cursor.next();
  if (cursor.done || cursor.value.type !== TokenType.Equal) {
    throw new ParseError(input, cursor.done ? key.loc.end : cursor.value.loc.start, `Expected "=" for key-value, found ${cursor.done ? "end of file" : cursor.value.raw}`);
  }
  const equals = cursor.value.loc.start.column;
  cursor.next();
  if (cursor.done) {
    throw new ParseError(input, key.loc.start, `Expected value for key-value, reached end of file`);
  }
  const [value, ...comments] = walkValue$1(cursor, input);
  return [
    {
      type: NodeType.KeyValue,
      key,
      value,
      loc: {
        start: clonePosition(key.loc.start),
        end: clonePosition(value.loc.end)
      },
      equals
    },
    ...comments
  ];
}
function string(cursor) {
  return {
    type: NodeType.String,
    loc: cursor.value.loc,
    raw: cursor.value.raw,
    value: parseString(cursor.value.raw)
  };
}
function boolean(cursor) {
  return {
    type: NodeType.Boolean,
    loc: cursor.value.loc,
    value: cursor.value.raw === TRUE
  };
}
function datetime(cursor, input) {
  let loc = cursor.value.loc;
  let raw = cursor.value.raw;
  let value;
  if (!cursor.peek().done && cursor.peek().value.type === TokenType.Literal && dateFormatHelper.IS_FULL_DATE.test(raw) && dateFormatHelper.IS_FULL_TIME.test(cursor.peek().value.raw)) {
    const start = loc.start;
    cursor.next();
    loc = { start, end: cursor.value.loc.end };
    raw += ` ${cursor.value.raw}`;
  }
  if (!cursor.peek().done && cursor.peek().value.type === TokenType.Dot) {
    const start = loc.start;
    cursor.next();
    if (cursor.peek().done || cursor.peek().value.type !== TokenType.Literal) {
      throw new ParseError(input, cursor.value.loc.end, `Expected fractional value for DateTime`);
    }
    cursor.next();
    loc = { start, end: cursor.value.loc.end };
    raw += `.${cursor.value.raw}`;
  }
  if (!dateFormatHelper.IS_FULL_DATE.test(raw)) {
    if (dateFormatHelper.IS_TIME_ONLY.test(raw)) {
      value = new LocalTime(raw, raw);
    } else {
      const [local_date] = (/* @__PURE__ */ new Date()).toISOString().split("T");
      value = /* @__PURE__ */ new Date(`${local_date}T${raw}`);
    }
  } else if (dateFormatHelper.IS_DATE_ONLY.test(raw)) {
    value = new LocalDate(raw);
  } else if (dateFormatHelper.IS_LOCAL_DATETIME_T.test(raw)) {
    value = new LocalDateTime(raw, false);
  } else if (dateFormatHelper.IS_LOCAL_DATETIME_SPACE.test(raw)) {
    value = new LocalDateTime(raw, true);
  } else if (dateFormatHelper.IS_OFFSET_DATETIME_T.test(raw)) {
    value = new OffsetDateTime(raw, false);
  } else if (dateFormatHelper.IS_OFFSET_DATETIME_SPACE.test(raw)) {
    value = new OffsetDateTime(raw, true);
  } else {
    value = new Date(raw.replace(" ", "T"));
  }
  return {
    type: NodeType.DateTime,
    loc,
    raw,
    value
  };
}
function float(cursor, input) {
  let loc = cursor.value.loc;
  let raw = cursor.value.raw;
  let value;
  if (IS_INF.test(raw)) {
    value = raw === "-inf" ? -Infinity : Infinity;
  } else if (IS_NAN.test(raw)) {
    value = raw === "-nan" ? NaN : NaN;
  } else if (!cursor.peek().done && cursor.peek().value.type === TokenType.Dot) {
    const start = loc.start;
    cursor.next();
    if (cursor.peek().done || cursor.peek().value.type !== TokenType.Literal) {
      throw new ParseError(input, cursor.value.loc.end, `Expected fraction value for Float`);
    }
    cursor.next();
    raw += `.${cursor.value.raw}`;
    loc = { start, end: cursor.value.loc.end };
    value = Number(raw.replace(IS_DIVIDER, ""));
  } else {
    value = Number(raw.replace(IS_DIVIDER, ""));
  }
  return { type: NodeType.Float, loc, raw, value };
}
function integer(cursor) {
  if (cursor.value.raw === "-0" || cursor.value.raw === "+0") {
    return {
      type: NodeType.Integer,
      loc: cursor.value.loc,
      raw: cursor.value.raw,
      value: 0
    };
  }
  let radix = 10;
  if (IS_HEX.test(cursor.value.raw)) {
    radix = 16;
  } else if (IS_OCTAL.test(cursor.value.raw)) {
    radix = 8;
  } else if (IS_BINARY.test(cursor.value.raw)) {
    radix = 2;
  }
  const value = parseInt(cursor.value.raw.replace(IS_DIVIDER, "").replace(IS_OCTAL, "").replace(IS_BINARY, ""), radix);
  return {
    type: NodeType.Integer,
    loc: cursor.value.loc,
    raw: cursor.value.raw,
    value
  };
}
function inlineTable(cursor, input) {
  if (cursor.value.raw !== "{") {
    throw new ParseError(input, cursor.value.loc.start, `Expected "{" for inline table, found ${cursor.value.raw}`);
  }
  const value = {
    type: NodeType.InlineTable,
    loc: cloneLocation(cursor.value.loc),
    items: []
  };
  cursor.next();
  while (!cursor.done && !(cursor.value.type === TokenType.Curly && cursor.value.raw === "}")) {
    if (cursor.value.type === TokenType.Comma) {
      const previous = value.items[value.items.length - 1];
      if (!previous) {
        throw new ParseError(input, cursor.value.loc.start, 'Found "," without previous value in inline table');
      }
      previous.comma = true;
      previous.loc.end = cursor.value.loc.start;
      cursor.next();
      continue;
    }
    const [item] = walkBlock(cursor, input);
    if (item.type !== NodeType.KeyValue) {
      throw new ParseError(input, cursor.value.loc.start, `Only key-values are supported in inline tables, found ${item.type}`);
    }
    const inline_item = {
      type: NodeType.InlineItem,
      loc: cloneLocation(item.loc),
      item,
      comma: false
    };
    value.items.push(inline_item);
    cursor.next();
  }
  if (cursor.done || cursor.value.type !== TokenType.Curly || cursor.value.raw !== "}") {
    throw new ParseError(input, cursor.done ? value.loc.start : cursor.value.loc.start, `Expected "}", found ${cursor.done ? "end of file" : cursor.value.raw}`);
  }
  value.loc.end = cursor.value.loc.end;
  return value;
}
function inlineArray(cursor, input) {
  if (cursor.value.raw !== "[") {
    throw new ParseError(input, cursor.value.loc.start, `Expected "[" for inline array, found ${cursor.value.raw}`);
  }
  const value = {
    type: NodeType.InlineArray,
    loc: cloneLocation(cursor.value.loc),
    items: []
  };
  let comments = [];
  cursor.next();
  while (!cursor.done && !(cursor.value.type === TokenType.Bracket && cursor.value.raw === "]")) {
    if (cursor.value.type === TokenType.Comma) {
      const previous = value.items[value.items.length - 1];
      if (!previous) {
        throw new ParseError(input, cursor.value.loc.start, 'Found "," without previous value for inline array');
      }
      previous.comma = true;
      previous.loc.end = cursor.value.loc.start;
    } else if (cursor.value.type === TokenType.Comment) {
      comments.push(comment(cursor));
    } else {
      const [item, ...additional_comments] = walkValue$1(cursor, input);
      const inline_item = {
        type: NodeType.InlineItem,
        loc: cloneLocation(item.loc),
        item,
        comma: false
      };
      value.items.push(inline_item);
      merge(comments, additional_comments);
    }
    cursor.next();
  }
  if (cursor.done || cursor.value.type !== TokenType.Bracket || cursor.value.raw !== "]") {
    throw new ParseError(input, cursor.done ? value.loc.start : cursor.value.loc.start, `Expected "]", found ${cursor.done ? "end of file" : cursor.value.raw}`);
  }
  value.loc.end = cursor.value.loc.end;
  return [value, comments];
}
function traverse(ast, visitor) {
  if (isIterable(ast)) {
    traverseArray(ast, null);
  } else {
    traverseNode(ast, null);
  }
  function traverseArray(array, parent) {
    for (const node of array) {
      traverseNode(node, parent);
    }
  }
  function traverseNode(node, parent) {
    const visit = visitor[node.type];
    if (visit && typeof visit === "function") {
      visit(node, parent);
    }
    if (visit && visit.enter) {
      visit.enter(node, parent);
    }
    switch (node.type) {
      case NodeType.Document:
        traverseArray(node.items, node);
        break;
      case NodeType.Table:
        traverseNode(node.key, node);
        traverseArray(node.items, node);
        break;
      case NodeType.TableKey:
        traverseNode(node.item, node);
        break;
      case NodeType.TableArray:
        traverseNode(node.key, node);
        traverseArray(node.items, node);
        break;
      case NodeType.TableArrayKey:
        traverseNode(node.item, node);
        break;
      case NodeType.KeyValue:
        traverseNode(node.key, node);
        traverseNode(node.value, node);
        break;
      case NodeType.InlineArray:
        traverseArray(node.items, node);
        break;
      case NodeType.InlineItem:
        traverseNode(node.item, node);
        break;
      case NodeType.InlineTable:
        traverseArray(node.items, node);
        break;
      case NodeType.Key:
      case NodeType.String:
      case NodeType.Integer:
      case NodeType.Float:
      case NodeType.Boolean:
      case NodeType.DateTime:
      case NodeType.Comment:
        break;
      default:
        throw new Error(`Unrecognized node type "${node.type}"`);
    }
    if (visit && visit.exit) {
      visit.exit(node, parent);
    }
  }
}
var enter_offsets = /* @__PURE__ */ new WeakMap();
var getEnterOffsets = (root) => {
  if (!enter_offsets.has(root)) {
    enter_offsets.set(root, /* @__PURE__ */ new WeakMap());
  }
  return enter_offsets.get(root);
};
var exit_offsets = /* @__PURE__ */ new WeakMap();
var getExitOffsets = (root) => {
  if (!exit_offsets.has(root)) {
    exit_offsets.set(root, /* @__PURE__ */ new WeakMap());
  }
  return exit_offsets.get(root);
};
function replace(root, parent, existing, replacement) {
  if (hasItems(parent)) {
    const index = parent.items.indexOf(existing);
    if (index < 0) {
      throw new Error(`Could not find existing item in parent node for replace`);
    }
    parent.items.splice(index, 1, replacement);
  } else if (isKeyValue(parent) && isInlineTable(parent.value) && !isInlineTable(existing)) {
    const index = parent.value.items.indexOf(existing);
    if (index < 0) {
      throw new Error(`Could not find existing item in parent node for replace`);
    }
    parent.value.items.splice(index, 1, replacement);
  } else if (hasItem(parent)) {
    parent.item = replacement;
  } else if (isKeyValue(parent)) {
    if (parent.key === existing) {
      parent.key = replacement;
    } else {
      parent.value = replacement;
    }
  } else {
    throw new Error(`Unsupported parent type "${parent.type}" for replace`);
  }
  const shift = {
    lines: existing.loc.start.line - replacement.loc.start.line,
    columns: existing.loc.start.column - replacement.loc.start.column
  };
  shiftNode(replacement, shift);
  const existing_span = getSpan(existing.loc);
  const replacement_span = getSpan(replacement.loc);
  const offset = {
    lines: replacement_span.lines - existing_span.lines,
    columns: replacement_span.columns - existing_span.columns
  };
  addOffset(offset, getExitOffsets(root), replacement, existing);
}
function insert(root, parent, child, index, forceInline) {
  if (!hasItems(parent)) {
    throw new Error(`Unsupported parent type "${parent.type}" for insert`);
  }
  index = index != null && typeof index === "number" ? index : parent.items.length;
  let shift;
  let offset;
  if (isInlineArray(parent) || isInlineTable(parent)) {
    ({ shift, offset } = insertInline(parent, child, index));
  } else if (forceInline && isDocument(parent)) {
    ({ shift, offset } = insertInlineAtRoot(parent, child, index));
  } else {
    ({ shift, offset } = insertOnNewLine(parent, child, index));
  }
  shiftNode(child, shift);
  const previous = parent.items[index - 1];
  const previous_offset = previous && getExitOffsets(root).get(previous);
  if (previous_offset) {
    offset.lines += previous_offset.lines;
    offset.columns += previous_offset.columns;
    getExitOffsets(root).delete(previous);
  }
  const offsets = getExitOffsets(root);
  offsets.set(child, offset);
}
function insertOnNewLine(parent, child, index) {
  if (!isBlock(child)) {
    throw new Error(`Incompatible child type "${child.type}"`);
  }
  const previous = parent.items[index - 1];
  const use_first_line = isDocument(parent) && !parent.items.length;
  parent.items.splice(index, 0, child);
  const start = previous ? {
    line: previous.loc.end.line,
    column: !isComment(previous) ? previous.loc.start.column : parent.loc.start.column
  } : clonePosition(parent.loc.start);
  const isSquareBracketsStructure = isTable(child) || isTableArray(child);
  let leading_lines = 0;
  if (use_first_line) ;
  else if (isSquareBracketsStructure) {
    leading_lines = 2;
  } else {
    leading_lines = 1;
  }
  start.line += leading_lines;
  const shift = {
    lines: start.line - child.loc.start.line,
    columns: start.column - child.loc.start.column
  };
  const child_span = getSpan(child.loc);
  const offset = {
    lines: child_span.lines + (leading_lines - 1),
    columns: child_span.columns
  };
  return { shift, offset };
}
function calculateInlinePositioning(parent, child, index, options = {}) {
  const { useNewLine = false, skipCommaSpace = 2, skipBracketSpace = 1, hasCommaHandling = false, isLastElement = false, hasSeparatingCommaBefore = false, hasSeparatingCommaAfter = false, hasTrailingComma = false } = options;
  const previous = index > 0 ? parent.items[index - 1] : void 0;
  const start = previous ? {
    line: previous.loc.end.line,
    column: useNewLine ? !isComment(previous) ? previous.loc.start.column : parent.loc.start.column : previous.loc.end.column
  } : clonePosition(parent.loc.start);
  let leading_lines = 0;
  if (useNewLine) {
    leading_lines = 1;
  } else {
    const hasSpacing = hasSeparatingCommaBefore || !hasCommaHandling && !!previous;
    if (hasSpacing && hasCommaHandling) {
      start.column += skipCommaSpace;
    } else if (hasSpacing || hasCommaHandling && !previous) {
      start.column += skipBracketSpace;
    }
  }
  start.line += leading_lines;
  const shift = {
    lines: start.line - child.loc.start.line,
    columns: start.column - child.loc.start.column
  };
  const child_span = getSpan(child.loc);
  if (!hasCommaHandling) {
    const offset2 = {
      lines: child_span.lines + (leading_lines - 1),
      columns: child_span.columns
    };
    return { shift, offset: offset2 };
  }
  const has_trailing_comma_spacing_bug = hasSeparatingCommaBefore && hasTrailingComma && !hasSeparatingCommaAfter && isLastElement;
  let trailing_comma_offset_adjustment = 0;
  if (has_trailing_comma_spacing_bug) {
    trailing_comma_offset_adjustment = -1;
  }
  const offset = {
    lines: child_span.lines + (leading_lines - 1),
    columns: child_span.columns + (hasSeparatingCommaBefore || hasSeparatingCommaAfter ? skipCommaSpace : 0) + (hasTrailingComma ? 1 + trailing_comma_offset_adjustment : 0)
  };
  return { shift, offset };
}
function insertInline(parent, child, index) {
  if (!isInlineItem(child)) {
    throw new Error(`Incompatible child type "${child.type}"`);
  }
  const previous = index != null ? parent.items[index - 1] : last(parent.items);
  const is_last = index == null || index === parent.items.length;
  parent.items.splice(index, 0, child);
  const has_separating_comma_before = !!previous;
  const has_separating_comma_after = !is_last;
  if (has_separating_comma_before) {
    previous.comma = true;
  }
  if (has_separating_comma_after) {
    child.comma = true;
  }
  const use_new_line = isInlineArray(parent) && perLine(parent);
  const has_trailing_comma = is_last && child.comma === true;
  return calculateInlinePositioning(parent, child, index, {
    useNewLine: use_new_line,
    hasCommaHandling: true,
    isLastElement: is_last,
    hasSeparatingCommaBefore: has_separating_comma_before,
    hasSeparatingCommaAfter: has_separating_comma_after,
    hasTrailingComma: has_trailing_comma
  });
}
function insertInlineAtRoot(parent, child, index) {
  const result = calculateInlinePositioning(parent, child, index, {
    useNewLine: false,
    hasCommaHandling: false
  });
  parent.items.splice(index, 0, child);
  return result;
}
function remove(root, parent, node) {
  if (!hasItems(parent)) {
    throw new Error(`Unsupported parent type "${parent.type}" for remove`);
  }
  let index = parent.items.indexOf(node);
  if (index < 0) {
    index = parent.items.findIndex((item) => hasItem(item) && item.item === node);
    if (index < 0) {
      throw new Error("Could not find node in parent for removal");
    }
    node = parent.items[index];
  }
  const previous = parent.items[index - 1];
  let next = parent.items[index + 1];
  parent.items.splice(index, 1);
  let removed_span = getSpan(node.loc);
  if (next && isComment(next) && next.loc.start.line === node.loc.end.line) {
    removed_span = getSpan({ start: node.loc.start, end: next.loc.end });
    next = parent.items[index + 1];
    parent.items.splice(index, 1);
  }
  const is_inline = previous && isInlineItem(previous) || next && isInlineItem(next);
  const previous_on_same_line = previous && previous.loc.end.line === node.loc.start.line;
  const next_on_sameLine = next && next.loc.start.line === node.loc.end.line;
  const keep_line = is_inline && (previous_on_same_line || next_on_sameLine);
  const offset = {
    lines: -(removed_span.lines - (keep_line ? 1 : 0)),
    columns: -removed_span.columns
  };
  if (previous === void 0 && next === void 0) {
    offset.lines = 0;
    offset.columns = 0;
  }
  if (is_inline && previous_on_same_line) {
    offset.columns -= 2;
  }
  if (is_inline && !previous && next) {
    offset.columns -= 2;
  }
  if (is_inline && previous && !next) {
    const removedHadTrailingComma = node.comma;
    if (removedHadTrailingComma) {
      previous.comma = true;
    } else {
      previous.comma = false;
    }
  }
  const target = previous || parent;
  const target_offsets = previous ? getExitOffsets(root) : getEnterOffsets(root);
  const node_offsets = getExitOffsets(root);
  const previous_offset = target_offsets.get(target);
  if (previous_offset) {
    offset.lines += previous_offset.lines;
    offset.columns += previous_offset.columns;
  }
  const removed_offset = node_offsets.get(node);
  if (removed_offset) {
    offset.lines += removed_offset.lines;
    offset.columns += removed_offset.columns;
  }
  target_offsets.set(target, offset);
}
function applyBracketSpacing(root, node, bracket_spacing = true) {
  if (!bracket_spacing)
    return;
  if (!node.items.length)
    return;
  addOffset({ lines: 0, columns: 1 }, getEnterOffsets(root), node);
  const last_item = last(node.items);
  addOffset({ lines: 0, columns: 1 }, getExitOffsets(root), last_item);
}
function applyTrailingComma(root, node, trailing_commas = false) {
  if (!trailing_commas)
    return;
  if (!node.items.length)
    return;
  const last_item = last(node.items);
  last_item.comma = true;
  addOffset({ lines: 0, columns: 1 }, getExitOffsets(root), last_item);
}
function applyWrites(root) {
  const enter = getEnterOffsets(root);
  const exit = getExitOffsets(root);
  const offset = {
    lines: 0,
    columns: {}
  };
  function shiftStart(node) {
    const lineOffset = offset.lines;
    node.loc.start.line += lineOffset;
    const columnOffset = offset.columns[node.loc.start.line] || 0;
    node.loc.start.column += columnOffset;
    const entering = enter.get(node);
    if (entering) {
      offset.lines += entering.lines;
      offset.columns[node.loc.start.line] = (offset.columns[node.loc.start.line] || 0) + entering.columns;
    }
  }
  function shiftEnd(node) {
    const lineOffset = offset.lines;
    node.loc.end.line += lineOffset;
    const columnOffset = offset.columns[node.loc.end.line] || 0;
    node.loc.end.column += columnOffset;
    const exiting = exit.get(node);
    if (exiting) {
      offset.lines += exiting.lines;
      offset.columns[node.loc.end.line] = (offset.columns[node.loc.end.line] || 0) + exiting.columns;
    }
  }
  const shiftLocation = {
    enter: shiftStart,
    exit: shiftEnd
  };
  traverse(root, {
    [NodeType.Document]: shiftLocation,
    [NodeType.Table]: shiftLocation,
    [NodeType.TableArray]: shiftLocation,
    [NodeType.InlineTable]: shiftLocation,
    [NodeType.InlineArray]: shiftLocation,
    [NodeType.InlineItem]: shiftLocation,
    [NodeType.TableKey]: shiftLocation,
    [NodeType.TableArrayKey]: shiftLocation,
    [NodeType.KeyValue]: {
      enter(node) {
        const start_line = node.loc.start.line + offset.lines;
        const key_offset = exit.get(node.key);
        node.equals += (offset.columns[start_line] || 0) + (key_offset ? key_offset.columns : 0);
        shiftStart(node);
      },
      exit: shiftEnd
    },
    [NodeType.Key]: shiftLocation,
    [NodeType.String]: shiftLocation,
    [NodeType.Integer]: shiftLocation,
    [NodeType.Float]: shiftLocation,
    [NodeType.Boolean]: shiftLocation,
    [NodeType.DateTime]: shiftLocation,
    [NodeType.Comment]: shiftLocation
  });
  enter_offsets.delete(root);
  exit_offsets.delete(root);
}
function shiftNode(node, span, options = {}) {
  const { first_line_only = false } = options;
  const start_line = node.loc.start.line;
  const { lines, columns } = span;
  const move = (node2) => {
    if (!first_line_only || node2.loc.start.line === start_line) {
      node2.loc.start.column += columns;
      node2.loc.end.column += columns;
    }
    node2.loc.start.line += lines;
    node2.loc.end.line += lines;
  };
  traverse(node, {
    [NodeType.Table]: move,
    [NodeType.TableKey]: move,
    [NodeType.TableArray]: move,
    [NodeType.TableArrayKey]: move,
    [NodeType.KeyValue](node2) {
      move(node2);
      node2.equals += columns;
    },
    [NodeType.Key]: move,
    [NodeType.String]: move,
    [NodeType.Integer]: move,
    [NodeType.Float]: move,
    [NodeType.Boolean]: move,
    [NodeType.DateTime]: move,
    [NodeType.InlineArray]: move,
    [NodeType.InlineItem]: move,
    [NodeType.InlineTable]: move,
    [NodeType.Comment]: move
  });
  return node;
}
function perLine(array) {
  if (!array.items.length)
    return false;
  const span = getSpan(array.loc);
  return span.lines > array.items.length;
}
function addOffset(offset, offsets, node, from) {
  const previous_offset = offsets.get(from || node);
  if (previous_offset) {
    offset.lines += previous_offset.lines;
    offset.columns += previous_offset.columns;
  }
  offsets.set(node, offset);
}
function generateDocument() {
  return {
    type: NodeType.Document,
    loc: { start: zero(), end: zero() },
    items: []
  };
}
function generateTable(key) {
  const table_key = generateTableKey(key);
  return {
    type: NodeType.Table,
    loc: cloneLocation(table_key.loc),
    key: table_key,
    items: []
  };
}
function generateTableKey(key) {
  const raw = keyValueToRaw(key);
  return {
    type: NodeType.TableKey,
    loc: {
      start: zero(),
      end: { line: 1, column: raw.length + 2 }
    },
    item: {
      type: NodeType.Key,
      loc: {
        start: { line: 1, column: 1 },
        end: { line: 1, column: raw.length + 1 }
      },
      value: key,
      raw
    }
  };
}
function generateTableArray(key) {
  const table_array_key = generateTableArrayKey(key);
  return {
    type: NodeType.TableArray,
    loc: cloneLocation(table_array_key.loc),
    key: table_array_key,
    items: []
  };
}
function generateTableArrayKey(key) {
  const raw = keyValueToRaw(key);
  return {
    type: NodeType.TableArrayKey,
    loc: {
      start: zero(),
      end: { line: 1, column: raw.length + 4 }
    },
    item: {
      type: NodeType.Key,
      loc: {
        start: { line: 1, column: 2 },
        end: { line: 1, column: raw.length + 2 }
      },
      value: key,
      raw
    }
  };
}
function generateKeyValue(key, value) {
  const key_node = generateKey(key);
  const { column } = key_node.loc.end;
  const equals = column + 1;
  shiftNode(value, { lines: 0, columns: column + 3 - value.loc.start.column }, { first_line_only: true });
  return {
    type: NodeType.KeyValue,
    loc: {
      start: clonePosition(key_node.loc.start),
      end: clonePosition(value.loc.end)
    },
    key: key_node,
    equals,
    value
  };
}
var IS_BARE_KEY = /^[\w-]+$/;
function keyValueToRaw(value) {
  return value.map((part) => IS_BARE_KEY.test(part) ? part : JSON.stringify(part)).join(".");
}
function generateKey(value) {
  const raw = keyValueToRaw(value);
  return {
    type: NodeType.Key,
    loc: { start: zero(), end: { line: 1, column: raw.length } },
    raw,
    value
  };
}
function generateString(value, existingRaw) {
  let raw;
  if (existingRaw && isMultilineString(existingRaw)) {
    let isLiteral = existingRaw.startsWith("'''");
    if (isLiteral && value.includes("'''")) {
      isLiteral = false;
    }
    const delimiter = isLiteral ? "'''" : '"""';
    const newlineChar = existingRaw.includes("\r\n") ? "\r\n" : "\n";
    const hasLeadingNewline = existingRaw.startsWith(`${delimiter}${newlineChar}`) || (existingRaw.startsWith("'''\n") || existingRaw.startsWith("'''\r\n")) && !isLiteral;
    let escaped;
    if (isLiteral) {
      escaped = value;
    } else {
      escaped = value.replace(/\\/g, "\\\\").replace(/\x08/g, "\\b").replace(/\f/g, "\\f").replace(/\t/g, "\\t").replace(/[\x00-\x07\x0B\x0E-\x1F\x7F]/g, (char) => {
        const code = char.charCodeAt(0);
        return "\\u" + code.toString(16).padStart(4, "0").toUpperCase();
      }).replace(/"""/g, '""\\"');
    }
    if (hasLeadingNewline) {
      raw = `${delimiter}${newlineChar}${escaped}${delimiter}`;
    } else {
      raw = `${delimiter}${escaped}${delimiter}`;
    }
  } else {
    raw = JSON.stringify(value);
  }
  let endLocation;
  if (raw.includes("\r\n") || raw.includes("\n") && !raw.includes("\r\n")) {
    const newlineChar = raw.includes("\r\n") ? "\r\n" : "\n";
    const lineCount = (raw.match(new RegExp(newlineChar === "\r\n" ? "\\r\\n" : "\\n", "g")) || []).length;
    if (lineCount > 0) {
      endLocation = {
        line: 1 + lineCount,
        column: 3
        // length of delimiter (""" or ''')
      };
    } else {
      endLocation = { line: 1, column: raw.length };
    }
  } else {
    endLocation = { line: 1, column: raw.length };
  }
  return {
    type: NodeType.String,
    loc: { start: zero(), end: endLocation },
    raw,
    value
  };
}
function generateInteger(value) {
  const raw = value.toString();
  return {
    type: NodeType.Integer,
    loc: { start: zero(), end: { line: 1, column: raw.length } },
    raw,
    value
  };
}
function generateFloat(value) {
  let raw;
  if (value === Infinity) {
    raw = "inf";
  } else if (value === -Infinity) {
    raw = "-inf";
  } else if (Number.isNaN(value)) {
    raw = "nan";
  } else if (Object.is(value, -0)) {
    raw = "-0.0";
  } else {
    raw = value.toString();
  }
  return {
    type: NodeType.Float,
    loc: { start: zero(), end: { line: 1, column: raw.length } },
    raw,
    value
  };
}
function generateBoolean(value) {
  return {
    type: NodeType.Boolean,
    loc: { start: zero(), end: { line: 1, column: value ? 4 : 5 } },
    value
  };
}
function generateDateTime(value, format) {
  if (format.truncateZeroTimeInDates && value.getUTCHours() === 0 && value.getUTCMinutes() === 0 && value.getUTCSeconds() === 0 && value.getUTCMilliseconds() === 0) {
    value = new LocalDate(value.toISOString().split("T")[0]);
  }
  const raw = value.toISOString();
  return {
    type: NodeType.DateTime,
    loc: { start: zero(), end: { line: 1, column: raw.length } },
    raw,
    value
  };
}
function generateInlineArray() {
  return {
    type: NodeType.InlineArray,
    loc: { start: zero(), end: { line: 1, column: 2 } },
    items: []
  };
}
function generateInlineItem(item) {
  return {
    type: NodeType.InlineItem,
    loc: cloneLocation(item.loc),
    item,
    comma: false
  };
}
function generateInlineTable() {
  return {
    type: NodeType.InlineTable,
    loc: { start: zero(), end: { line: 1, column: 2 } },
    items: []
  };
}
var DEFAULT_NEWLINE = "\n";
var DEFAULT_TRAILING_NEWLINE = 1;
var DEFAULT_TRAILING_COMMA = false;
var DEFAULT_BRACKET_SPACING = true;
var DEFAULT_INLINE_TABLE_START = 1;
var DEFAULT_TRUNCATE_ZERO_TIME_IN_DATES = false;
function detectTrailingComma(ast) {
  const items = Array.from(ast);
  for (const item of items) {
    const result = findTrailingCommaInNode(item);
    if (result !== null) {
      return result;
    }
  }
  return DEFAULT_TRAILING_COMMA;
}
function detectBracketSpacing(tomlString, ast) {
  const items = Array.from(ast);
  for (const item of items) {
    const result = findBracketSpacingInNode(item, tomlString);
    if (result !== null) {
      return result;
    }
  }
  return DEFAULT_BRACKET_SPACING;
}
function findBracketSpacingInNode(node, tomlString) {
  if (!node || typeof node !== "object") {
    return null;
  }
  if ((node.type === "InlineArray" || node.type === "InlineTable") && node.loc) {
    const bracketSpacing = checkBracketSpacingInLocation(node.loc, tomlString);
    if (bracketSpacing !== null) {
      return bracketSpacing;
    }
  }
  if (node.items && Array.isArray(node.items)) {
    for (const child of node.items) {
      const result = findBracketSpacingInNode(child, tomlString);
      if (result !== null) {
        return result;
      }
      if (child.item) {
        const nestedResult = findBracketSpacingInNode(child.item, tomlString);
        if (nestedResult !== null) {
          return nestedResult;
        }
      }
    }
  }
  for (const prop of ["value", "key", "item"]) {
    if (node[prop]) {
      const result = findBracketSpacingInNode(node[prop], tomlString);
      if (result !== null) {
        return result;
      }
    }
  }
  return null;
}
function checkBracketSpacingInLocation(loc, tomlString) {
  var _a;
  if (!loc || !loc.start || !loc.end) {
    return null;
  }
  const lines = tomlString.split(/\r?\n/);
  const startLine = loc.start.line - 1;
  const endLine = loc.end.line - 1;
  const startCol = loc.start.column;
  const endCol = loc.end.column;
  let rawText = "";
  if (startLine === endLine) {
    rawText = ((_a = lines[startLine]) === null || _a === void 0 ? void 0 : _a.substring(startCol, endCol + 1)) || "";
  } else {
    if (lines[startLine]) {
      rawText += lines[startLine].substring(startCol);
    }
    for (let i = startLine + 1; i < endLine; i++) {
      rawText += "\n" + (lines[i] || "");
    }
    if (lines[endLine]) {
      rawText += "\n" + lines[endLine].substring(0, endCol + 1);
    }
  }
  const arrayMatch = rawText.match(/^\[(\s*)/);
  const tableMatch = rawText.match(/^\{(\s*)/);
  if (arrayMatch) {
    return arrayMatch[1].length > 0;
  }
  if (tableMatch) {
    return tableMatch[1].length > 0;
  }
  return null;
}
function findTrailingCommaInNode(node) {
  if (!node || typeof node !== "object") {
    return null;
  }
  if (node.type === "InlineArray" && node.items && Array.isArray(node.items)) {
    return checkTrailingCommaInItems(node.items);
  }
  if (node.type === "InlineTable" && node.items && Array.isArray(node.items)) {
    return checkTrailingCommaInItems(node.items);
  }
  if (node.type === "KeyValue" && node.value) {
    return findTrailingCommaInNode(node.value);
  }
  if (node.items && Array.isArray(node.items)) {
    for (const item of node.items) {
      const result = findTrailingCommaInNode(item);
      if (result !== null) {
        return result;
      }
    }
  }
  return null;
}
function checkTrailingCommaInItems(items) {
  if (items.length === 0) {
    return null;
  }
  const lastItem = items[items.length - 1];
  if (lastItem && typeof lastItem === "object" && "comma" in lastItem) {
    return lastItem.comma === true;
  }
  return false;
}
function arrayHadTrailingCommas(node) {
  if (!isInlineArray(node))
    return false;
  if (node.items.length === 0)
    return false;
  const lastItem = node.items[node.items.length - 1];
  return lastItem.comma === true;
}
function tableHadTrailingCommas(node) {
  if (!isInlineTable(node))
    return false;
  if (node.items.length === 0)
    return false;
  const lastItem = node.items[node.items.length - 1];
  return lastItem.comma === true;
}
function detectNewline(str) {
  const lfIndex = str.indexOf("\n");
  if (lfIndex > 0 && str.substring(lfIndex - 1, lfIndex) === "\r") {
    return "\r\n";
  }
  return "\n";
}
function countTrailingNewlines(str, newlineChar) {
  let count = 0;
  let pos = str.length;
  while (pos >= newlineChar.length) {
    if (str.substring(pos - newlineChar.length, pos) === newlineChar) {
      count++;
      pos -= newlineChar.length;
    } else {
      break;
    }
  }
  return count;
}
function validateFormatObject(format) {
  if (!format || typeof format !== "object") {
    return {};
  }
  const supportedProperties = /* @__PURE__ */ new Set(["newLine", "trailingNewline", "trailingComma", "bracketSpacing", "inlineTableStart", "truncateZeroTimeInDates"]);
  const validatedFormat = {};
  const unsupportedProperties = [];
  const invalidTypeProperties = [];
  for (const key in format) {
    if (Object.prototype.hasOwnProperty.call(format, key)) {
      if (supportedProperties.has(key)) {
        const value = format[key];
        switch (key) {
          case "newLine":
            if (typeof value === "string") {
              validatedFormat.newLine = value;
            } else {
              invalidTypeProperties.push(`${key} (expected string, got ${typeof value})`);
            }
            break;
          case "trailingNewline":
            if (typeof value === "boolean" || typeof value === "number") {
              validatedFormat.trailingNewline = value;
            } else {
              invalidTypeProperties.push(`${key} (expected boolean or number, got ${typeof value})`);
            }
            break;
          case "trailingComma":
          case "bracketSpacing":
          case "truncateZeroTimeInDates":
            if (typeof value === "boolean") {
              validatedFormat[key] = value;
            } else {
              invalidTypeProperties.push(`${key} (expected boolean, got ${typeof value})`);
            }
            break;
          case "inlineTableStart":
            if (typeof value === "number" && Number.isInteger(value) && value >= 0) {
              validatedFormat.inlineTableStart = value;
            } else if (value === void 0 || value === null) {
              validatedFormat.inlineTableStart = value;
            } else {
              invalidTypeProperties.push(`${key} (expected non-negative integer or undefined, got ${typeof value})`);
            }
            break;
        }
      } else {
        unsupportedProperties.push(key);
      }
    }
  }
  if (unsupportedProperties.length > 0) {
    console.warn(`toml-patch: Ignoring unsupported format properties: ${unsupportedProperties.join(", ")}. Supported properties are: ${Array.from(supportedProperties).join(", ")}`);
  }
  if (invalidTypeProperties.length > 0) {
    throw new TypeError(`Invalid types for format properties: ${invalidTypeProperties.join(", ")}`);
  }
  return validatedFormat;
}
function resolveTomlFormat(format, fallbackFormat) {
  var _a, _b, _c, _d, _e;
  if (format) {
    if (format instanceof TomlFormat) {
      return format;
    } else {
      const validatedFormat = validateFormatObject(format);
      return new TomlFormat((_a = validatedFormat.newLine) !== null && _a !== void 0 ? _a : fallbackFormat.newLine, (_b = validatedFormat.trailingNewline) !== null && _b !== void 0 ? _b : fallbackFormat.trailingNewline, (_c = validatedFormat.trailingComma) !== null && _c !== void 0 ? _c : fallbackFormat.trailingComma, (_d = validatedFormat.bracketSpacing) !== null && _d !== void 0 ? _d : fallbackFormat.bracketSpacing, validatedFormat.inlineTableStart !== void 0 ? validatedFormat.inlineTableStart : fallbackFormat.inlineTableStart, (_e = validatedFormat.truncateZeroTimeInDates) !== null && _e !== void 0 ? _e : fallbackFormat.truncateZeroTimeInDates);
    }
  } else {
    return fallbackFormat;
  }
}
var TomlFormat = class _TomlFormat {
  // These options were part of the original TimHall's version and are not yet implemented
  //printWidth?: number;
  //tabWidth?: number;
  //useTabs?: boolean;
  constructor(newLine, trailingNewline, trailingComma, bracketSpacing, inlineTableStart, truncateZeroTimeInDates) {
    this.newLine = newLine !== null && newLine !== void 0 ? newLine : DEFAULT_NEWLINE;
    this.trailingNewline = trailingNewline !== null && trailingNewline !== void 0 ? trailingNewline : DEFAULT_TRAILING_NEWLINE;
    this.trailingComma = trailingComma !== null && trailingComma !== void 0 ? trailingComma : DEFAULT_TRAILING_COMMA;
    this.bracketSpacing = bracketSpacing !== null && bracketSpacing !== void 0 ? bracketSpacing : DEFAULT_BRACKET_SPACING;
    this.inlineTableStart = inlineTableStart !== null && inlineTableStart !== void 0 ? inlineTableStart : DEFAULT_INLINE_TABLE_START;
    this.truncateZeroTimeInDates = truncateZeroTimeInDates !== null && truncateZeroTimeInDates !== void 0 ? truncateZeroTimeInDates : DEFAULT_TRUNCATE_ZERO_TIME_IN_DATES;
  }
  /**
   * Creates a new TomlFormat instance with default formatting preferences.
   *
   * @returns A new TomlFormat instance with default values:
   *   - newLine: '\n'
   *   - trailingNewline: 1
   *   - trailingComma: false
   *   - bracketSpacing: true
   *   - inlineTableStart: 1
   *   - truncateZeroTimeInDates: false
   */
  static default() {
    return new _TomlFormat(DEFAULT_NEWLINE, DEFAULT_TRAILING_NEWLINE, DEFAULT_TRAILING_COMMA, DEFAULT_BRACKET_SPACING, DEFAULT_INLINE_TABLE_START, DEFAULT_TRUNCATE_ZERO_TIME_IN_DATES);
  }
  /**
   * Auto-detects formatting preferences from an existing TOML string.
   *
   * This method analyzes the provided TOML string to determine formatting
   * preferences such as line endings, trailing newlines, and comma usage.
   *
   * @param tomlString - The TOML string to analyze for formatting patterns
   * @returns A new TomlFormat instance with detected formatting preferences
   *
   * @example
   * ```typescript
   * const toml = 'array = ["a", "b", "c",]\ntable = { x = 1, y = 2, }';
   * const format = TomlFormat.autoDetectFormat(toml);
   * // format.trailingComma will be true
   * // format.newLine will be '\n'
   * // format.trailingNewline will be 0 (no trailing newline)
   * ```
   */
  static autoDetectFormat(tomlString) {
    const format = _TomlFormat.default();
    format.newLine = detectNewline(tomlString);
    format.trailingNewline = countTrailingNewlines(tomlString, format.newLine);
    try {
      const ast = parseTOML(tomlString);
      const astArray = Array.from(ast);
      format.trailingComma = detectTrailingComma(astArray);
      format.bracketSpacing = detectBracketSpacing(tomlString, astArray);
    } catch (error) {
      format.trailingComma = DEFAULT_TRAILING_COMMA;
      format.bracketSpacing = DEFAULT_BRACKET_SPACING;
    }
    format.inlineTableStart = DEFAULT_INLINE_TABLE_START;
    format.truncateZeroTimeInDates = DEFAULT_TRUNCATE_ZERO_TIME_IN_DATES;
    return format;
  }
};
function formatTopLevel(document, format) {
  if (format.inlineTableStart === 0) {
    return document;
  }
  const move_to_top_level = document.items.filter((item) => {
    if (!isKeyValue(item))
      return false;
    const is_inline_table = isInlineTable(item.value);
    const is_inline_array = isInlineArray(item.value) && item.value.items.length && isInlineTable(item.value.items[0].item);
    if (is_inline_table || is_inline_array) {
      const depth = calculateTableDepth(item.key.value);
      return format.inlineTableStart === void 0 || depth < format.inlineTableStart;
    }
    return false;
  });
  move_to_top_level.forEach((node) => {
    remove(document, document, node);
    if (isInlineTable(node.value)) {
      insert(document, document, formatTable(node));
    } else {
      formatTableArray(node).forEach((table_array) => {
        insert(document, document, table_array);
      });
    }
  });
  applyWrites(document);
  return document;
}
function formatTable(key_value) {
  const table2 = generateTable(key_value.key.value);
  for (const item of key_value.value.items) {
    insert(table2, table2, item.item);
  }
  applyWrites(table2);
  return table2;
}
function formatTableArray(key_value) {
  const root = generateDocument();
  for (const inline_array_item of key_value.value.items) {
    const table_array = generateTableArray(key_value.key.value);
    insert(root, root, table_array);
    for (const inline_table_item of inline_array_item.item.items) {
      insert(root, table_array, inline_table_item.item);
    }
  }
  applyWrites(root);
  return root.items;
}
function postInlineItemRemovalAdjustment(table2) {
  if (table2.items.length > 0) {
    const lastItem = table2.items[table2.items.length - 1];
    table2.loc.end.line = lastItem.loc.end.line;
    table2.loc.end.column = lastItem.loc.end.column;
  } else {
    table2.loc.end.line = table2.key.loc.end.line;
    table2.loc.end.column = table2.key.loc.end.column;
  }
}
function calculateTableDepth(keyPath) {
  return Math.max(0, keyPath.length - 1);
}
function formatNestedTablesMultiline(document, format) {
  if (format.inlineTableStart === void 0 || format.inlineTableStart === 0) {
    return document;
  }
  const additionalTables = [];
  for (const item of document.items) {
    if (isKeyValue(item) && isInlineTable(item.value)) {
      const depth = calculateTableDepth(item.key.value);
      if (depth < format.inlineTableStart) {
        const table2 = formatTable(item);
        remove(document, document, item);
        insert(document, document, table2);
        processTableForNestedInlines(table2, additionalTables, format);
      }
    } else if (item.type === "Table") {
      processTableForNestedInlines(item, additionalTables, format);
    }
  }
  for (const table2 of additionalTables) {
    insert(document, document, table2);
  }
  applyWrites(document);
  return document;
}
function processTableForNestedInlines(table2, additionalTables, format) {
  var _a;
  for (let i = table2.items.length - 1; i >= 0; i--) {
    const item = table2.items[i];
    if (isKeyValue(item) && isInlineTable(item.value)) {
      const nestedTableKey = [...table2.key.item.value, ...item.key.value];
      const depth = calculateTableDepth(nestedTableKey);
      if (depth < ((_a = format.inlineTableStart) !== null && _a !== void 0 ? _a : 1)) {
        const separateTable = generateTable(nestedTableKey);
        for (const inlineItem of item.value.items) {
          insert(separateTable, separateTable, inlineItem.item);
        }
        remove(table2, table2, item);
        postInlineItemRemovalAdjustment(table2);
        additionalTables.push(separateTable);
        processTableForNestedInlines(separateTable, additionalTables, format);
      }
    }
  }
}
function formatPrintWidth(document, format) {
  return document;
}
function formatEmptyLines(document) {
  let shift = 0;
  let previous = 0;
  for (const item of document.items) {
    if (previous === 0 && item.loc.start.line > 1) {
      shift = 1 - item.loc.start.line;
    } else if (item.loc.start.line + shift > previous + 2) {
      shift += previous + 2 - (item.loc.start.line + shift);
    }
    shiftNode(item, {
      lines: shift,
      columns: 0
    });
    previous = item.loc.end.line;
  }
  return document;
}
function parseJS(value, format = TomlFormat.default()) {
  value = toJSON(value);
  value = reorderElements(value);
  const document = generateDocument();
  for (const item of walkObject(value, format)) {
    insert(document, document, item);
  }
  applyWrites(document);
  const formatted = pipe(document, (document2) => formatTopLevel(document2, format), (document2) => formatNestedTablesMultiline(document2, format), (document2) => formatPrintWidth(document2));
  return formatEmptyLines(formatted);
}
function reorderElements(value) {
  const simpleKeys = [];
  const complexKeys = [];
  for (const key in value) {
    if (isObject(value[key]) || Array.isArray(value[key])) {
      complexKeys.push(key);
    } else {
      simpleKeys.push(key);
    }
  }
  const result = {};
  for (let i = 0; i < simpleKeys.length; i++) {
    const key = simpleKeys[i];
    result[key] = value[key];
  }
  for (let i = 0; i < complexKeys.length; i++) {
    const key = complexKeys[i];
    result[key] = value[key];
  }
  return result;
}
function* walkObject(object, format) {
  for (const key of Object.keys(object)) {
    yield generateKeyValue([key], walkValue(object[key], format));
  }
}
function walkValue(value, format) {
  if (value == null) {
    throw new Error('"null" and "undefined" values are not supported');
  }
  if (isString(value)) {
    return generateString(value);
  } else if (isInteger(value)) {
    return generateInteger(value);
  } else if (isFloat(value)) {
    return generateFloat(value);
  } else if (isBoolean(value)) {
    return generateBoolean(value);
  } else if (isDate(value)) {
    return generateDateTime(value, format);
  } else if (Array.isArray(value)) {
    return walkInlineArray(value, format);
  } else {
    return walkInlineTable(value, format);
  }
}
function walkInlineArray(value, format) {
  const inline_array = generateInlineArray();
  for (const element of value) {
    const item = walkValue(element, format);
    const inline_array_item = generateInlineItem(item);
    insert(inline_array, inline_array, inline_array_item);
  }
  applyBracketSpacing(inline_array, inline_array, format.bracketSpacing);
  applyTrailingComma(inline_array, inline_array, format.trailingComma);
  applyWrites(inline_array);
  return inline_array;
}
function walkInlineTable(value, format) {
  value = toJSON(value);
  if (!isObject(value))
    return walkValue(value, format);
  const inline_table = generateInlineTable();
  const items = [...walkObject(value, format)];
  for (const item of items) {
    const inline_table_item = generateInlineItem(item);
    insert(inline_table, inline_table, inline_table_item);
  }
  applyBracketSpacing(inline_table, inline_table, format.bracketSpacing);
  applyTrailingComma(inline_table, inline_table, format.trailingComma);
  applyWrites(inline_table);
  return inline_table;
}
function toJSON(value) {
  if (!value) {
    return value;
  }
  if (isDate(value)) {
    return value;
  }
  if (typeof value.toJSON === "function") {
    return value.toJSON();
  }
  return value;
}
var BY_NEW_LINE = /(\r\n|\n)/g;
function toTOML(ast, format) {
  const lines = [];
  traverse(ast, {
    [NodeType.TableKey](node) {
      const { start, end } = node.loc;
      write(lines, { start, end: { line: start.line, column: start.column + 1 } }, "[");
      write(lines, { start: { line: end.line, column: end.column - 1 }, end }, "]");
    },
    [NodeType.TableArrayKey](node) {
      const { start, end } = node.loc;
      write(lines, { start, end: { line: start.line, column: start.column + 2 } }, "[[");
      write(lines, { start: { line: end.line, column: end.column - 2 }, end }, "]]");
    },
    [NodeType.KeyValue](node) {
      const { start: { line } } = node.loc;
      write(lines, { start: { line, column: node.equals }, end: { line, column: node.equals + 1 } }, "=");
    },
    [NodeType.Key](node) {
      write(lines, node.loc, node.raw);
    },
    [NodeType.String](node) {
      write(lines, node.loc, node.raw);
    },
    [NodeType.Integer](node) {
      write(lines, node.loc, node.raw);
    },
    [NodeType.Float](node) {
      write(lines, node.loc, node.raw);
    },
    [NodeType.Boolean](node) {
      write(lines, node.loc, node.value.toString());
    },
    [NodeType.DateTime](node) {
      write(lines, node.loc, node.raw);
    },
    [NodeType.InlineArray](node) {
      const { start, end } = node.loc;
      write(lines, { start, end: { line: start.line, column: start.column + 1 } }, "[");
      write(lines, { start: { line: end.line, column: end.column - 1 }, end }, "]");
    },
    [NodeType.InlineTable](node) {
      const { start, end } = node.loc;
      write(lines, { start, end: { line: start.line, column: start.column + 1 } }, "{");
      write(lines, { start: { line: end.line, column: end.column - 1 }, end }, "}");
    },
    [NodeType.InlineItem](node) {
      if (!node.comma)
        return;
      const start = node.loc.end;
      write(lines, { start, end: { line: start.line, column: start.column + 1 } }, ",");
    },
    [NodeType.Comment](node) {
      write(lines, node.loc, node.raw);
    }
  });
  return lines.join(format.newLine) + format.newLine.repeat(format.trailingNewline);
}
function write(lines, loc, raw) {
  const raw_lines = raw.split(BY_NEW_LINE).filter((line) => line !== "\n" && line !== "\r\n");
  const expected_lines = loc.end.line - loc.start.line + 1;
  if (raw_lines.length !== expected_lines) {
    throw new Error(`Mismatch between location and raw string, expected ${expected_lines} lines for "${raw}"`);
  }
  for (let i = loc.start.line; i <= loc.end.line; i++) {
    const line = getLine(lines, i);
    if (line === void 0) {
      throw new Error(`Line ${i} is uninitialized when writing "${raw}" at ${loc.start.line}:${loc.start.column} to ${loc.end.line}:${loc.end.column}`);
    }
    const is_start_line = i === loc.start.line;
    const is_end_line = i === loc.end.line;
    const before = is_start_line ? line.substr(0, loc.start.column).padEnd(loc.start.column, SPACE) : "";
    const after = is_end_line ? line.substr(loc.end.column) : "";
    lines[i - 1] = before + raw_lines[i - loc.start.line] + after;
  }
}
function getLine(lines, index) {
  if (!lines[index - 1]) {
    for (let i = 0; i < index; i++) {
      if (!lines[i])
        lines[i] = "";
    }
  }
  return lines[index - 1];
}
function toJS(ast, input = "") {
  const result = blank();
  const tables = /* @__PURE__ */ new Set();
  const table_arrays = /* @__PURE__ */ new Set();
  const defined = /* @__PURE__ */ new Set();
  let active = result;
  let skip_depth = 0;
  traverse(ast, {
    [NodeType.Table](node) {
      const key = node.key.item.value;
      try {
        validateKey(result, key, node.type, { tables, table_arrays, defined });
      } catch (err) {
        const e = err;
        throw new ParseError(input, node.key.loc.start, e.message);
      }
      const joined_key = joinKey(key);
      tables.add(joined_key);
      defined.add(joined_key);
      active = ensureTable(result, key);
    },
    [NodeType.TableArray](node) {
      const key = node.key.item.value;
      try {
        validateKey(result, key, node.type, { tables, table_arrays, defined });
      } catch (err) {
        const e = err;
        throw new ParseError(input, node.key.loc.start, e.message);
      }
      const joined_key = joinKey(key);
      table_arrays.add(joined_key);
      defined.add(joined_key);
      active = ensureTableArray(result, key);
    },
    [NodeType.KeyValue]: {
      enter(node) {
        if (skip_depth > 0)
          return;
        const key = node.key.value;
        try {
          validateKey(active, key, node.type, { tables, table_arrays, defined });
        } catch (err) {
          const e = err;
          throw new ParseError(input, node.key.loc.start, e.message);
        }
        const value = toValue(node.value);
        const target = key.length > 1 ? ensureTable(active, key.slice(0, -1)) : active;
        target[last(key)] = value;
        defined.add(joinKey(key));
      }
    },
    [NodeType.InlineTable]: {
      enter() {
        skip_depth++;
      },
      exit() {
        skip_depth--;
      }
    }
  });
  return result;
}
function toValue(node) {
  switch (node.type) {
    case NodeType.InlineTable:
      const result = blank();
      node.items.forEach(({ item }) => {
        const key = item.key.value;
        const value = toValue(item.value);
        const target = key.length > 1 ? ensureTable(result, key.slice(0, -1)) : result;
        target[last(key)] = value;
      });
      return result;
    case NodeType.InlineArray:
      return node.items.map((item) => toValue(item.item));
    case NodeType.String:
    case NodeType.Integer:
    case NodeType.Float:
    case NodeType.Boolean:
    case NodeType.DateTime:
      return node.value;
    default:
      throw new Error(`Unrecognized value type "${node.type}"`);
  }
}
function validateKey(object, key, type, state) {
  let parts = [];
  let index = 0;
  for (const part of key) {
    parts.push(part);
    if (!has(object, part))
      return;
    if (isPrimitive(object[part])) {
      throw new Error(`Invalid key, a value has already been defined for ${parts.join(".")}`);
    }
    const joined_parts = joinKey(parts);
    if (Array.isArray(object[part]) && !state.table_arrays.has(joined_parts)) {
      throw new Error(`Invalid key, cannot add to a static array at ${joined_parts}`);
    }
    const next_is_last = index++ < key.length - 1;
    object = Array.isArray(object[part]) && next_is_last ? last(object[part]) : object[part];
  }
  const joined_key = joinKey(key);
  if (object && type === NodeType.Table && state.defined.has(joined_key)) {
    throw new Error(`Invalid key, a table has already been defined named ${joined_key}`);
  }
  if (object && type === NodeType.TableArray && !state.table_arrays.has(joined_key)) {
    throw new Error(`Invalid key, cannot add an array of tables to a table at ${joined_key}`);
  }
}
function ensureTable(object, key) {
  const target = ensure(object, key.slice(0, -1));
  const last_key = last(key);
  if (!target[last_key]) {
    target[last_key] = blank();
  }
  return target[last_key];
}
function ensureTableArray(object, key) {
  const target = ensure(object, key.slice(0, -1));
  const last_key = last(key);
  if (!target[last_key]) {
    target[last_key] = [];
  }
  const next = blank();
  target[last(key)].push(next);
  return next;
}
function ensure(object, keys) {
  return keys.reduce((active, subkey) => {
    if (!active[subkey]) {
      active[subkey] = blank();
    }
    return Array.isArray(active[subkey]) ? last(active[subkey]) : active[subkey];
  }, object);
}
function isPrimitive(value) {
  return typeof value !== "object" && !isDate(value);
}
function joinKey(key) {
  return key.join(".");
}
var ChangeType;
(function(ChangeType2) {
  ChangeType2["Add"] = "Add";
  ChangeType2["Edit"] = "Edit";
  ChangeType2["Remove"] = "Remove";
  ChangeType2["Move"] = "Move";
  ChangeType2["Rename"] = "Rename";
})(ChangeType || (ChangeType = {}));
function isAdd(change) {
  return change.type === ChangeType.Add;
}
function isEdit(change) {
  return change.type === ChangeType.Edit;
}
function isRemove(change) {
  return change.type === ChangeType.Remove;
}
function isMove(change) {
  return change.type === ChangeType.Move;
}
function isRename(change) {
  return change.type === ChangeType.Rename;
}
function diff(before, after, path = []) {
  if (before === after || datesEqual(before, after)) {
    return [];
  }
  if (Array.isArray(before) && Array.isArray(after)) {
    return compareArrays(before, after, path);
  } else if (isObject(before) && isObject(after)) {
    return compareObjects(before, after, path);
  } else {
    return [
      {
        type: ChangeType.Edit,
        path
      }
    ];
  }
}
function compareObjects(before, after, path = []) {
  let changes = [];
  const before_keys = Object.keys(before);
  const before_stable = before_keys.map((key) => stableStringify(before[key]));
  const after_keys = Object.keys(after);
  const after_stable = after_keys.map((key) => stableStringify(after[key]));
  const isRename2 = (stable, search) => {
    const index = search.indexOf(stable);
    if (index < 0)
      return false;
    const before_key = before_keys[before_stable.indexOf(stable)];
    return !after_keys.includes(before_key);
  };
  before_keys.forEach((key, index) => {
    const sub_path = path.concat(key);
    if (after_keys.includes(key)) {
      merge(changes, diff(before[key], after[key], sub_path));
    } else if (isRename2(before_stable[index], after_stable)) {
      const to = after_keys[after_stable.indexOf(before_stable[index])];
      changes.push({
        type: ChangeType.Rename,
        path,
        from: key,
        to
      });
    } else {
      changes.push({
        type: ChangeType.Remove,
        path: sub_path
      });
    }
  });
  after_keys.forEach((key, index) => {
    if (!before_keys.includes(key) && !isRename2(after_stable[index], before_stable)) {
      changes.push({
        type: ChangeType.Add,
        path: path.concat(key)
      });
    }
  });
  return changes;
}
function compareArrays(before, after, path = []) {
  let changes = [];
  const before_stable = before.map(stableStringify);
  const after_stable = after.map(stableStringify);
  after_stable.forEach((value, index) => {
    const overflow = index >= before_stable.length;
    if (!overflow && before_stable[index] === value) {
      return;
    }
    const from = before_stable.indexOf(value, index + 1);
    if (!overflow && from > -1) {
      changes.push({
        type: ChangeType.Move,
        path,
        from,
        to: index
      });
      const move = before_stable.splice(from, 1);
      before_stable.splice(index, 0, ...move);
      return;
    }
    const removed = !after_stable.includes(before_stable[index]);
    if (!overflow && removed) {
      merge(changes, diff(before[index], after[index], path.concat(index)));
      before_stable[index] = value;
      return;
    }
    changes.push({
      type: ChangeType.Add,
      path: path.concat(index)
    });
    before_stable.splice(index, 0, value);
  });
  for (let i = after_stable.length; i < before_stable.length; i++) {
    changes.push({
      type: ChangeType.Remove,
      path: path.concat(i)
    });
  }
  return changes;
}
function findByPath(node, path) {
  if (!path.length) {
    if (isInlineItem(node) && isKeyValue(node.item)) {
      return node.item;
    }
    return node;
  }
  if (isKeyValue(node)) {
    return findByPath(node.value, path);
  }
  const indexes = {};
  let found;
  if (hasItems(node)) {
    node.items.some((item, index) => {
      try {
        let key = [];
        if (isKeyValue(item)) {
          key = item.key.value;
        } else if (isTable(item)) {
          key = item.key.item.value;
        } else if (isTableArray(item)) {
          key = item.key.item.value;
          const key_string = stableStringify(key);
          if (!indexes[key_string]) {
            indexes[key_string] = 0;
          }
          const array_index = indexes[key_string]++;
          key = key.concat(array_index);
        } else if (isInlineItem(item) && isKeyValue(item.item)) {
          key = item.item.key.value;
        } else if (isInlineItem(item)) {
          key = [index];
        }
        if (key.length && arraysEqual(key, path.slice(0, key.length))) {
          found = findByPath(item, path.slice(key.length));
          return true;
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }
    });
  }
  if (!found) {
    throw new Error(`Could not find node at path ${path.join(".")}`);
  }
  return found;
}
function tryFindByPath(node, path) {
  try {
    return findByPath(node, path);
  } catch (err) {
  }
}
function findParent(node, path) {
  let parent_path = path;
  let parent;
  while (parent_path.length && !parent) {
    parent_path = parent_path.slice(0, -1);
    parent = tryFindByPath(node, parent_path);
  }
  if (!parent) {
    throw new Error(`Count not find parent node for path ${path.join(".")}`);
  }
  return parent;
}
function patch(existing, updated, format) {
  const existing_ast = parseTOML(existing);
  const autoDetectedFormat = TomlFormat.autoDetectFormat(existing);
  const fmt = resolveTomlFormat(format, autoDetectedFormat);
  return patchAst(existing_ast, updated, fmt).tomlString;
}
function patchAst(existing_ast, updated, format) {
  const items = [...existing_ast];
  const existing_js = toJS(items);
  const existing_document = {
    type: NodeType.Document,
    loc: { start: { line: 1, column: 0 }, end: { line: 1, column: 0 } },
    items
  };
  const diffing_fmt = resolveTomlFormat(Object.assign(Object.assign({}, format), { inlineTableStart: void 0 }), format);
  const updated_document = parseJS(updated, diffing_fmt);
  const changes = reorder(diff(existing_js, updated));
  if (changes.length === 0) {
    return {
      tomlString: toTOML(items, format),
      document: existing_document
    };
  }
  const patched_document = applyChanges(existing_document, updated_document, changes, format);
  return {
    tomlString: toTOML(patched_document.items, format),
    document: patched_document
  };
}
function reorder(changes) {
  for (let i = 0; i < changes.length; i++) {
    const change = changes[i];
    if (isRemove(change)) {
      let j = i + 1;
      while (j < changes.length) {
        const next_change = changes[j];
        if (isRemove(next_change) && next_change.path[0] === change.path[0] && next_change.path[1] > change.path[1]) {
          changes.splice(j, 1);
          changes.splice(i, 0, next_change);
          i = 0;
          break;
        }
        j++;
      }
    }
  }
  return changes;
}
function preserveFormatting(existing, replacement) {
  if (isString$1(existing) && isString$1(replacement) && isMultilineString(existing.raw)) {
    const newString = generateString(replacement.value, existing.raw);
    replacement.raw = newString.raw;
    replacement.loc = newString.loc;
  }
  if (isDateTime(existing) && isDateTime(replacement)) {
    const originalRaw = existing.raw;
    const newValue = replacement.value;
    const formattedDate = DateFormatHelper.createDateWithOriginalFormat(newValue, originalRaw);
    replacement.value = formattedDate;
    replacement.raw = formattedDate.toISOString();
    const lengthDiff = replacement.raw.length - originalRaw.length;
    if (lengthDiff !== 0) {
      replacement.loc.end.column = replacement.loc.start.column + replacement.raw.length;
    }
  }
  if (isInlineArray(existing) && isInlineArray(replacement)) {
    const originalHadTrailingCommas = arrayHadTrailingCommas(existing);
    if (replacement.items.length > 0) {
      const lastItem = replacement.items[replacement.items.length - 1];
      lastItem.comma = originalHadTrailingCommas;
    }
  }
  if (isInlineTable(existing) && isInlineTable(replacement)) {
    const originalHadTrailingCommas = tableHadTrailingCommas(existing);
    if (replacement.items.length > 0) {
      const lastItem = replacement.items[replacement.items.length - 1];
      lastItem.comma = originalHadTrailingCommas;
    }
  }
}
function applyChanges(original, updated, changes, format) {
  changes.forEach((change) => {
    if (isAdd(change)) {
      const child = findByPath(updated, change.path);
      const parent_path = change.path.slice(0, -1);
      let index = last(change.path);
      let is_table_array = isTableArray(child);
      if (isInteger(index) && !parent_path.some(isInteger)) {
        const sibling = tryFindByPath(original, parent_path.concat(0));
        if (sibling && isTableArray(sibling)) {
          is_table_array = true;
        }
      }
      let parent;
      if (isTable(child)) {
        parent = original;
      } else if (is_table_array) {
        parent = original;
        const document = original;
        const before = tryFindByPath(document, parent_path.concat(index - 1));
        const after = tryFindByPath(document, parent_path.concat(index));
        if (after) {
          index = document.items.indexOf(after);
        } else if (before) {
          index = document.items.indexOf(before) + 1;
        } else {
          index = document.items.length;
        }
      } else {
        parent = findParent(original, change.path);
        if (isKeyValue(parent)) {
          parent = parent.value;
        }
      }
      if (isTableArray(parent) || isInlineArray(parent) || isDocument(parent)) {
        if (isInlineArray(parent)) {
          const originalHadTrailingCommas = arrayHadTrailingCommas(parent);
          if (isInlineItem(child)) {
            child.comma = originalHadTrailingCommas;
          }
        }
        if (format.inlineTableStart !== void 0 && format.inlineTableStart > 0 && isDocument(parent) && isTable(child)) {
          const additionalTables = convertNestedInlineTablesToMultiline(child, original, format);
          insert(original, parent, child, index);
          for (const table2 of additionalTables) {
            insert(original, original, table2, void 0);
          }
        } else {
          insert(original, parent, child, index);
        }
      } else if (isInlineTable(parent)) {
        const originalHadTrailingCommas = tableHadTrailingCommas(parent);
        if (isKeyValue(child)) {
          const inlineItem = generateInlineItem(child);
          inlineItem.comma = originalHadTrailingCommas;
          insert(original, parent, inlineItem);
        } else {
          insert(original, parent, child);
        }
      } else {
        if (format.inlineTableStart !== void 0 && format.inlineTableStart > 0 && isKeyValue(child) && isInlineTable(child.value) && isTable(parent)) {
          const baseTableKey = parent.key.item.value;
          const nestedTableKey = [...baseTableKey, ...child.key.value];
          const depth = calculateTableDepth(nestedTableKey);
          if (depth < format.inlineTableStart) {
            convertInlineTableToSeparateSection(child, parent, original, format);
          } else {
            insert(original, parent, child);
          }
        } else if (format.inlineTableStart === 0 && isKeyValue(child) && isInlineTable(child.value) && isDocument(parent)) {
          insert(original, parent, child, void 0, true);
        } else {
          insert(original, parent, child);
        }
      }
    } else if (isEdit(change)) {
      let existing = findByPath(original, change.path);
      let replacement = findByPath(updated, change.path);
      let parent;
      if (isKeyValue(existing) && isKeyValue(replacement)) {
        preserveFormatting(existing.value, replacement.value);
        parent = existing;
        existing = existing.value;
        replacement = replacement.value;
      } else if (isKeyValue(existing) && isInlineItem(replacement) && isKeyValue(replacement.item)) {
        parent = existing;
        existing = existing.value;
        replacement = replacement.item.value;
      } else if (isInlineItem(existing) && isKeyValue(replacement)) {
        parent = existing;
        existing = existing.item;
      } else {
        parent = findParent(original, change.path);
        if (isKeyValue(parent)) {
          const parentPath = change.path.slice(0, -1);
          const arrayNode = findByPath(original, parentPath);
          if (isKeyValue(arrayNode) && isInlineArray(arrayNode.value)) {
            parent = arrayNode.value;
          }
        }
      }
      replace(original, parent, existing, replacement);
    } else if (isRemove(change)) {
      let parent = findParent(original, change.path);
      if (isKeyValue(parent))
        parent = parent.value;
      const node = findByPath(original, change.path);
      remove(original, parent, node);
    } else if (isMove(change)) {
      let parent = findByPath(original, change.path);
      if (hasItem(parent))
        parent = parent.item;
      if (isKeyValue(parent))
        parent = parent.value;
      const node = parent.items[change.from];
      remove(original, parent, node);
      insert(original, parent, node, change.to);
    } else if (isRename(change)) {
      let parent = findByPath(original, change.path.concat(change.from));
      let replacement = findByPath(updated, change.path.concat(change.to));
      if (hasItem(parent))
        parent = parent.item;
      if (hasItem(replacement))
        replacement = replacement.item;
      replace(original, parent, parent.key, replacement.key);
    }
  });
  applyWrites(original);
  return original;
}
function convertNestedInlineTablesToMultiline(table2, original, format) {
  const additionalTables = [];
  const processTableForNestedInlines2 = (currentTable, tablesToAdd) => {
    var _a;
    for (let i = currentTable.items.length - 1; i >= 0; i--) {
      const item = currentTable.items[i];
      if (isKeyValue(item) && isInlineTable(item.value)) {
        const nestedTableKey = [...currentTable.key.item.value, ...item.key.value];
        const depth = calculateTableDepth(nestedTableKey);
        if (depth < ((_a = format.inlineTableStart) !== null && _a !== void 0 ? _a : 1) && format.inlineTableStart !== 0) {
          const separateTable = generateTable(nestedTableKey);
          for (const inlineItem of item.value.items) {
            if (isInlineItem(inlineItem) && isKeyValue(inlineItem.item)) {
              insert(original, separateTable, inlineItem.item, void 0);
            }
          }
          currentTable.items.splice(i, 1);
          postInlineItemRemovalAdjustment(currentTable);
          tablesToAdd.push(separateTable);
          processTableForNestedInlines2(separateTable, tablesToAdd);
        }
      }
    }
  };
  processTableForNestedInlines2(table2, additionalTables);
  return additionalTables;
}
function convertInlineTableToSeparateSection(child, parent, original, format) {
  const baseTableKey = parent.key.item.value;
  const nestedTableKey = [...baseTableKey, ...child.key.value];
  const separateTable = generateTable(nestedTableKey);
  if (isInlineTable(child.value)) {
    for (const inlineItem of child.value.items) {
      if (isInlineItem(inlineItem) && isKeyValue(inlineItem.item)) {
        insert(original, separateTable, inlineItem.item, void 0);
      }
    }
  }
  insert(original, original, separateTable, void 0);
  postInlineItemRemovalAdjustment(parent);
  const additionalTables = convertNestedInlineTablesToMultiline(separateTable, original, format);
  for (const table2 of additionalTables) {
    insert(original, original, table2, void 0);
  }
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function comparePositions(pos1, pos2) {
  if (pos1.line !== pos2.line) {
    return pos1.line - pos2.line;
  }
  return pos1.column - pos2.column;
}
function truncateAst(ast, line, column) {
  const limit = { line, column };
  const nodes = [];
  let lastEndPosition = null;
  for (const node of ast) {
    const nodeEndsBeforeLimit = comparePositions(node.loc.end, limit) < 0;
    const nodeStartsBeforeLimit = comparePositions(node.loc.start, limit) < 0;
    if (nodeEndsBeforeLimit) {
      nodes.push(node);
      lastEndPosition = node.loc.end;
    } else if (nodeStartsBeforeLimit && !nodeEndsBeforeLimit) {
      break;
    } else {
      break;
    }
  }
  return {
    truncatedAst: nodes,
    lastEndPosition
  };
}
var _TomlDocument_ast;
var _TomlDocument_currentTomlString;
var _TomlDocument_Format;
var TomlDocument = class {
  /**
   * Initializes the TomlDocument with a TOML string, parsing it into an AST.
   * @param tomlString - The TOML string to parse
   */
  constructor(tomlString) {
    _TomlDocument_ast.set(this, void 0);
    _TomlDocument_currentTomlString.set(this, void 0);
    _TomlDocument_Format.set(this, void 0);
    __classPrivateFieldSet(this, _TomlDocument_currentTomlString, tomlString, "f");
    __classPrivateFieldSet(this, _TomlDocument_ast, Array.from(parseTOML(tomlString)), "f");
    __classPrivateFieldSet(this, _TomlDocument_Format, TomlFormat.autoDetectFormat(tomlString), "f");
  }
  get toTomlString() {
    return __classPrivateFieldGet(this, _TomlDocument_currentTomlString, "f");
  }
  /**
   * Returns the JavaScript object representation of the TOML document.
   */
  get toJsObject() {
    const jsObject = toJS(__classPrivateFieldGet(this, _TomlDocument_ast, "f"));
    return convertCustomDateClasses(jsObject);
  }
  /**
   * Returns the internal AST (for testing purposes).
   * @internal
   */
  get ast() {
    return __classPrivateFieldGet(this, _TomlDocument_ast, "f");
  }
  /**
   * Applies a patch to the current AST using a modified JS object.
   * Updates the internal AST. Use toTomlString getter to retrieve the updated TOML string.
   * @param updatedObject - The modified JS object to patch with
   * @param format - Optional formatting options
   */
  patch(updatedObject, format) {
    const fmt = resolveTomlFormat(format, __classPrivateFieldGet(this, _TomlDocument_Format, "f"));
    const { tomlString, document } = patchAst(__classPrivateFieldGet(this, _TomlDocument_ast, "f"), updatedObject, fmt);
    __classPrivateFieldSet(this, _TomlDocument_ast, document.items, "f");
    __classPrivateFieldSet(this, _TomlDocument_currentTomlString, tomlString, "f");
  }
  /**
   * Updates the internal document by supplying a modified tomlString.
   * Use toJsObject getter to retrieve the updated JS object representation.
   * @param tomlString - The modified TOML string to update with
   */
  update(tomlString) {
    if (tomlString === this.toTomlString) {
      return;
    }
    const existingLines = this.toTomlString.split(__classPrivateFieldGet(this, _TomlDocument_Format, "f").newLine);
    const newLineChar = detectNewline(tomlString);
    const newTextLines = tomlString.split(newLineChar);
    let firstDiffLineIndex = 0;
    while (firstDiffLineIndex < existingLines.length && firstDiffLineIndex < newTextLines.length && existingLines[firstDiffLineIndex] === newTextLines[firstDiffLineIndex]) {
      firstDiffLineIndex++;
    }
    let firstDiffColumn = 0;
    if (firstDiffLineIndex < existingLines.length && firstDiffLineIndex < newTextLines.length) {
      const existingLine = existingLines[firstDiffLineIndex];
      const newLine = newTextLines[firstDiffLineIndex];
      for (let i = 0; i < Math.max(existingLine.length, newLine.length); i++) {
        if (existingLine[i] !== newLine[i]) {
          firstDiffColumn = i;
          break;
        }
      }
    }
    let firstDiffLine = firstDiffLineIndex + 1;
    const { truncatedAst, lastEndPosition } = truncateAst(__classPrivateFieldGet(this, _TomlDocument_ast, "f"), firstDiffLine, firstDiffColumn);
    const continueFromLine = lastEndPosition ? lastEndPosition.line : 1;
    const continueFromColumn = lastEndPosition ? lastEndPosition.column + 1 : 0;
    const remainingLines = newTextLines.slice(continueFromLine - 1);
    if (remainingLines.length > 0 && continueFromColumn > 0) {
      remainingLines[0] = remainingLines[0].substring(continueFromColumn);
    }
    const remainingToml = remainingLines.join(__classPrivateFieldGet(this, _TomlDocument_Format, "f").newLine);
    __classPrivateFieldSet(this, _TomlDocument_ast, Array.from(continueParsingTOML(truncatedAst, remainingToml)), "f");
    __classPrivateFieldSet(this, _TomlDocument_currentTomlString, tomlString, "f");
    __classPrivateFieldSet(this, _TomlDocument_Format, TomlFormat.autoDetectFormat(tomlString), "f");
  }
  /**
   * Overwrites the internal AST by fully re-parsing the supplied tomlString.
   * This is simpler but slower than update() which uses incremental parsing.
   * @param tomlString - The TOML string to overwrite with
   */
  overwrite(tomlString) {
    if (tomlString === this.toTomlString) {
      return;
    }
    __classPrivateFieldSet(this, _TomlDocument_ast, Array.from(parseTOML(tomlString)), "f");
    __classPrivateFieldSet(this, _TomlDocument_currentTomlString, tomlString, "f");
    __classPrivateFieldSet(this, _TomlDocument_Format, TomlFormat.autoDetectFormat(tomlString), "f");
  }
};
_TomlDocument_ast = /* @__PURE__ */ new WeakMap(), _TomlDocument_currentTomlString = /* @__PURE__ */ new WeakMap(), _TomlDocument_Format = /* @__PURE__ */ new WeakMap();
function convertCustomDateClasses(obj) {
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  } else if (Array.isArray(obj)) {
    return obj.map(convertCustomDateClasses);
  } else if (obj && typeof obj === "object") {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = convertCustomDateClasses(value);
    }
    return result;
  }
  return obj;
}
function parse(value) {
  return toJS(parseTOML(value), value);
}
function stringify(value, format) {
  const fmt = resolveTomlFormat(format, TomlFormat.default());
  const document = parseJS(value, fmt);
  return toTOML(document.items, fmt);
}
export {
  TomlDocument,
  TomlFormat,
  parse,
  patch,
  stringify
};
//# sourceMappingURL=@decimalturn_toml-patch.js.map
