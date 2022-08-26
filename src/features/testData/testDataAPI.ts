export async function fetchUsersApi() {
  const data = await fetch("https://randomuser.me/api/?results=500", {
    mode: "cors",
  })
    .then((res) => res.json())
    .then((data) => {
      const filteredData = data?.results.map((user: any) => ({
        id: user.id.value,
        name: `${user.name.first} ${user.name.last} `,
      }));
      return filteredData;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return data;
}
