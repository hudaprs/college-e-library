import type {
  PermissionCode,
  PermissionGroup
} from '@/app/types/permission.type'
import * as yup from 'yup'

export const storeSchema = yup.object().shape({
  name: yup.string().required(),
  permissions: yup
    .array(
      yup
        .object()
        .shape({
          code: yup.mixed<PermissionCode>().required(),
          group: yup.mixed<PermissionGroup>().required()
        })
        .required()
    )
    .min(1)
    .required()
})
