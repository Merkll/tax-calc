import { Model, DataTypes } from 'sequelize';
import { AppError } from '../helpers/errors';

export default class DagrationScale extends Model {
  private static __tablename__: string = 'GRADATION_SCALE';
  private static modelFields = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    monthlyAmount: DataTypes.INTEGER,
    rate: DataTypes.INTEGER,
    order: DataTypes.INTEGER,
  };

  static __init__(sequelize) {
    const model = this.init(this.modelFields, { tableName: this.__tablename__, sequelize, timestamps: false });

    return model;
  }

  static async addMultiple(degrations) {   
    const inserted = degrations.map(async (degration) => this.addOne(degration, true))

    return Promise.all(inserted);
  }

  static async addOne(degration, force = false) {
    const { order, rate, amount} = degration;

    if (!order && order !== 0) throw AppError(409, "Order of degration not specified");
    if (!rate || !amount) throw AppError(409, "Rate and amount required");

    const existingOrder = await this.findOne({ where: { order } })
    
    if (existingOrder && !force) throw AppError(409, "Dagration with order already exists. Provide a query param 'force=true' to force update the existing order");
    
    if (existingOrder) await existingOrder.destroy();

    const dagration = await this.create({ order, rate, monthlyAmount: amount })

    return dagration.toJSON();
  }
}
