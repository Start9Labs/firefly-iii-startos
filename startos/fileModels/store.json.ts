import { FileHelper, smtpShape, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.looseObject({
  appKey: z.string().catch(''),
  cronToken: z.string().catch(''),
  primaryUrl: z.string().catch(''),
  adminEmail: z.string().optional().catch(undefined),
  importerToken: z.string().optional().catch(undefined),
  smtp: smtpShape,
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes.startos, subpath: './store.json' },
  shape,
)
