import { PLUGIN_ID } from '../pluginId.ts'

const getTranslation = (id: string) => {
  return `${PLUGIN_ID}.${id}`
}

export { getTranslation }
