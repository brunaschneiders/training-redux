export default function (state = "", action) {
  switch (action.type) {
    case "saveUserData":
      return action.data;
    default:
      return state;
  }
}
