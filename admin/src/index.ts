import type { StrapiApp } from '@strapi/strapi/admin'
import { Initializer } from './components/Initializer'
import { PluginIcon } from './components/PluginIcon'
import { PLUGIN_ID } from './pluginId'

const plugin: StrapiApp['appPlugins'][string] = {
  register: (app) => {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: 'menu.title',
        defaultMessage: 'Analytics',
      },
      Component: () => {
        return import('./pages/App')
      },
      permissions: [],
    })

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    })
  },

  registerTrads: async ({ locales }: { locales: Array<string> }) => {
    return await Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(
            `./translations/${locale}.json`
          )

          return { data: data, locale: locale }
        } catch {
          return { data: {}, locale: locale }
        }
      })
    )
  },
}

export default plugin
