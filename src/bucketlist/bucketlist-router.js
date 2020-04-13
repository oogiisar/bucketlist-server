const express = require('express');
const path = require('path');
const UsersService = require('../users/users-service');
const BucketlistService = require('./bucketlist-service');
const { requireAuth } = require('../middleware/jwt-auth');

const bucketlistRouter = express.Router();
const jsonBodyParser = express.json();


bucketlistRouter
    .route('/:id')
    .get(requireAuth, (req, res, next) => {
        const knexInstance = req.app.get('db')
        BucketlistService.getItems(knexInstance, req.params.id)
        .then(items  => {
            return Promise.all(items.map( item  => {
                    return BucketlistService.getTasks(knexInstance, req.params.id, item.id)
                    .then(task =>  {
                        return ({
                            item: {
                                id: item.id,
                                text: item.item,
                                completed: item.completed,
                                tasks: task
                            }
                        })
                    
                    })
                    .catch(next)
                })
            )
        })
        .then(results => {
            res
                .status(200)
                .json(results)
        })
        .catch(next)
        
    })
    .patch(requireAuth, jsonBodyParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        const { type, user_id, item_id, task_id, completed } = req.body
         
        if(type === 'item'){
            BucketlistService.patchItem(knexInstance, user_id, item_id, completed)
            .then(
                res.status(204)
            )
            .catch(next)
        } else {
            BucketlistService.patchTask(knexInstance, user_id, item_id, task_id, completed)
            .then(
                res.status(204)
            )
            .catch(next)
        }
    })
    .post(requireAuth, jsonBodyParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        const { type, user_id, item_id, item } = req.body
        console.log(item)

        if(type === 'item') {
            BucketlistService.insertItem(knexInstance, user_id, item)
            .then(
                res.status(201)
            )
            .catch(next)
        } else {
            BucketlistService.InsertTask(knexInstance, item_id, item)
            .then(
                res.status(201)
            )
            .catch(next)
        }
    })

        
module.exports = bucketlistRouter;
