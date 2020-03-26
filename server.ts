import app from "./app";

let port = process.env.PORT || app.PORT;

app.server.listen(port, function () {
    console.log(`server running in" + ${port}`);
});
