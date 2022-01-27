import debug, { Debugger } from 'debug';

/**
 * Type of Formatter
 *
 * [%O] - Pretty-print an Object on multiple lines.
 * [%o] - Pretty-print an Object all on a single line.
 * [%s] - String.
 * [%d] - Number (both integer and float).
 * [%j] - JSON. Replaced with the string '[Circular]' if the argument contains circular references.
 * [%%] - Single percent sign ('%'). This does not consume an argument.
 *
 */
const logger = (fileName: string): Debugger => {
  const log = debug(`Server:${fileName}`);
  return log;
};

export default logger;
