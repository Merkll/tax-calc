/* eslint-disable import/no-extraneous-dependencies */
import Debug from 'debug';

const debug = Debug('dev');

export default {
  up: async (queryInterface) => {
    try {
      await queryInterface.bulkInsert(
        'SAMPLE',
        [],
        { returning: true }
      );
    } catch (error) {
      debug(error);
    }
  },
  down: async queryInterface => queryInterface.bulkDelete('SAMPLE', null, {})
};
