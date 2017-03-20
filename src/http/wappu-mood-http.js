import * as wappuMood from '../core/wappu-mood-core';
import {createJsonRoute, throwStatus} from '../util/express';
import {assert} from '../validation';
import _ from 'lodash';


const putMood = createJsonRoute(function(req, res) {
  if (!req.client.id) throwStatus(403, `Only registered user may save moods`);

  let moodParams = assert(req.body, 'upsertMoodParams');
  let coreParams = _.merge(moodParams, {
    client: req.client,
  });

  return wappuMood.createOrUpdateMood(coreParams)
    .then(() => undefined)
    .catch(err => {
      throw err
    });
});

const getMood = createJsonRoute(function(req, res) {
  let moodParams = assert(req.query, 'getMoodParams');
  let coreParams = _.merge(moodParams, {
    client: req.client,
  });

  return wappuMood.getMood(coreParams)
    .then(result => result)
    .catch(err => {
      throw err
    });
});

export {
  putMood,
  getMood,
};
