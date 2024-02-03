"use server";
export async function create(formData: FormData) {
  await fetch("http://localhost:3000/api/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
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