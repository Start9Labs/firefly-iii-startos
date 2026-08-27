import { sdk } from '../sdk'
import { setDependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { versionGraph } from '../versions'
import { actions } from '../actions'
import { restoreInit } from '../backups'
import { seedFiles } from './seedFiles'
import { taskSetPrimaryUrl } from './taskSetPrimaryUrl'
import { watchAdmin } from './watchAdmin'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  seedFiles,
  setInterfaces,
  setDependencies,
  actions,
  taskSetPrimaryUrl,
  watchAdmin,
)

export const uninit = sdk.setupUninit(versionGraph)
