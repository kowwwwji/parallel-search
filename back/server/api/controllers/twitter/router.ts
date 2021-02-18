import express from 'express';
import controller from './controller';
export default express
  .Router()
  .get('/:result_type', controller.search)
