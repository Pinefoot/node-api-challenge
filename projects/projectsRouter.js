const express = require('express');
const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');
const router = express.Router();





//gets
router.get('/', (req, res)=>{
    Projects.get(req.params.id)
    
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

router.get('/:id/actions/:project_id', (req, res)=>{
    Projects.getProjectActions(req.params.id)
    .then(actions =>{
        if(actions){
            res.status(200).json(project)
        }else{
            res.status(404).json({
                message: 'Projects actions not found'
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: 'You lose'
        })
    }
    )
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


//deleter!
router.delete('/:id', (req,res)=>{
    Projects.remove(req.params.id)
    .then(remove =>{
        if(remove > 0){
        res.status(200).json(remove)
    }else{
        res.status(404).json({message: 'the project was not delted'})
    }
    }).catch(err =>{
        res.status(500).json({message: 'something was wrong in the deleter'})
    })
})

//updater
router.put('/:id', (req, res)=>{
    const id = req.params.id;
    const changes = req.body
    Projects.get(id)
    .then(project =>{
        Projects.update(id, {
            name: changes.name,
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