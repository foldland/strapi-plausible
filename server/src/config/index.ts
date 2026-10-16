import { type PluginConfig, pluginConfigSchema } from './schema.ts'

export default {
  default: ({ env }): PluginConfig => {
    return {
      plausibleInstance: env('PLAUSIBLE_URL'),
      domains: [
        {
          name: env('PLAUSIBLE_SITE_NAME'),
          auth: env('PLAUSIBLE_TOKEN'),
        },
      ],
    }
  },
  validator: (config) => {
    pluginConfigSchema.parse(config)
  },
}
