import Models from '@models/index';
import { generateToken }from '@helpers/auth';

const { Users } = Models;

declare const debug;


export const SignUpController = async (req, res) => {
  const { username, password } = req.body;
  
  const { password: pwd, ...data } = await Users.signup({ username, password });

  return { data: { ...data, token: generateToken(data.id) }, message: 'Signup sucessfull', status: 201 };
};

export const LoginController = async (req, res) => {
  const { username, password } = req.body;
  
  const { password: pwd, ...data } = await Users.login({ username, password });

  return { data: { ...data, token: generateToken(data.id) }, message: 'Login sucessfull' };
};

