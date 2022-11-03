const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../database/db')
const {promisify} = require('util')



exports.login = async (req, res) =>{
    try {
        const user = req.body.user
        const password = req.body.password
        
        if(!user || !password){
            res.render('login', {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y contraseña",
                alertIcon: "info",
                showConfirmButton: true,
                timer: false,
                ruta:'login'
            })
        }else{
            db.query('SELECT*FROM usuarios WHERE username = ?', [user], async (error, results) =>{
                if(results.length == 0 || ! (await bcrypt.compare(password, results[0].password))){
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o contraseña incorrectos",
                        alertIcon: "error",
                        showConfirmButton: true,
                        timer: false,
                        ruta:'login'
                    })
                }else{
                    //ya entra a la pagina principal
                    const id = results[0].id
                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })

                    const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 *60 *1000), 
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookiesOptions)
                    res.render('login', {
                        alert: true,
                        alertTitle: "Bienvenido",
                        alertMessage: [user],
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 1000,
                        ruta: ''
                    })
                }
            })
        }
        
    } catch (error) {
        console.log(error);
    }
}

exports.isAuthenticated = async (req, res, next) => {
    if(req.cookies.jwt){
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            db.query('SELECT*FROM usuarios WHERE id = ?', [decodificada.id], (error, results) => {
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error);
            return next()
        }
    }else{
        res.redirect('/login')
    }
}

exports.logout = (req, res) => {
    res.clearCookie('jwt')
    return res.redirect('/login')
}