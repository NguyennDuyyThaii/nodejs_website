const session = require("express-session")
const connectMongo = require("connect-mongo")

let MongoStore = connectMongo(session)

let sessionStore = new MongoStore({
    url: `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    // url: "mongodb://duythai:thai123456@cluster0-shard-00-00.25fre.mongodb.net:27017,cluster0-shard-00-01.25fre.mongodb.net:27017,cluster0-shard-00-02.25fre.mongodb.net:27017/TourIntro?replicaSet=atlas-avym03-shard-0&ssl=true&authSource=admin",
    autoReconnect: true
})

let configSession = (app) => {
    app.use(session({
        key: "express.$id",
        secret: "mySecret",
        store: sessionStore,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    }))
}

module.exports = configSession