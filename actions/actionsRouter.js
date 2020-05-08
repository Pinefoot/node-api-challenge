const express = require('express');
const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');
const router = express.Router();

router.get('/:project_id/actions', (req, res)=>{
    Projects.getProjectActions(req.params.project_id)
    
    .then(projects =>{
        
        res.status(200).json(projects);
    }).catch(err =>{
        res.status(500).json({
            message: 'Error retreving the projects'
        })
    })
})

router.get('/:project_id/actions/:id', (req, res)=>{
    Projects.getProjectActions(req.params.project_id)
    .then(proj =>{
        if(proj){
            Actions.get(req.params.id)
            .then(success =>{
                res.status(200).json(success)
            })
        }
    })
})

//add action
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


//delete action
router.delete('/:project_id/actions/:id',(req,res)=>{
    Actions.remove(req.params.id)
    .then(remove =>{
        if(remove >0){
            res.status(200).json({message: 'successfully deleted'})
        }
    })
})

//update actions
router.put('/:project_id/actions/:id', (req, res)=>{
    const id = req.params.id;
    const changes = req.body

    Actions.get(id)
    .then(project =>{
        Actions.update(id, {
            notes: changes.notes,
            description: changes.description
        }).then(updated =>{
            res.status(200).json(updated)
        })
    }).catch( err =>{
        console.log(err)
        res.status(500).json({
            message: 'error updating project on database'
        })
    })
})
    





module.exports = router;