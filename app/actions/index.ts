"use server";
export async function create(formData: NewAccountType) {
  return (
    await fetch("http://localhost:3000/api/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }))?.json();
}

export async function getAll() {
  return (
    await fetch("http://localhost:3000/api/accounts")
  )?.json();
}

export async function login(formData: LoginType) {
  return await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((res:any) => {return res.json()});
}

export async function transferToSameAcc({action, type, amount, id, from}: UpdateType) {
  return await fetch(`http://localhost:3000/api/account/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({action, type, amount, from}),
  }).then((res:any) => {return res.json()});
}

export async function transferToOtherAcc({amount, to, password, id}: TransferOtherAccType) {
  return await fetch(`http://localhost:3000/api/account/transfer/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount, to, password }),
  }).then((res:any) => {return res.json()});
}