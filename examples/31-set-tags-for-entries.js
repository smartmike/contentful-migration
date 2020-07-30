module.exports = function (migration) {
  migration.setTagsForEntries({
    contentType: 'article',
    from: ['title'],
    setTagsForEntry: (fields, entryTags, apiTags) => {
      const newTag = apiTags.find(tag => tag.sys.id === 'old');
      return [...entryTags, newTag];
    } });
};
