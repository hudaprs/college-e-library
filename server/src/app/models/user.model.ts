import mongoose from 'mongoose'
import { hashPassword } from '@/app/utils/common.util'
import type { User as TUser, UserRole } from '@/app/types/user.type'

export interface UserBuildAttrs {
  name: string
  email: string
  password?: string
  roles?: UserRole[]
}

export type UserDocument = mongoose.Document & TUser

interface UserModel extends mongoose.Model<UserDocument> {
  build: (attrs: UserBuildAttrs) => UserDocument
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isUserVerified: {
      type: Boolean,
      default: false
    },
    roles: [
      {
        role: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Role'
        },
        isActive: {
          type: Boolean,
          default: false
        }
      }
    ]
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id
        ret.roles = ret.roles.map((role: UserRole) => ({
          role: role.role,
          isActive: role.isActive
        }))
        delete ret._id
        delete ret.__v
        delete ret.password
      }
    },
    timestamps: true
  }
)

userSchema.index({
  name: 'text',
  email: 'text'
})

userSchema.statics.build = (attrs: UserBuildAttrs) => {
  return new User(attrs)
}

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const encryptedPassword = await hashPassword(this.get('password'))
    this.set('password', encryptedPassword)
  }

  done()
})

const User = mongoose.model<UserDocument, UserModel>('User', userSchema)

export { User }
