import dotenv from 'dotenv'
dotenv.config({
  path: '../../../.env'
})
import mongoose from 'mongoose'
import { User, type UserBuildAttrs } from '@/app/models/user.model'
import { Role } from '@/app//models/role.model'
import { hashPassword } from '@/app/utils/common.util'

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err))

const superAdminRole = await Role.findOne({ name: 'Super Admin' })
const commonRole = await Role.findOne({ name: 'Common' })
const systemManagerRole = await Role.findOne({
  name: 'System Manager'
})
const systemAdminRole = await Role.findOne({
  name: 'System Admin'
})
const systemStaffRole = await Role.findOne({
  name: 'System Staff'
})
const staticPassword = await hashPassword('password')

const users: UserBuildAttrs[] = [
  {
    name: 'Super Admin',
    email: 'superadmin@gmail.com',
    password: staticPassword,
    isUserVerified: true,
    roles: [
      {
        isActive: true,
        role: new mongoose.Types.ObjectId(superAdminRole?.id as string)
      }
    ]
  },
  {
    name: 'Common',
    email: 'common@gmail.com',
    password: staticPassword,
    isUserVerified: true,
    roles: [
      {
        isActive: true,
        role: new mongoose.Types.ObjectId(commonRole?.id as string)
      }
    ]
  },
  {
    name: 'System Manager',
    email: 'systemmanager@gmail.com',
    password: staticPassword,
    isUserVerified: true,
    roles: [
      {
        isActive: true,
        role: new mongoose.Types.ObjectId(systemManagerRole?.id as string)
      }
    ]
  },
  {
    name: 'System Admin',
    email: 'systemadmin@gmail.com',
    password: staticPassword,
    isUserVerified: true,
    roles: [
      {
        isActive: true,
        role: new mongoose.Types.ObjectId(systemAdminRole?.id as string)
      }
    ]
  },
  {
    name: 'Staff Widyatama',
    email: 'staffwidyatama@gmail.com',
    password: staticPassword,
    isUserVerified: true,
    roles: [
      {
        isActive: true,
        role: new mongoose.Types.ObjectId(systemStaffRole?.id as string)
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
