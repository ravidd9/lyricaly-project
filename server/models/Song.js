
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const songSchema = new Schema({
    name: String,
    id: Number,
    artist: String,
    artistID: Number,
    titleFeatured: String,
    album: String,
    albumID: Number,
    lyrics: String,
    songPic: String,
    applePlayer: String,
    youTubePlayer: String
})

const Song = mongoose.model("Song", songSchema, "songs")

// let s1 = new Song({
//     name: "Chandelier",
//     id: 378195,
//     artist: "Sia",
//     lyrics: "[Verse 1]\nParty girls don't get hurt\nCan't feel anything, when will I learn\nI push it down, push it down\nI'm the one \"for a good time call\"\nPhone's blowin' up, ringin' my doorbell\nI feel the love, feel the love\n\n[Pre-Chorus]\n1 2 3, 1 2 3, drink\n1 2 3, 1 2 3, drink\n1 2 3, 1 2 3, drink\nThrow 'em back till I lose count\n\n[Chorus]\nI'm gonna swing from the chandelier\nFrom the chandelier\nI'm gonna live like tomorrow doesn't exist\nLike it doesn't exist\nI'm gonna fly like a bird through the night\nFeel my tears as they dry\nI'm gonna swing from the chandelier\nFrom the chandelier\n\n[Post-Chorus]\nBut I'm holding on for dear life\nWon't look down, won't open my eyes\nKeep my glass full until morning light\n'Cause I'm just holding on for tonight\nHelp me, I'm holding on for dear life\nWon't look down, won't open my eyes\nKeep my glass full until morning light\n'Cause I'm just holding on for tonight\nOn for tonight\n\n[Verse 2]\nSun is up, I'm a mess\nGotta get out now, gotta run from this\nHere comes the shame, here comes the shame\n\n[Pre-Chorus]\n1 2 3, 1 2 3, drink\n1 2 3, 1 2 3, drink\n1 2 3, 1 2 3, drink\nThrow 'em back till I lose count\n\n[Chorus]\nI'm gonna swing from the chandelier\nFrom the chandelier\nI'm gonna live like tomorrow doesn't exist\nLike it doesn't exist\nI'm gonna fly like a bird through the night\nFeel my tears as they dry\nI'm gonna swing from the chandelier\nFrom the chandelier\n\n[Post-Chorus]\nBut I'm holding on for dear life\nWon't look down, won't open my eyes\nKeep my glass full until morning light\n'Cause I'm just holding on for tonight\nHelp me, I'm holding on for dear life\nWon't look down, won't open my eyes\nKeep my glass full until morning light\n'Cause I'm just holding on for tonight\nOn for tonight\n\n[Outro]\nOn for tonight\n'Cause I'm just holding on for tonight\nOh, I'm just holding on for tonight\nOn for tonight, on for tonight\n'Cause I'm just holding on for tonight\n'Cause I'm just holding on for tonight\nOh, I'm just holding on for tonight\nOn for tonight, on for tonight",
//     songPic: "https://images.genius.com/5bcfb76690b3fb068a317c76579b70b5.300x300x1.jpg"
// })
// s1.save()



module.exports = Song