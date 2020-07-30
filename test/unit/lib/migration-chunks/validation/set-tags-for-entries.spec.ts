import { expect } from 'chai'
import { omit } from 'lodash'
import makeApiTag from '../../../../helpers/make-api-tag'

const validateChunks = require('./validate-chunks').default

describe('Set tags chunk validation', function () {
  describe('when setting tags on a non existing Content Type', function () {
    it('returns an error', async function () {
      const step = {
        contentType: 'entry',
        from: ['authorName'],
        setTagsForEntry: async (fields, entryTags, apiTags) => {
          return apiTags
        }
      }

      const tags = [makeApiTag('marketing')]
      const contentTypes = []

      const errors = await validateChunks(
        function up (migration) {
          migration.setTagsForEntries(step)
        },
        contentTypes,
        tags
      )

      expect(errors).to.eql([
        {
          details: {
            step: {
              meta: {
                contentTypeInstanceId: 'contentType/entry/0'
              },
              payload: {
                contentTypeId: step.contentType,
                entryTransformationForTags: omit(step, 'contentType')
              },
              type: 'contentType/setTagsForEntries'
            }
          },
          message: 'You cannot update tags on entries for content type "entry" because it does not exist.',
          type: 'InvalidAction'
        }
      ])
    })
  })

  // TODO: This is not yet implemented so we skip these tests.
  describe.skip('when trying to add a tag that does not exist', function () {
    it('returns an error', async function () {
      const step = {
        contentType: 'entry',
        from: ['authorName'],
        setTagsForEntry: async (fields, entryTags, apiTags) => {
          return [{ sys: { id: 'nonexisting', type: 'Link', linkType: 'Tag' } }]
        }
      }
      const contentTypes = [{ sys: { id: 'entry' }, fields: [{ id: 'name', type: 'Symbol' }] }]
      const errors = await validateChunks(
        function up (migration) {
          migration.setTagsForEntries(step)
        },
        contentTypes,
        []
      )

      // TODO: Make the validation aware of if the tag is about to be created etc.
      expect(errors).to.eql([
        {
          details: {
            step: {
              meta: {
                contentTypeInstanceId: 'contentType/entry/0'
              },
              payload: {
                contentTypeId: step.contentType,
                entryTransformationForTags: omit(step, 'contentType')
              },
              type: 'contentType/setTagsForEntries'
            }
          },
          message: 'You cannot update tags on entries for content type "entry" because some of the tags do not exist.',
          type: 'InvalidAction'
        }
      ])
    })
  })

  describe.skip('when trying to add an existing tag more than once', function () {
    it('returns an error', async function () {
      const step = {
        contentType: 'entry',
        from: ['authorName'],
        setTagsForEntry: async (fields, entryTags, apiTags) => {
          return [
            { sys: { id: 'marketing', type: 'Link', linkType: 'Tag' } },
            { sys: { id: 'marketing', type: 'Link', linkType: 'Tag' } }
          ]
        }
      }
      const contentTypes = [{ sys: { id: 'entry' }, fields: [{ id: 'name', type: 'Symbol' }] }]
      const errors = await validateChunks(
        function up (migration) {
          migration.setTagsForEntries(step)
        },
        contentTypes,
        [makeApiTag('marketing')]
      )

      expect(errors).to.eql([
        {
          details: {
            step: {
              meta: {
                contentTypeInstanceId: 'contentType/entry/0'
              },
              payload: {
                contentTypeId: step.contentType,
                entryTransformationForTags: omit(step, 'contentType')
              },
              type: 'contentType/setTagsForEntries'
            }
          },
          message: 'You cannot update tags on entries for content type "entry" because you are trying to add a tag more than once.',
          type: 'InvalidAction'
        }
      ])
    })
  })
})
