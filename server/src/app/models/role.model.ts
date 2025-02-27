import mongoose from 'mongoose'
import { JwtSignType } from '@/app/types/jwt.type'

interface TokenBuildAttrs {
  token: string
  usedAt?: Date
  userId: string
  type: JwtSignType
}

export interface TokenDocument extends mongoose.Document {
  token: string
  usedAt?: Date
  userId: string
  type: JwtSignType
  createdAt: Date
  updatedAt: Date
}

interface TokenModel extends mongoose.Model<TokenDocument> {
  build: (attrs: TokenBuildAttrs) => TokenDocument
}

const tokenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    usedAt: {
      type: Date
    },
    type: {
      type: String,
      enum: JwtSignType,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id
        delete ret._id
        delete ret.__v
      }
    },
    timestamps: true
  }
)

tokenSchema.statics.build = (attrs: TokenBuildAttrs) => {
  return new Token(attrs)
}

const Token = mongoose.model<TokenDocument, TokenModel>('Token', tokenSchema)

export { Token }
