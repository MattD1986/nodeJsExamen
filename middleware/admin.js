//TODO: add admin permission to Delete Objects
module.exports = function (req, res, next){

    if (!req.user.administrator) return res.status(403).send('Acces denied. You need administrator rights to perform this action.')
    next()

    //next nodig om de volgende middleware / verdere uitvoering mogelijk te maken
}