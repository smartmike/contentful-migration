import { APIAction, EntityAction } from '../action/action'
import RawStep from './raw-step'
import { PlanMessage } from './plan-message'

interface Intent {
  toActions (): (APIAction | EntityAction)[]
  toRaw (): RawStep
  getContentTypeId (): string
  getRelatedContentTypeIds (): string[]
  getFieldId (): string
  getRawType (): string
  getTagId (): string

  requiresAllEntries (): boolean

  shouldSave (): boolean
  shouldPublish (): boolean

  isContentTypeUpdate (): boolean
  isContentTypeDelete (): boolean
  isContentTypeCreate (): boolean
  isFieldCreate (): boolean
  isFieldUpdate (): boolean
  isFieldDelete (): boolean
  isFieldRename (): boolean
  isFieldMove (): boolean
  isAboutContentType (): boolean
  isAboutField (): boolean
  isContentTransform (): boolean
  isEntryDerive (): boolean
  isEntryTransformToType (): boolean
  isGroupable (): boolean
  isEditorInterfaceIntent (): boolean
  isEditorInterfaceUpdate (): boolean
  isSidebarUpdate (): boolean
  isTagIntent (): boolean
  isTagCreate (): boolean
  isTagUpdate (): boolean
  isTagDelete (): boolean

  isComposedIntent (): boolean

  groupsWith (other: Intent): boolean
  endsGroup (): boolean

  toPlanMessage (): PlanMessage
}

export {
  Intent as default,
  Intent
}
