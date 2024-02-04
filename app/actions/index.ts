"use server";
export async function create(formData: NewAccountType) {
  await fetch("http://localhost:3000/api/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
}

export async function login(formData: FormData) {
  return await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  }).then((res:any) => {return res.json()});
}

export async function update({action, type, amount, id, from}: UpdateType) {
  return await fetch(`http://localhost:3000/api/account/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({action, type, amount, from}),
  }).then((res:any) => {return res.json()});
}