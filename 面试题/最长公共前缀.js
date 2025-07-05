function longestCommonPrefix(strs) {
  let end = 0
  while (strs.every(str => {
    return (end < str.length) && (strs[0][end] === str[end])
  })) {
    end++
  }
  return strs[0].slice(0, end)
};

let strs = ["flower", "flow", "floight"]
// "fl"

// strs = ["dog", "racecar", "car"]
// ""

console.log(
  longestCommonPrefix(strs)
)