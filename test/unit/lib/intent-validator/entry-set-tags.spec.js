'use strict';

import { expect } from 'chai';

import EntrySetTagsIntentValidator from '../../../../src/lib/intent-validator/entry-set-tags';
import createValidator from './validate-steps';
const validateSteps = createValidator([EntrySetTagsIntentValidator]);

describe('Entry tag update', function () {
  describe('when providing the required properties', function () {
    it('returns no validation errors', async function () {
      const validationErrors = await validateSteps(function up (migration) {
        migration.setTagsForEntries({
          contentType: 'dog',
          from: ['owner'],
          setTagsForEntry: async (entryFields, entryTags, apiTags) => {
            return [...entryTags, ...apiTags];
          }
        });
      });
      expect(validationErrors).to.eql([]);
    });
  });

  // TODO: Add the other validation tests
});
