const test = require('node:test')
const assert = require('node:assert');
const { layOutPublisher, descriptionCheck } = require('../models/comic');
const { User } = require('../models/user');


test('test layoutPublisher function', (t) => {
    const input = "DePuiS"
    assert.strictEqual(layOutPublisher(input), "Depuis")
});


test('test descriptionCheck function empty input', (t) => {
    const inputEmpty = ""
    assert.strictEqual(descriptionCheck(inputEmpty),"no description provided yet")

})

test('test descriptionCheck function valid input', (t) => {
    const inputText = "a nice short story"
    assert.strictEqual(descriptionCheck(inputText),"a nice short story")
})


test('test validationToken is generated', (t) => {
    const user = new User({username: 'Matthew', email: 'matt@mail.com', administrator: true, moderator: true})
    const token = user.generateAuthentificationToken()
    assert.ok(token)
})


