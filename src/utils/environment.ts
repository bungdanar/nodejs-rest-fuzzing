interface AppEnv {
  readonly NODE_ENV: string
  readonly PORT: string
  readonly DB_HOST: string
  readonly DB_PORT: string
  readonly DB_NAME: string
  readonly DB_USER: string
  readonly DB_PASSWORD: string
}

export class Environment {
  static readonly APP_ENV: AppEnv = {
    NODE_ENV: process.env.NODE_ENV!,
    PORT: process.env.PORT!,
    DB_HOST: process.env.DB_HOST!,
    DB_PORT: process.env.DB_PORT!,
    DB_NAME: process.env.DB_NAME!,
    DB_USER: process.env.DB_USER!,
    DB_PASSWORD: process.env.DB_PASSWORD!,
  }

  static get IS_PRODUCTION(): boolean {
    return this.APP_ENV.NODE_ENV === 'production'
  }

  private static throwEnvErrMsg = (msg: string): never => {
    throw new Error(`${msg} must be defined`)
  }

  static checkEnvVariables = (): void | never => {
    for (let key in this.APP_ENV) {
      if (!this.APP_ENV[key as keyof AppEnv]) {
        this.throwEnvErrMsg(key)
      }
    }
  }
}
