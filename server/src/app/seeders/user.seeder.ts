import dotenv from 'dotenv'
dotenv.config({
  path: '../../../.env'
})
import mongoose from 'mongoose'
import { User, type UserDocument } from '@/app/models/user.model'
import { Role } from '@/app//models/role.model'
import { hashPassword } from '../utils/common.util'

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err))

const superAdminRole = await Role.findOne({ $text: { $search: 'super admin' } })
const staticPassword = await hashPassword('password')

const users: Partial<UserDocument>[] = [
  {
    name: 'Super Admin',
    email: 'superadmin@gmail.com',
    password: staticPassword,
    isUserVerified: true,
    roles: [
      {
        isActive: true,
        role: superAdminRole?.id as string
      }
    ]
  }
]

const seedUsers = async () => {
  try {
    await User.deleteMany()
    await User.insertMany(users)
    console.log('Users seeded successfully!')
    mongoose.connection.close()
  } catch (error) {
    console.error(error)
    mongoose.connection.close()
  }
}

seedUsers()
