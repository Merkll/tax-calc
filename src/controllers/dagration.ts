import Models from '@models/index';
import { calculateTaxFromDagrations }from '@helpers/dagration';

import { AppError } from '../helpers/errors';

const { DagrationScale } = Models;

export const AddDagrationRecord = async (req, res) => {
  const { body } = req;

  let data = {};

  if (!body) throw AppError(409, "dagration details cannot be empty");

  if (Array.isArray(body)) data = await DagrationScale.addMultiple(body)
  else data = await DagrationScale.addOne(body);

  return { data, message: "Dagration added", status: 201 };
};

export const GetDagrationRecord = async (req, res) => {
  const data = JSON.parse(JSON.stringify(await DagrationScale.findAll()))
  
  return { data }
};

export const CalculateTax = async (req, res) => {
  const { amount } = req.query;

  const degrations = JSON.parse(JSON.stringify(await DagrationScale.findAll({  order: [['order', 'ASC']] })))

  const { tax } = calculateTaxFromDagrations(amount, degrations);
  
  return { data: { tax } }
};


