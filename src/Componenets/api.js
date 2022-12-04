const accessToken = localStorage.getItem("accesstoken");

export const fitbitSteps = () => {
    fetch('https://api.fitbit.com/1/user/-/activities/steps/date/today/1d.json', {
        method: "GET",
        headers: {"Authorization": "Bearer " + accessToken}
      })
      .then(res => {
        localStorage.setItem('steps', res);
        console.log(res)
      }) 
      .catch(err => {
        console.log(err)
      })
}

export const fitbitHydration = () => {
    fetch('https://api.fitbit.com/1/user/-/activities/steps/date/today/1d.json', {
        method: "GET",
        headers: {"Authorization": "Bearer " + accessToken}
      })
      .then(res => {
        localStorage.setItem('steps', res);
        console.log("dekh",res)
      }) 
      .catch(err => {
      })
}
export const fitbitCalorie = () => {
    fetch('https://api.fitbit.com/1/user/-/activities/steps/date/today/1d.json', {
        method: "GET",
        headers: {"Authorization": "Bearer " + accessToken}
      })
      .then(res => {
        localStorage.setItem('steps', res);
        console.log(res)
      }) 
      .catch(err => {
      })
}