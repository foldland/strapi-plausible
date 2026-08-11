import { PLUGIN_ID } from '../pluginId'

const getTranslation = (id: string) => {
  return `${PLUGIN_ID}.${id}`
}

export { getTranslation }
