import { S3Client } from '@aws-sdk/client-s3'
import type { Config } from '~/types'

let s3R2Client: S3Client | null = null

export function getR2Client(findConfig: Config[]) {
  if (!findConfig.length) {
    console.warn('警告：无法获取 R2 配置信息，请配置相应信息。')
  }
  if (s3R2Client) return s3R2Client

  const r2AccesskeyId = findConfig.find((item: Config) => item.config_key === 'r2_accesskey_id')?.config_value || ''
  const r2AccesskeySecret = findConfig.find((item: Config) => item.config_key === 'r2_accesskey_secret')?.config_value || ''
  const r2AccountId = findConfig.find((item: Config) => item.config_key === 'r2_account_id')?.config_value || ''

  s3R2Client = new S3Client({
    region: 'auto',
    endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: r2AccesskeyId,
      secretAccessKey: r2AccesskeySecret,
    },
  })

  return s3R2Client
}
