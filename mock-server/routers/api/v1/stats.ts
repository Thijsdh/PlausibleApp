import {Router} from 'express';
import generateAggregate from '../../../generators/aggregate';
import generateBreakdown, {
  BreakdownParams,
} from '../../../generators/breakdown';
import generateTimeseries, {
  TimeseriesParams,
} from '../../../generators/timeseries';

const router = Router();

router.get('/aggregate', (req, res) => {
  res.json(generateAggregate());
});

router.get('/breakdown', (req, res) => {
  res.json(generateBreakdown(req.query as unknown as BreakdownParams));
});

router.get('/timeseries', (req, res) => {
  res.json(generateTimeseries(req.query as unknown as TimeseriesParams));
});

router.get('/realtime/visitors', (req, res) => {
  res.send('21');
});

export default router;
