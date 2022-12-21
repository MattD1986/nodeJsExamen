const { layOutPublisher, descriptionCheck } = require('../models/comic');
const { User } = require('../models/user');


test('test layoutPublisher function', () => {
    const input = "DePuiS"
    expect(layOutPublisher(input)).toBe("Depuis")
});


test('test descriptionCheck with no input', () => {
    const inputEmpty = ""
    expect(descriptionCheck(inputEmpty)).toBe("no description provided yet")
})


test('test descriptionCheck with text input', () => {
    const inputText = "a nice short story"
    expect(descriptionCheck(inputText)).toBe("a nice short story")
})


test('test validationToken is generated', () => {
    const user = new User({username: 'Matthew', email: 'matt@mail.com', administrator: true, moderator: true})
    const token = user.generateAuthentificationToken()

    expect(token).toBeTruthy()
})


