const genericValidator = (regex: RegExp | string, field: string): boolean => {
  const regexp = new RegExp(regex);
  return regexp.test(field);
};

export const validEmail = (field: string): boolean =>
  genericValidator(/\S+@\S+\.\S+/, field);

export const validOnlyLetters = (field: string): boolean =>
  genericValidator('^[A-Za-z ]+$', field);
