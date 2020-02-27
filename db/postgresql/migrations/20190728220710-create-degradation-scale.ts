declare const debug: any;

export default {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable('GRADATION_SCALE', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        monthlyAmount: {
          type: Sequelize.INTEGER
        },
        rate: {
          type: Sequelize.INTEGER
        },
        order: {
          type: Sequelize.INTEGER
        }
      }, { timestamps: false });
    } catch (error) {
      debug(error);
    }
  },
  down: async (queryInterface) => {
    try {
      await queryInterface.dropTable('GRADATION_SCALE');
    } catch (error) {
      debug(error);
    }
  }
};
