var postcss = require('postcss')

var plugin = require('./')

var val = postcss([
    plugin({
        platform: 'h5',
        designWidth: 750
    })]).process(`.btn-max-w{
    width: 460px;
}
.btn-center{
    display: flex;
    align-items: center;
    margin: 0 auto;
}`, {from: undefined})
    .then(result => {
        console.log(result.css)
        console.log(result.warnings().join('//'))
    })

console.log(val);
