import Intent from './base-intent'
import { EntrySetTagsAction } from '../action/entry-set-tags'
import { PlanMessage } from '../interfaces/plan-message'
import chalk from 'chalk'

export default class EntrySetTagsIntent extends Intent {
  endsGroup (): boolean {
    return true
  }

  groupsWith (): boolean {
    return false
  }

  // Do I need a different name then transformation?

  // ??
  // this.payload.transformation.shouldPublish

  toActions () {
    return [
      new EntrySetTagsAction(
        this.getContentTypeId(),
        this.payload.transformation.from,
        this.payload.transformation.transformEntryForLocale,
      )
    ]
  }

  toPlanMessage (): PlanMessage {
    // TODO: What to say in the details column?
    // details: [
    //   `from: ${this.payload.transformation.from}`,
    //   `to: ${this.payload.transformation.to}`
    // ],
    return {
      heading: chalk`Adding tags on entries for {bold.yellow ${this.getContentTypeId()}}`,
      details: [],
      sections: []
    }
  }

  // ? 
  shouldSave () {
    return false
  }

  // ?
  shouldPublish () {
    return false
  }
}
