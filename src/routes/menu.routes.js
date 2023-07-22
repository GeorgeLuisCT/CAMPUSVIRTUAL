const { Router } = require('express')
const router = Router()

const { 
    renderMenu,
    renderMatricula,
    renderHorarioPage,
    renderNotasPage

} = require('../controllers/menu.controllers');

const { isAuthenticated } = require('../helpers/auth');

router.get('/menu', isAuthenticated, renderMenu)
router.get('/menu/horario', renderHorarioPage);
router.get('/menu/matricula', renderMatricula);
router.get('/menu/notas', renderNotasPage);




module.exports = router