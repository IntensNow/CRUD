async function request(url: string, method: string, data?: {}) {
    try {
      const headers: HeadersInit = {};
      let body
  
      if (data) {
        headers['Content-Type'] = 'application/json'
        body = JSON.stringify(data)
      }
      
  
      const response = await fetch(url, {
        method,
        headers,
        body
      });

      return await response.json();

    } catch (e: any) {
      if(e.message) {
        console.warn('Error:', e.message)
      }
    }
  }

  export default request;