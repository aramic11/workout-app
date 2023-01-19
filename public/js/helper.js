let helpers = {
    getData: async function (url) {
      try {
        let response = await fetch(url);
        return response.json();
      }
      catch (err) {
        console.log(err.message);
      }
    },
    postData: async function (url, data) {
      try {
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        return response.json();
      }
      catch (err) {
        console.log(err.message);
      }
    }
  };