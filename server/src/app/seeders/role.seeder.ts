import dotenv from 'dotenv'
dotenv.config({
  path: '../../../.env'
})
import mongoose from 'mongoose'
import { Permission } from '@/app/models/permission.model'
import { Role, type RoleDocument } from '@/app/models/role.model'

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err))

const permissions = await Permission.find()

const roles: Partial<RoleDocument>[] = [
  {
    name: 'Super Admin',
    permissions: permissions.map(permission => ({
      code: permission.code,
      group: permission.group
    }))
  },
  {
    name: 'Common',
    permissions: []
  }
]

const seedRoles = async () => {
  try {
    await Role.deleteMany()
    await Role.insertMany(roles)
    console.log('Roles seeded successfully!')
    mongoose.connection.close()
  } catch (error) {
    console.error(error)
    mongoose.connection.close()
  }
}

seedRoles()
