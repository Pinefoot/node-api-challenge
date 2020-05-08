const express = require('express');
const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');
const router = express.Router();





//gets
router.get('/', (req, res)=>{
    Projects.get(req.query)
    .then(projects =>{
        res.status(200).json(projects);
    }).catch(err =>{
        res.status(500).json({
            message: 'Error retreving the projects'
        })
    })
})

router.get('/:id', (req, res)=>{
    Projects.get(req.params.id)
    .then(project=>{
        if(project){
            res.status(200).json(project);
        }else{
            res.status(404).json({
                message: 'Project not found'
            })
        }
    })

})

//posts
router.post('/', (req, res)=>{
    Projects.insert(req.body)
    .then(project =>{
        res.status(201).json(project);
    }).catch(err =>{
        res.status(500).json({
            message: "Incorrect", err
        })
    })
})

router.post('/:id/actions', (req, res)=>{
    Actions.insert(req.body)
    .then(action =>{
        res.status(201).json(action)
    }).catch(err =>{
        res.status(500).json({
            message: 'Something went wrong posting action to this id', err
        })
    })
})





module.exports = router;