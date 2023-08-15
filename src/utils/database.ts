import { Sequelize, Transaction } from 'sequelize'
import { Environment } from './environment'

export class Database {
  private static logging = Environment.IS_PRODUCTION ? false : console.log

  static readonly context = new Sequelize({
    dialect: 'mysql',
    host: Environment.APP_ENV.DB_HOST,
    port: parseInt(Environment.APP_ENV.DB_PORT),
    username: Environment.APP_ENV.DB_USER,
    password: Environment.APP_ENV.DB_PASSWORD,
    database: Environment.APP_ENV.DB_NAME,
    logging: this.logging,
    dialectOptions: {
      decimalNumbers: true,
    },
  })

  static getTransaction = async () => {
    return await this.context.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
    })
  }
}
