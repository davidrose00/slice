```javascript
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
```