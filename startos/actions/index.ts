import { primaryUrl } from '../primaryUrl'
import { sdk } from '../sdk'
import { createAdmin } from './createAdmin'
import { manageEnableBanking } from './manageEnableBanking'
import { manageSmtp } from './manageSmtp'
import { reissueImporterToken } from './reissueImporterToken'
import { resetAdminPassword } from './resetAdminPassword'

export const actions = sdk.Actions.of()
  .addAction(createAdmin)
  .addAction(resetAdminPassword)
  .addAction(primaryUrl.action)
  .addAction(reissueImporterToken)
  .addAction(manageSmtp)
  .addAction(manageEnableBanking)
