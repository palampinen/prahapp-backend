import _ from 'lodash';
import * as teamCore from '../core/team-core';
import {createJsonRoute} from '../util/express';
import {assert} from '../validation';

let getTeams = createJsonRoute(function(req, res) {
  const teamParams = assert({
    city: req.query.cityId,
  }, 'feedParams');

  const coreParams = _.merge(teamParams, {
    client: req.client
  });
  return teamCore.getTeams(coreParams);
});

export {
  getTeams
};
