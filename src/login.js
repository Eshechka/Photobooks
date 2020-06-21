import '../src/styles/pages/login/login.scss'

// import "../src/fonts/Panton-Bold/Panton-Bold.ttf"
// import "../src/fonts/Panton-Bold/Panton-Bold.eot"
// import "../src/fonts/Panton-Bold/Panton-Bold.woff"
// import "../src/fonts/Panton-Bold/Panton-Bold.svg"

function importAll (r) {
  r.keys().forEach(r);
}

importAll(require.context('', true, /\.(eot|woff|svg|ttf|png|jpg)$/));

