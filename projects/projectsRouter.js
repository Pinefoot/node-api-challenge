const express = require('express');
const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');
const router = express.Router();
//const actionsRouter = require('../actions/actionsRouter');
const server = express();

//server.use('/api/projects/', actionsRouter);




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

//getts actions
// router.get('/:project_id/actions', (req, res)=>{
//     Projects.getProjectActions(req.params.project_id)
    
//     .then(projects =>{
        
//         res.status(200).json(projects);
//     }).catch(err =>{
//         res.status(500).json({
//             message: 'Error retreving the projects'
//         })
//     })
// })



// router.get('/:project_id/actions/:id', (req, res)=>{
//     Projects.getProjectActions(req.params.project_id)
//     .then(proj =>{
//         if(proj){
//             Actions.get(req.params.id)
//             .then(success =>{
//                 res.status(200).json(success)
//             })
//         }
//     })
// })


//posts
router.post('/', validateProjectPost, (req, res)=>{
    Projects.insert(req.body)
    .then(project =>{
        res.status(201).json(project);
    }).catch(err =>{
        res.status(500).json({
            message: "Incorrect", err
        })
    })
})

// router.post('/:id/actions', validateActionPost, validateProjectId, (req, res)=>{
//     Actions.insert(req.body)
//     .then(action =>{
//         if(action){
//             res.status(201).json(action)}
//             else{
//                 res.status(404).json({message: 'Needs to have correct id'})
//             }
//     }).catch(err =>{
//         res.status(500).json({
//             message: 'Something went wrong posting action to this id', err
//         })
//     })
// })


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
router.put('/:id', validateProjectPost, (req, res)=>{
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


//middleware for projects
function validateProjectPost(req, res, next) {
    // do your magic!
    
    if (req.body === null || req.body === ""){
      res.status(400).json({message: 'missing user data'});
    }else if(req.body.name === null || req.body.name === "" || req.body.description === null || req.body.description === ""){
      res.status(400).json({message: 'missing required name or description field'})
    }else{
      next();
    }
  
  }

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

//   function validateProjectId(req, res, next) {
//     // do your magic!
//     let id = req.params.id
    
//     Projects.get(id)
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




module.exports = router;