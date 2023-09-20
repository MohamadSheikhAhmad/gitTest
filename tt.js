const inputObject = {
  errors: [
    {
      _id: "650a695fea8d74b3979f5e56",
      rule: "aaaa",
      rank: 3,
      message: "Unauthorized: Unauthorized access attempt detected.",
      date: "2023-07-28T22:03:55.841Z",
    },
    {
      _id: "650a695fea8d74b3979f5ea2",
      rule: "aaaa",
      rank: 3,
      message: "Unauthorized: Unauthorized access attempt detected.",
      date: "2023-07-28T22:03:55.841Z",
    },
    {
      _id: "650a695fea8d74b3979f5eee",
      rule: "aaaa",
      rank: 3,
      message: "Unauthorized: Unauthorized access attempt detected.",
      date: "2023-07-28T22:03:55.841Z",
    },
    {
      _id: "650a695fea8d74b3979f5e6c",
      rule: "seconde",
      rank: 3,
      message: "Authorization: Authorization failure.",
      date: "2023-07-28T22:03:55.841Z",
    },
    {
      _id: "650a695fea8d74b3979f5eb3",
      rule: "aaaa",
      rank: 3,
      message: "Failure: System failure reported.",
      date: "2023-07-28T22:03:55.841Z",
    },
    {
      _id: "650a695fea8d74b3979f5e67",
      rule: "aaaa",
      rank: 3,
      message: "Failure: System failure reported.",
      date: "2023-07-28T22:03:55.841Z",
    },
    {
      _id: "650a695fea8d74b3979f5eb8",
      rule: "seconde",
      rank: 3,
      message: "Authorization: Authorization failure.",
      date: "2023-07-28T22:03:55.841Z",
    },
    {
      _id: "650a695fea8d74b3979f5eff",
      rule: "aaaa",
      rank: 3,
      message: "Failure: System failure reported.",
      date: "2023-07-28T22:03:55.841Z",
    },
    {
      _id: "650a695fea8d74b3979f5f04",
      rule: "seconde",
      rank: 3,
      message: "Authorization: Authorization failure.",
      date: "2023-07-28T22:03:55.841Z",
    },
  ],
  date: "2023-09-20T03:39:16.422Z",
  file_name: "file_log.txts",
  userName: "moh",
  email: "msa.vetc@gmail.com",
};

const errors = [];
const info = [];

inputObject.errors.forEach((errorObject) => {
  if (
    errorObject.message.includes("Error") ||
    errorObject.message.includes("Failure") ||
    errorObject.message.includes("Unauthorized") ||
    errorObject.message.includes("Authorization")
  ) {
    errors.push(errorObject);
  } else {
    info.push(errorObject);
  }
});

console.log("Errors:");
console.log(errors);
console.log("Info:");
console.log(info);
