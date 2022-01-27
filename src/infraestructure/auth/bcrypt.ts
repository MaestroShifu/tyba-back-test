import bcrypt from 'bcryptjs';

const passwordEncrypt = (password: string): string => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

const passwordValidate = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};

export { passwordEncrypt, passwordValidate };
