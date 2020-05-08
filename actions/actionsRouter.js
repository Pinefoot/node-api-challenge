// const express = require('express');
// const Projects = require('../data/helpers/projectModel');
// const Actions = require('../data/helpers/actionModel');
// const router = express.Router();

// //gets list of actions for project id
// // router.get('/', (req, res)=>{
// //     Actions.get(req.params.id)
// //     .then(action=>{
// //         res.status(200).json(action)
// //     }).catch(err =>{
// //         res.status(500).json({message: 'oops'})
// //     })
    
// // })

// //gets specific action by action id
// router.get('/:id', (req, res) =>{
//   Actions.get(req.params.id)
    
//     .then(actions =>{
//      if(actions){
//          res.status(200).json(actions)
//      }
//      else if(!actions){
//          res.status(404).json({message: "invalid id"})
//      }else{
//          res.status(500).json({message: 'Somehting horrible has happend'})
//      }
// }).catch(err =>{
//     console.log(err)
// })
// })

// //post actions
// router.post('/:id', )




// module.exports = router;