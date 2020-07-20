import { APIAction } from './action'
import { OfflineAPI } from '../offline-api'
import Entry from '../entities/entry'
import Tag from '../entities/tag'
import * as _ from 'lodash'

class EntrySetTagsAction extends APIAction {
  private contentTypeId: string
  private fromFields: string[]
  private setTagsForEntry: Function

  constructor (contentTypeId: string, fromFields: string[], entryTransformationForTags: Function) {
    super()
    this.contentTypeId = contentTypeId
    this.fromFields = fromFields
    this.setTagsForEntry = entryTransformationForTags
  }

  async applyTo (api: OfflineAPI) {
    // TODO: Refactor currently confusing naming!
    const entries: Entry[] = await api.getEntriesForContentType(this.contentTypeId)
    const tags: Map<String, Tag> = await api.getTagsForEnvironment()
    const apiTags = [...tags.keys()].map((tagId) => {
      return { sys: { id: tagId, type: 'Link', linkType: 'Tag' } }
    })

    for (const entry of entries) {
      const entryFields = _.pick(entry.fields, this.fromFields)
      const entryTags = entry.tags

      let changesForThisEntry = false

      let outputs
      try {
        outputs = await this.setTagsForEntry(entryFields, entryTags, apiTags)
      } catch (err) {
        await api.recordRuntimeError(err)
        continue
      }

      if (outputs === undefined) {
        continue
      }

      changesForThisEntry = true
      entry.tags = outputs

      if (changesForThisEntry) {
        await api.saveEntry(entry.id)
      }
    }
  }
}

export { EntrySetTagsAction }
