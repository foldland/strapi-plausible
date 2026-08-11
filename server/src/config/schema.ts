import { z } from 'zod'

const pluginConfigSchema = z.object({
  plausibleInstance: z.string(),
  domains: z.array(
    z.object({
      name: z
        .string()
        .min(1, 'Domain name is required')
        .regex(
          /^(?!-)(?:[a-zA-Z0-9-]{1,63}(?<!-)\.)+[a-zA-Z]{2,63}$/,
          'Invalid domain name format, example: example.com'
        ),
      auth: z.string().min(1, 'Auth token is required'),
    })
  ),
})
export type PluginConfig = z.infer<typeof pluginConfigSchema>

export { pluginConfigSchema }
