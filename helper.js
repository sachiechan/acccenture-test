//Mock data
const successResponses = [{ state: "processing" }, { state: "success" }];
const errorResponses1 = [
  { state: "processing" },
  { state: "error", errorCode: "NO_STOCK" },
];
const errorResponses2 = [
  { state: "processing" },
  { state: "error", errorCode: "INCORRECT_DETAILS" },
];
const errorResponses3 = [{ state: "processing" }, { state: "error" }];

//Function to create a delay. Default value = 2 seconds
const delay = (time = 2000) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

//Generator function that returns each element of the passed array on the 'next' call
function* processResponseStates(arr = []) {
  for (i in arr) {
    yield arr[i];
  }
}

// Get error object from error code
const getErrorObject = (code) => {
  switch (code) {
    case "NO_STOCK":
      return { title: "Error page", message: "No stock has been found" };
    case "INCORRECT_DETAILS":
      return {
        title: "Error page",
        message: "Incorrect details have been entered",
      };
    default:
      return { title: "Error page", message: null };
  }
};

//Returns a success, error or just delays execution depending on the state
const processState = async ({ state, errorCode }) => {
  switch (state) {
    case "processing":
      await delay();
      break;
    case "success":
      return { title: "Order complete", message: null };
    case "error":
      return getErrorObject(errorCode);
    default:
      return getErrorObject();
  }
};

//Main function that takes an array of states and processes them. The function returns when it has a result (either success or error)
const getOutput = async (values) => {
  const handle = processResponseStates(values);
  for (value of handle) {
    const result = await processState(value);
    if (result) {
      return result;
    }
  }
};

getOutput(successResponses).then((result) => console.log(result));
