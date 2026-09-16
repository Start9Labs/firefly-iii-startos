import { sdk } from '../sdk'
import { createAdmin } from './createAdmin'
import { manageEnableBanking } from './manageEnableBanking'
import { manageSmtp } from './manageSmtp'
import { reissueImporterToken } from './reissueImporterToken'
import { resetAdminPassword } from './resetAdminPassword'
import { setPrimaryUrl } from './setPrimaryUrl'

export const actions = sdk.Actions.of()
  .addAction(createAdmin)
  .addAction(resetAdminPassword)
  .addAction(setPrimaryUrl)
  .addAction(reissueImporterToken)
  .addAction(manageSmtp)
  .addAction(manageEnableBanking)
