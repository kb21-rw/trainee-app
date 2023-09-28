const api_url = import.meta.env.VITE_API_URL;

export const login = async (credentials: {email:FormDataEntryValue | null, password:FormDataEntryValue | null}) => {
  try {
    const response = await fetch(`${api_url}/auth/login`, {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    return { ...result, ok: response.ok, status: response.status };
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (credentials: {email:FormDataEntryValue | null, name:FormDataEntryValue | null, password:FormDataEntryValue | null}, accessToken:string) => {
  try {
    const response = await fetch(`${api_url}/auth/profile`, {
      method: "put",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(credentials),
    });
    console.log({response})
    const result = await response.json();
    return { ...result, ok: response.ok, status: response.status };
  } catch (error) {
    throw error;
  }
};