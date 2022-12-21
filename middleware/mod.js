//TODO: add Update permission for moderators
module.exports = function (req, res, next){

    if (!req.user.moderator && !req.user.administrator) return res.status(403).send('Acces denied. You need moderator or administrator rights to perform this action.')
    next()

    //next nodig om de volgende middleware / verdere uitvoering mogelijk te maken
}