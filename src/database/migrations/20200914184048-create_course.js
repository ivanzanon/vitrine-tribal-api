module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Courses', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: Sequelize.STRING,
      description: Sequelize.STRING,
      location: Sequelize.STRING,
      dateStart: Sequelize.INTEGER,
      dateEnd: Sequelize.INTEGER,
      hourStart: Sequelize.INTEGER,
      hourEnd: Sequelize.INTEGER,
      interval: Sequelize.STRING,
      price: Sequelize.FLOAT,
      inscriptionUrl: Sequelize.STRING,
      classUrl: Sequelize.STRING,
      teacher: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Teachers',
          },
          key: 'id',
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Courses');
  },
};
