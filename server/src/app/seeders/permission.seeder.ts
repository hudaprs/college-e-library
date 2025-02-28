import dotenv from 'dotenv'
dotenv.config({
  path: '../../../.env'
})
import mongoose from 'mongoose'
import {
  Permission,
  type PermissionDocument
} from '@/app/models/permission.model'
import { PermissionCode, PermissionGroup } from '@/app/types/permission.type'

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err))

const permissions: Partial<PermissionDocument>[] = [
  {
    code: PermissionCode.VIEW_USER,
    group: PermissionGroup.USER
  },
  {
    code: PermissionCode.CREATE_USER,
    group: PermissionGroup.USER
  },
  {
    code: PermissionCode.UPDATE_USER,
    group: PermissionGroup.USER
  },
  {
    code: PermissionCode.DELETE_USER,
    group: PermissionGroup.USER
  },
  {
    code: PermissionCode.VIEW_PERMISSION,
    group: PermissionGroup.PERMISSION
  },
  {
    code: PermissionCode.VIEW_ROLE,
    group: PermissionGroup.ROLE
  },
  {
    code: PermissionCode.CREATE_ROLE,
    group: PermissionGroup.ROLE
  },
  {
    code: PermissionCode.UPDATE_ROLE,
    group: PermissionGroup.ROLE
  },
  {
    code: PermissionCode.DELETE_ROLE,
    group: PermissionGroup.ROLE
  }
]

const seedPermissions = async () => {
  try {
    await Permission.deleteMany()
    await Permission.insertMany(permissions)
    console.log('Permission seeded successfully!')
    mongoose.connection.close()
  } catch (error) {
    console.error(error)
    mongoose.connection.close()
  }
}

seedPermissions()
