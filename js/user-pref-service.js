'use strict'


const USER_KEY = 'userDB'
const HOROSCOPES = [
    'Gentle Fish intensely dislike letting people down or any sort of confrontation. As a result many of you Mer-folk blurt out “that’s fine” when you actually want to say, “hell no!” Today’s stars bring a reminder to live your life according to what makes YOU happy. Save yourself, time, money and possible heartache by being true to numero uno. If you’re unsure of a decision responding with “I’ll get back to you” is far better than backing out at the last minute.',
    'There’s mysterious and then there’s just plain aloof. You’re naturally a bit of an enigma which greatly contributes to your allure. But today, being distant may come off as intimidating or straight up unapproachable. There’s nothing wrong with holding your cards close to your chest and making someone work for it, Scorpio. But know when to throw a bone of encouragement too. On the flip side, if you find someone intriguing be proactive and spark up a conversation. Lower your defenses and others are sure to follow suit.',
    'One of the seven deadly sins may come a knockin’ today. Unfortunately it’s not lust, but jealousy, which could try to get the better of you. You may behave in an unreasonable manner due to unfounded suspicions but before completely dismissing these reactions get to the source of them. Is it toxic shrapnel that you’re carrying from a past wound or is your partner’s conduct making you feel insecure? The former can be resolved with a calm, sensible and open conversation. However, if it’s the latter, own your feelings and set firm boundaries.'
]


function setHomePage() {
    var user = loadFromStorage(USER_KEY)
    if (!user) return
    $('body').css({ background: user.color })
    $('.horoscope').text(HOROSCOPES[getRandomIntInclusive(0,2)])
}

function onGetUser(ev) {
    ev.preventDefault()
    let user = {
        color: $('[name="color"]').val(),
        birthDay: $('[name="b-date"]').val(),
        birthTime: $('[name="b-time"]').val(),
    }
    saveToStorage(USER_KEY, user)
    setHomePage()
}

function showAge(newVal) {

    document.getElementById("sAge").innerHTML = newVal;
}