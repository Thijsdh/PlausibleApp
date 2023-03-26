import {Router} from 'express';
import generateAggregate from '../../../generators/aggregate';
import generateBreakdown, {
  BreakdownParams,
} from '../../../generators/breakdown';

const router = Router();

router.get('/aggregate', (req, res) => {
  res.json(generateAggregate());
});

router.get('/breakdown', (req, res) => {
  res.json(generateBreakdown(req.query as unknown as BreakdownParams));
});

export default router;
