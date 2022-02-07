//String to be tested
const inputString = "417427194451417";

//Values that could make up the inputString
const dict = [
  "",
  "1111",
  "94451",
  "417",
  "94451417",
  "4271",
  null,
  undefined,
  "427194451",
  "4175433",
  "417427194451417",
];

/*
 * Checks if the passed input 'starts with' any of the values provided and
 * if found returns the values as array and rest of the string to evaluate further
 * e.g. values = ['abc'] input = 'abcdef'
 * returns ['abc'] and ['def']
 */
const getSplit = (input = "", values = []) => {
  let testStrings = [];
  const result = values.reduce((acc, i) => {
    //Null check
    if (!i) {
      return acc;
    } else if (input.startsWith(i)) {
      const testString = input.substring(i.length);
      if (testString) {
        testStrings = [...testStrings, testString];
      }
      acc = [...acc, i];
    }
    return acc;
  }, []);
  return [result, testStrings];
};

/*
 * Checks whether adding any of the matched strings to existing resukt values
 * will form a string that is a substring of the inputString
 */
const processSplitResult = (
  inputString = "",
  result = [],
  matchedStrings = []
) => {
  return result.reduce((acc, v) => {
    let merged = [];
    matchedStrings.forEach((f) => {
      const formattedStr = v.split(":").join("").concat(f);
      if (inputString.includes(formattedStr)) {
        merged.push(`${v}:${f}`);
      }
    });

    acc = [...acc, ...merged];

    return acc;
  }, []);
};

const getCombinations = (input, values) => {
  //Null check
  if (!input || !values || values.length === 0) {
    return;
  }

  let [result, testStrings] = getSplit(input, values);

  //Loop until there are no more test strings to evaluate
  while (testStrings.length > 0) {
    let searchStrings = [];
    testStrings.forEach((ts) => {
      //Evaluate each teststring and check of valid values from the values array
      const [splitResult, tss] = getSplit(ts, values);
      //Santitize result from getSplit function and only return valid values
      const reducedArr = processSplitResult(input, result, splitResult);
      result = [...result, ...reducedArr];

      searchStrings = tss.length > 0 ? [...searchStrings, ...tss] : [];
    });

    testStrings = searchStrings;
  }
  //Filter the result set to ensure we return valid results
  return result.filter((str) => str.split(":").join("") === inputString);
};

console.log("Combinations", getCombinations(inputString, dict));
