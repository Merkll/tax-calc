declare const debug: any;

export default {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable('USERS', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        username: {
          type: Sequelize.STRING
        },
        password: {
          type: Sequelize.STRING
        }
      }, { timestamps: false });
    } catch (error) {
      debug(error);
    }
  },
  down: async (queryInterface) => {
    try {
      await queryInterface.dropTable('USERS');
    } catch (error) {
      debug(error);
    }
  }
};
