module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
  
  user.associate = (models) => {
    user.hasMany(models.sale,
      { foreignKey: 'userId', as: 'saleUser'}
    );
    user.hasMany(models.sale,
      { foreignKey: 'sellerId', as: 'saleSeller'}
    );
  };

  return user;
};
