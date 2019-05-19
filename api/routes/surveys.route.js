const express = require('express');
const app = express();
const surveysRoutes = express.Router();

let Surveys = require('../models/Surveys');

surveysRoutes.route('/add').post(function (req, res) {
    let surveys = new Surveys(req.body);
    surveys.save()
      .then(business => {
        res.status(200).json({'surveys': 'surveys in added successfully'});
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  });

  surveysRoutes.route('/').get(function (req, res) {
    Surveys.find(function (err, surveys){
    if(err){
      console.log(err);
    }
    else {
      res.json(surveys);
    }
  });
});

surveysRoutes.route('/delete/:id').get(function (req, res) {
  Surveys.findByIdAndRemove({_id: req.params.id}, function(err, surveys){
      if(err) res.json(err);
      else res.json('Successfully removed');
  });
});


module.exports = surveysRoutes;