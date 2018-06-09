var postcss = require('postcss')

var plugin = require('./')

function run (input, output, opts) {
    return postcss([plugin(opts)]).
        process(input, {from: undefined}).
        then(result => {
            expect(result.css).toEqual(output)
            expect(result.warnings().length).toBe(0)
        })
}

// Write tests here

it('does something', () => {
    return run(`h1 {
    margin: 0 0 20px;
    font-size: 40px;
    line-height: 1.2;
    letter-spacing: 1px;
}`, `h1 {
    margin: 0 0 20rpx;
    font-size: 40rpx;
    line-height: 1.2;
    letter-spacing: 1rpx;
}`)
})

it('does something', () => {
    return run(`h1 {
    margin: 0 0 20px;
    font-size: 40px;
    line-height: 1.2;
    letter-spacing: 1px;
}`, `h1 {
    margin: 0 0 20rpx;
    font-size: 40rpx;
    line-height: 1.2;
    letter-spacing: 1rpx;
}`, {platform: 'weapp', designWidth: 750})
})

it('does something', () => {
    return run(`h1 {
    margin: 0 0 20px;
    font-size: 40px;
    line-height: 1.2;
    letter-spacing: 1px;
}`, `h1 {
    margin: 0 0 0.5rem;
    font-size: 1rem;
    line-height: 1.2;
    letter-spacing: 0.025rem;
}`, {platform: 'h5'})
})

