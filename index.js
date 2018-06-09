var postcss = require('postcss')
var pxtorem = require('postcss-pxtorem')

const PLATFORM = {
    WEAPP: 'weapp',
    H5: 'h5',
}

const DEVICE_RATIO = {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2,
}

const DEFAULT_OPTIONS = {
    rootValue: 40,
    propList: ['*'], // enable all properties
}

module.exports = postcss.plugin('postcss-pxtransform', function (opts) {
    opts = opts || {
        designWidth: 750,
        platform: PLATFORM.WEAPP,
    }

    // Work with options here
    return function (root, result) {
        switch (opts.platform) {
            case PLATFORM.WEAPP:
                return dealWithWeapp({root, result, opts})
            case PLATFORM.H5:
                return dealWithH5({root, result, opts})
        }
    }
})

function dealWithWeapp ({root, opts}) {
    root.walkDecls(function (decl) {
        let value = decl.value
        value = value.replace(/([0-9.]+)px/ig, function (match, size) {
            return parseInt(size, 10) / DEVICE_RATIO[opts.designWidth] + 'rpx'
        })
        decl.value = value
    })
}

function dealWithH5 ({root, result, opts}) {
    opts = Object.assign({}, DEFAULT_OPTIONS, opts)
    root = postcss(pxtorem(opts)).process(result).root
}