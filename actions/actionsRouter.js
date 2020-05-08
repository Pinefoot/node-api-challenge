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
router.post('/:id/actions', validateActionPost, validateDescriptionLength, (req, res)=>{
    Actions.insert(req.body)
    .then(action =>{
        if(action){
        res.status(201).json(action)}
        else{
            res.status(404).json({message: 'Needs to have correct id'})
        }
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
router.put('/:project_id/actions/:id', validateActionPost, validateDescriptionLength, (req, res)=>{
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
    

//middleware
function validateActionPost(req, res, next) {
    // do your magic!
    if(req.body === null || req.body === ''){
      res.status(400).json({message: 'missing post data'})
    }else if( req.body.notes === null || req.body.notes === '' ||  req.body.description === "" || req.body.description === null){
      res.status(400).json({message: 'missing required notes or description field'})
    }else{
      next();
    }
  }


function validateDescriptionLength(req, res, next){
    if(req.body === null || req.body === ''){
        res.status(400).json({message: 'missing post data'})
    }else if(req.body.description.length < 128){
        res.status(401).json({message: 'description must be more 128 characters'})
    }else{
        next()
    }
}

//   function validateProjectId(req, res, next) {
//     // do your magic!
//     let id = req.params.id
    
//     Projects.get( id)
//     .then(pI =>{
//       if(pI === req.params.project_id ){
        
        
//         next();
//       }else{
//         res.status(400).json({message: 'invalid  id'})
//       }
//     }
     
//     ).catch(err =>{
//       res.status(500).json({error: 'There was a problem finding the user ID'})
//     })
    
    
//     }


  //req.body.description.length < 128 ||


module.exports = router;