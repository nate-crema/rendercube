import express from 'express'
import mongoose from 'mongoose'
import axios from 'axios';
import async from 'async';

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// Server Link

const server_link = "http://localhost:80";
const back_server_link = "http://211.252.25.131:2766";

// Add POST - /api/login
router.post('/login', (req, res) => {
  console.log("requested");

  async.waterfall([
    (callback) => {
      console.log(back_server_link + '/load/user');
      axios.post(back_server_link + '/load/user', {
        id: req.body.id,
        pw: req.body.pw
      })
      .then((response) => {
        callback(null, response);
      })
      .catch((e) => {
        callback(e);
      })
    }
  ], (err, result) => {
    if (err) console.error(err);
    if (result.data.result == true) {
      console.log(`
      --|login confirm|--

      id: ` + req.body.id + `
      username: ` + result.data.user_data.username + `

      `);

      req.session.loginInfo = {
        id: req.body.id,
        username: result.data.user_data.username,
        license: result.data.user_data.license,
        cl_id: result.data.user_data.cl_id
      }

      console.log(req.session.loginInfo);

      res.setHeader("Content-Type", "application/json");

      res.json({
        result: "success",
        enc_session: req.body.id
      });

    } else {
      console.log(`
      --|login failed|--

      id: ` + req.body.id + `
      
      `)

      res.json({
        result: "failed"
      })
    }
  })

    // console.log(req.body);

    // // if (req.body.id === 'test' && req.body.pw === 'test') {
    // //     var set_sessions = req.session.loginInfo;
        
    // //     set_sessions.loginInfo_enc = 'test';
    // //     set_sessions.id = 'test';
    // //     set_sessions.username = 'tester';
    // //     set_sessions.license = 'test_license';
    // //     set_sessions.cl_id = '0000'

    // //     res.setHeader("Content-Type", "application/json");

    // //     return res.json({ 
    // //         login: true,
    // //         enc_session: 'test'
    // //     })
    // // } else {
    // //   res.status(401).json({ message: 'Bad credentials' })
    // // }

    // // load user info at mongo database

    // axios.post(server_link + '/load/user', {
    //   id: req.body.id,
    //   pw: req.body.pw
    // })
    // .then(function(response) {
    //   if (response.data.result == true) {
    //     console.log(`
    //     --|login confirm|--

    //     id: ` + req.body.id + `
    //     username: ` + response.data.user_data.username + `

    //     `);

    //     req.session.loginInfo = {
    //       id: req.body.id,
    //       username: response.data.user_data.username,
    //       license: response.data.user_data.license,
    //       cl_id: response.data.user_data.cl_id
    //     }

    //     console.log(req.session.loginInfo);

    //     res.setHeader("Content-Type", "application/json");

    //     res.json({
    //       result: "success",
    //       enc_session: req.body.id
    //     });

        
    //   } else {
    //     console.log(`
    //     --|login failed|--

    //     id: ` + req.body.id + `
        
    //     `)

    //     res.json({
    //       result: "failed"
    //     })
    //   }
    // })

    // if (req.body.id == 'test' && req.body.pw == 'test') {
      
    //   console.log(req.session);

    //   req.session.loginInfo = { 
    //     id: 'test',
    //     username: 'tester',
    //     license: 'test_license',
    //     cl_id: "0000"
    //   }

    //   res.setHeader("Content-Type", "application/json");

    //   res.json({
    //     result: "success",
    //     enc_session: "test"
    //   });
    // } else {
    //   res.setHeader("Content-Type", "application/json");

    //   res.json({
    //     result: "failed"
    //   });
    // }
})

// router.post('/check_loginyn', function(req, res) {
  
// })

router.post('/getInfo', function(req, res) {
  var userInfo = req.session.loginInfo;
  
  res.json(userInfo);
  
})


router.post('/setInfo', function(req, res) {
  
  var type = req.body.type;
  var sess = req.session;
  var result;

  if (typeof type == Array) {






    // rendering part
    if (type.stage) {
        //stage
        sess.stage = type.stage;
        result = 'ok';
    }
    if (type.rtype) {
        //rendering_type
        if (type.rtype.b) {
          sess.rendering.render_type_big = type.rtype.b;
          result = 'ok';
        }
         
        if (type.rtype.s) {
          sess.rendering.render_type_small = type.rtype.s;
          result = 'ok';
        }
    }
    if (type.utype) {
        //upload_type
        sess.rendering.upload_type = type.utype;
        result = 'ok';
    }
    if (type.ufn) {
        //uploaded (t or f)
        sess.rendering.uploaded = type.ufn;
        result = 'ok';
    }
    if (type.pinfo) {
        //project_info
        sess.rendering.project_info = {
          file_name: type.pinfo.file_name,
          comp_name: type.pinfo.comp_name,
          file_ext: type.pinfo.file_ext,
          file_size: type.pinfo.file_size,
        }
        result = 'ok';
    }
    if (type.plugins) {
        //plugins
        sess.plugins = {
          plugin_use: type.plugins.plugin_use,
          plugin_num: type.plugins.plugin_num,
          plugin_info: type.plugins.plugin_info
        }
        result = 'ok';
    }
  }

  res.setHeader("Content-Type", "application/json");

  if (result == 'ok') {
    res.end('ok');
  } else {
    res.end('failed');
  }
})

router.post('/setInfo_rendering', function(req, res) {
  console.log(req.body);

  req.session.rendering = {

  }


  


  if (req.body.route && req.body.infos) {
    req.session.rendering.state = req.body.infos;

    res.setHeader("Content-Type", "application/json");

    res.json({
      result: "success"
    });

  } else {
    res.setHeader("Content-Type", "application/json");

    res.json({
      result: "failed"
    });
  }
})

router.post('/setInfo_stage', function(req, res) {
  req.session.rendering.stage = req.body.infos;
  res.setHeader("Content-Type", "application/json");

  res.json({
    result: "success"
  });
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.loginInfo
  res.json({ ok: true })
})

// Add POST - /api/setInfo_user_render
router.post('/setInfo_user_render', function(req, res) {
  var set_info = req.body.setinfo;
  req.session.render = set_info;
  res.end(true);
})

router.post('/getInfo_user_render', function(req, res) {
  res.json(req.session.render);
})

router.post('/stage_save', function(req, res) {
  req.session.stage_save = req.body.data;
  res.end();
})

router.post('/stage_update', function(req, res) {
  req.session.stage_save.stage = req.body.stage;
  console.log(req.session.stage_save);
  res.end();
})

router.post('/stage_save_load', function(req, res) {
  console.log(req.session.stage_save);
  res.json(req.session.stage_save);
})

router.post('/p_analy_save', function(req, res) {
  req.session.p_analy_save = req.body.data;
  res.end();
})

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
