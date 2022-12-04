const accessToken = localStorage.getItem("accesstoken");

export const fitbit = () => {
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