import * as bcrypt from 'bcrypt';

export const createHashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const checkPassword = async (
  inputPasword: string,
  userPassword: string,
): Promise<boolean> => {
  const isPasswordValid = await bcrypt.compare(inputPasword, userPassword);

  return isPasswordValid;
};
