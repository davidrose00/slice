/*

    slice with strings...
    © 2018 Contributors.





    _.slice(`a/b/c|`, `/`)          // 'b/c|'
    _.slice(`a/b/c|`, `/`,`/`)      // 'b'
    _.slice(`a/b/c|`, `/`,`/`,`|`)  // 'c'

    _.slice(`abcdefghijkl`, -5,`j`) // 'hi'


    similar https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

    with the rest of inputs converge on center -

        ((...rest) => _.slice(`133542`, ...rest))(
            
            `1`, `3`,`4`,
            `2`
        ); // returns `5`
*/


const _ = module.exports = {

    slice: (all, ...rest) => (
        _.sliceAll(all, ...rest, (i, length) => length).pop()
    ),
    sliceAll: (all, ...rest) => {
        let OOB = typeof _.last(rest) == 'function'?
            rest.pop(): (() => {})
        ;
        if(!rest.length)
            return all.slice(0)
        ;
        _.defaults(rest, {
            [1]: Infinity
        });
        rest = rest.map((el, i, all) => 
            all[!_.odd(i)? i/2: 
                all.length - Math.ceil(i/2)
            ]
        );
        let re = [], el, i;
        while(!OOB(i = _.max(el), re.length) &&
            (!el || !el.includes('') && re.push(el))
        ) el = rest.map((el, j) => 
            i = typeof el == 'number'?
                (el + (el < 0) * all.length < i? '': el):
                    (i => (i + '') &&
                        i + !_.odd(j) * el.length
                    )(_[!j || _.odd(j)? 
                        'indexOf': 
                        'lastIndexOf'
                    ](all, el, i))
        );
        return re.map(el => 
            all.slice(...el.slice(-2).sort((a, b) => a - b))
        );
    },

    indexOf: (all, el, i = 0) => (i => 
        i == -1? '': i
    )(i >= 0? all.indexOf(el, i):
        all.indexOf(el, all.length + i)
    ),

    lastIndexOf: (all, el, i = 0) => (i => 
        i == -1? '': i
    )(i >= 0? all.lastIndexOf(el, i):
        all.lastIndexOf(el, all.length + i)
    ),

    defaults: (el, en) => {
        for(let i in en) !(i in el) && (el[i] = en[i]);
        return el;
    },

    max: el => el && Math.max(...el),

    last: el => el[el.length - 1],

    odd: el => el/2 != ~~(el/2)
};