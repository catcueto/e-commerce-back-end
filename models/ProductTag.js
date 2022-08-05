const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class ProductTag extends Model {}

ProductTag.init(
  {
    // TODO: define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      // product_id: INT, reference to Product model's id
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id",
      },
    },
    // tag_id: INT, references to Tag model's id
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
        key: "id",
      },
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

module.exports = ProductTag;
