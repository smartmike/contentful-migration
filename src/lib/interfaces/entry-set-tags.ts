export default interface EntrySetTags {
  from: string[],
  shouldPublish?: boolean | 'preserve',
  setTagsForEntry (inputFields: any, entryTags: object[], apiTags: object[]): any
}
