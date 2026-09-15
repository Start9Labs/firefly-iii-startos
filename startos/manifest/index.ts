import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'firefly-iii',
  title: 'Firefly III',
  license: 'AGPL-3.0',
  packageRepo: 'https://github.com/Start9Labs/firefly-iii-startos',
  upstreamRepo: 'https://github.com/firefly-iii/firefly-iii',
  marketingUrl: 'https://firefly-iii.org/',
  donationUrl:
    'https://docs.firefly-iii.org/explanation/more-information/donations/',
  description: { short, long },
  volumes: ['main', 'importer', 'startos'],
  images: {
    firefly: {
      source: { dockerTag: 'fireflyiii/core:version-6.7.1' },
      arch: ['x86_64', 'aarch64'],
    },
    'data-importer': {
      source: { dockerTag: 'fireflyiii/data-importer:version-2.3.4' },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {},
})
