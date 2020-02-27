import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

import { UserExistError, UnAuthorizedError, NotFoundError } from '../helpers/errors';

const { SALTROUNDS = 10 } = process.env;

export default class Users extends Model {
  private static __tablename__: string = 'USERS';
  private static modelFields = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  };

  static __init__(sequelize) {
    const model = this.init(this.modelFields, { tableName: this.__tablename__, sequelize, timestamps: false });
    
    this.beforeCreate(this.beforeCreateHook);
    
    return model;
  }

  static beforeCreateHook(user) {
    return this.encryptPassword(user);
  }

  static async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  static encryptPassword = async (user) => {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;

    return user;
  };
  
  static async signup({ username, password }) {
    const existingUser = await this.findOne({ where: { username } });

    if (existingUser) throw UserExistError(username);

    const user = await this.create({ username, password });
    
    return user.toJSON();
  }

  static async login({ username, password }) {
    const existingUser = await this.findOne({ where: { username } });

    if (!existingUser) throw NotFoundError("User not found");
    
    const passwordValid = await this.comparePassword(password, existingUser.password);

    if (!passwordValid) throw UnAuthorizedError();
        
    return existingUser.toJSON();
  }
}
