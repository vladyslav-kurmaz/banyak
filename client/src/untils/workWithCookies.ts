

const workWithCookies = () => {

  const setCookies = (name: string, token: string, days: number) => {
    const date = new Date();

    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${token}; ${expires}; path=/; samesite=strict`;
  }

  const getCookies = (name: string) => {
    const value = `${document.cookie}`;
    
    const parts = value.split(`; `);
    const cookieValue = parts.filter((cookie) => cookie.startsWith(name))[0];
    
    return cookieValue === undefined ? null : cookieValue.slice(name.length + 1);
  }

  function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  return {
    setCookies,
    getCookies,
    deleteCookie
  }

}

export default workWithCookies;