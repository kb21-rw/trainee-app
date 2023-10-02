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


export const updateUserProfile = async (accessToken:any, credentials:any) => {
  try {
    const response = await fetch(`${api_url}/auth/profile`, {
      method: "put",
      headers: {
        authorization : `Bearer ${accessToken}`,
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

export const resetPassword = async (email:FormDataEntryValue | null) => {
  try {
    const response = await fetch(`${api_url}/auth/reset-password`, {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: email}),
    });
    const result = await response.json();
    return { ...result, ok: response.ok, status: response.status };
  } catch (error) {
    throw error;
  }
};
