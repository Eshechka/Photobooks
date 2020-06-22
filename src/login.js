import '../src/styles/pages/login/login.pcss'


function importAll (r) {
  r.keys().forEach(r);
}

importAll(require.context('', true, /\.(eot|woff|svg|ttf|png|jpg)$/));

