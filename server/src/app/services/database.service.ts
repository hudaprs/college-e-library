import mongoose from 'mongoose'
import { logger } from '@/app/utils/logger.util'

export class DatabaseService {
  private static filename = 'database.service.ts'

  public static async connect() {
    await mongoose.connect(process.env.DB_HOST)
    logger.info(`${this.filename} Connected to MongoDb`)
  }
}
