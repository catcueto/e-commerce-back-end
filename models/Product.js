// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");
const Category = require("./Category");

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // TODO: define columns
    // id: INT, no null values, primary key, auto increment
    id: DataTypes.INTEGER,
    AllowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  {
    // product_name: string and no null values
    product_name: DataTypes.STRING,
    allowNull: false,
  },

  {
    // price: decimal, no null values
    price: DataTypes.DECIMAL,
    allowNull: false,
    // validate that value is a decimal
    validate: {
      isDecimal: true,
    },
  },

  {
    // stock: INT, no null values, default value : 10
    stock: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
    // va;idate that value is numeric (INT)
    validate: {
      isInt: true,
    },
  },
  {
    // category_id: INT, references Category model's id
    category_id: DataTypes.INTEGER,
    references: {
      model: "category",
      key: "id",
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product",
  }
);

module.exports = Product;
