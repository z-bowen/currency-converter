// Create example for async-await
const users = [{
  id: 1,
  name: 'Zach',
  schoolId: 101
}, {
  id: 2,
  name: 'Paul',
  schoolId: 102
}];

const grades = [{
  id: 1,
  schoolId: 101,
  grade: 93
}, {
  id: 2,
  schoolId: 102,
  grade: 87
}, {
  id: 3,
  schoolId: 101,
  grade: 97
}];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);

    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user with id ${id}`);
    }
  });
};

const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter((grade) => grade.schoolId === schoolId));
  });
};

const getStatus = (userId) => {
  let user;
  return getUser(userId).then((tempUser) => {
    user = tempUser;
    return getGrades(user.schoolId);
  }).then((grades) => {
    let average = 0;

    if (grades.length > 0) {
      average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }

    return `${user.name} has a grade average of ${average}%.`
  });
};

const getStatusAlt = async (userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);
    var avg = (grades.length > 0) ? grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length : 0

    return `${user.name} has a grade average of ${avg}%.`
};

// getStatus(1).then((status) => {
//   console.log(status);
// }).catch((e) => {
//   console.log(e);
// });

getStatusAlt(1).then((res) => {
  console.log(res);
}).catch((e) => {console.log(e);});

//
// Make API calls with async-await
//
// Retrofit Todo API
