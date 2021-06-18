// compute input chains...
// go for scenario defaultInput2

    const defaultInput2 = '0+(1+(2+(3+(1+2'; // cursor at last chain
    const defaultInput3 = '0+(1+(2+(3+(1+2))))'; // cursor at level 0 depth
    // this is probably bad....
    const defaultInput = [
      0,
      '+',
      [
        1,
        '+',
        [
          2,
          '+',
          [
            3,
            '+',
            [
              1,
              '+',
              2
            ]
          ]
        ]
      ]
    ];