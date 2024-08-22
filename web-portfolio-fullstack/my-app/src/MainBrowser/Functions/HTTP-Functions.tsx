
async function makeHttpRequest(
  url: string,
  method: string,
  body?: string | object,
  headers?: Record<string, string>
): Promise<Response | void> {

  const authToken = localStorage.getItem('jwtToken');
  const bodyContent = body ? (typeof body === 'object' ? JSON.stringify(body) : body) : undefined;

  const requestOptions: RequestInit = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
      ...headers,
    },
    method: method,
    body: bodyContent,
  };

  const response = await fetch(`http://localhost:3000/${url}`, requestOptions);

  if (!response.ok) {
    //todo
    throw new Error(`Make Error! status: ${response.status}`);
  }

  return response;
}

export { makeHttpRequest };