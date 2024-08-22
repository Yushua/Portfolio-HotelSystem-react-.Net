
async function makeHttpRequest(
    url: string,
    method: string,
    body: string | object,
    headers?: Record<string, string>
  ): Promise<Response | void> {

    const authToken = localStorage.getItem('jwtToken');
    const bodyContent = typeof body === 'object' ? JSON.stringify(body) : body;
    const response = await fetch("http://localhost:3000/" + url , {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken,
      },
      method: method,
      body: bodyContent
    })
    if (!response.ok) {
      throw new Error(`Make Error! status: ${response.status}`);
    }
    return response;
  }

export {makeHttpRequest}